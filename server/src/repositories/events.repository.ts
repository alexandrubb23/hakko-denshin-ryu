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
    orderBy: { startDate: "asc" },
  });

export const findEventById = (id: string) =>
  prisma.event.findUnique({ where: { id } });

export const findAdminEvents = () =>
  prisma.event.findMany({
    where: { deletedAt: null },
    select: { ...EVENT_PUBLIC_SELECT, updatedAt: true },
    orderBy: { startDate: "asc" },
  });

export const createEvent = (data: Prisma.EventCreateInput) =>
  prisma.event.create({ data, select: EVENT_PUBLIC_SELECT });

export const updateEvent = (id: string, data: Prisma.EventUpdateInput) =>
  prisma.event.update({ where: { id }, data, select: EVENT_PUBLIC_SELECT });

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
