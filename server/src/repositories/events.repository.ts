import type { EventSessionInput } from "@hakko/core";
import { Prisma } from "../generated/prisma/browser.js";
import { EventStatus } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";

const EVENT_PUBLIC_SELECT = {
  id: true,
  name: true,
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
  "startDate" | "endDate" | "sessions" | "participants"
> & { sessions: EventSessionInput[] };

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

export const createEvent = ({ sessions, ...data }: EventWriteData) => {
  const { rows, startDate, endDate } = toSessionRows(sessions);
  return prisma.event.create({
    data: { ...data, startDate, endDate, sessions: { create: rows } },
    select: EVENT_PUBLIC_SELECT,
  });
};

export const updateEvent = (
  id: string,
  { sessions, ...data }: EventWriteData
) => {
  const { rows, startDate, endDate } = toSessionRows(sessions);
  return prisma.event.update({
    where: { id },
    data: {
      ...data,
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
