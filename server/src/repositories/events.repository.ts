import type { EventSessionInput } from "@hakko/core";
import { Prisma } from "../generated/prisma/browser.js";
import { EventStatus } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import { firstFreeSlug, slugify } from "../utils/slug.js";

const EVENT_PUBLIC_SELECT = {
  id: true,
  name: true,
  slug: true,
  type: true,
  status: true,
  startDate: true,
  endDate: true,
  location: true,
  details: true,
  ticketUrl: true,
  image: true,
  createdAt: true,
  sessions: {
    select: { id: true, startsAt: true, endsAt: true },
    orderBy: { startsAt: "asc" },
  },
} as const;

const PARTICIPANT_SELECT = {
  id: true,
  attended: true,
  userId: true,
  user: { select: { name: true, email: true, image: true } },
} as const;

export const findPublishedEvents = () =>
  prisma.event.findMany({
    where: { status: EventStatus.published, deletedAt: null },
    select: EVENT_PUBLIC_SELECT,
    orderBy: { startDate: "desc" },
  });

export const findEventById = (id: string) =>
  prisma.event.findUnique({
    where: { id },
    include: { sessions: EVENT_PUBLIC_SELECT.sessions },
  });

export const findAdminEvents = () =>
  prisma.event.findMany({
    where: { deletedAt: null },
    select: { ...EVENT_PUBLIC_SELECT, updatedAt: true },
    orderBy: { startDate: "desc" },
  });

type EventWriteData = Omit<
  Prisma.EventCreateInput,
  "slug" | "startDate" | "endDate" | "sessions" | "participants"
> & { sessions: EventSessionInput[] };

/**
 * A slug for `name` no other event holds (deleted ones included, as the
 * column is unique): "taikai-2026", else "taikai-2026-2", and so on
 */
const uniqueEventSlug = async (name: string, excludeId?: string) => {
  const base = slugify(name, "event");
  const taken = await prisma.event.findMany({
    where: {
      OR: [{ slug: base }, { slug: { startsWith: `${base}-` } }],
      ...(excludeId && { id: { not: excludeId } }),
    },
    select: { slug: true },
  });
  return firstFreeSlug(
    base,
    taken.map((event) => event.slug)
  );
};

/**
 * Sessions are the source of truth; the event's own startDate/endDate are a
 * summary (earliest start, latest finish) kept for sorting and filtering.
 */
const toSessionRows = (sessions: EventSessionInput[]) => {
  const rows = sessions
    .map((s) => ({
      startsAt: new Date(s.startsAt),
      endsAt: s.endsAt ? new Date(s.endsAt) : null,
    }))
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());

  const startDate = rows[0].startsAt;
  const latest = Math.max(
    ...rows.map((r) => (r.endsAt ?? r.startsAt).getTime())
  );
  const endDate = latest > startDate.getTime() ? new Date(latest) : null;

  return { rows, startDate, endDate };
};

export const createEvent = async ({ sessions, ...data }: EventWriteData) => {
  const { rows, startDate, endDate } = toSessionRows(sessions);
  const slug = await uniqueEventSlug(data.name);
  return prisma.event.create({
    data: { ...data, slug, startDate, endDate, sessions: { create: rows } },
    select: EVENT_PUBLIC_SELECT,
  });
};

/** A renamed event gets a slug for its new name; its old links stop working */
export const updateEvent = async (
  id: string,
  { sessions, ...data }: EventWriteData
) => {
  const { rows, startDate, endDate } = toSessionRows(sessions);
  const current = await prisma.event.findUniqueOrThrow({
    where: { id },
    select: { name: true },
  });
  const slug =
    current.name === data.name
      ? undefined
      : await uniqueEventSlug(data.name, id);
  return prisma.event.update({
    where: { id },
    data: {
      ...data,
      slug,
      startDate,
      endDate,
      sessions: { deleteMany: {}, create: rows },
    },
    select: EVENT_PUBLIC_SELECT,
  });
};

export const softDeleteEvent = (id: string) =>
  prisma.event.update({ where: { id }, data: { deletedAt: new Date() } });

export const updateEventImage = (id: string, imageUrl: string) =>
  prisma.event.update({ where: { id }, data: { image: imageUrl } });

export const findEventParticipants = (eventId: string) =>
  prisma.eventParticipation.findMany({
    where: { eventId },
    select: PARTICIPANT_SELECT,
    orderBy: { user: { name: "asc" } },
  });

type UpsertEventParticipationInput = {
  eventId: string;
  userId: string;
  attended: boolean;
};

export const upsertEventParticipation = ({
  eventId,
  userId,
  attended,
}: UpsertEventParticipationInput) =>
  prisma.eventParticipation.upsert({
    where: { eventId_userId: { eventId, userId } },
    create: { eventId, userId, attended },
    update: { attended },
    select: PARTICIPANT_SELECT,
  });
