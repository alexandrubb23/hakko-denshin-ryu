import { EventStatusValues, EventTypeValues } from "@hakko/core";
import { z } from "zod";

import type { EventSession } from "@api/events";

/** date and time inputs produce "YYYY-MM-DD" and "HH:MM" — no timezone */
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}$/;
export const INVALID_DATE_TIME = "Invalid date/time";
const timeString = z.string().regex(timeRegex, INVALID_DATE_TIME);

/** One day of the event, with its start and (optional) end time */
const sessionFormSchema = z
  .object({
    date: z.string().regex(dateRegex, INVALID_DATE_TIME),
    startTime: timeString,
    endTime: z.union([timeString, z.literal("")]),
  })
  .refine((s) => !s.endTime || s.endTime > s.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export type SessionFormValues = z.infer<typeof sessionFormSchema>;

/**
 * Form-level schema: validates browser-local date/time strings.
 * The shared @hakko/core schemas validate UTC ISO strings — those are used
 * only after conversion, on the server side.
 */
export const eventFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  type: z.enum(EventTypeValues),
  status: z.enum(EventStatusValues),
  sessions: z
    .array(sessionFormSchema)
    .min(1, "Add at least one date")
    .max(31, "An event can have at most 31 dates"),
  location: z.string().trim().min(2, "Location must be at least 2 characters"),
  details: z.string().trim().min(10, "Details must be at least 10 characters"),
  ticketUrl: z.string().url("Invalid ticket URL").or(z.literal("")),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;

const pad = (n: number) => n.toString().padStart(2, "0");
const toLocalDate = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toLocalTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export const EMPTY_SESSION: SessionFormValues = {
  date: "",
  startTime: "",
  endTime: "",
};

/**
 * Stored sessions → form rows, in browser local time. A session that runs
 * across several days (events created before multi-date support) becomes
 * one row per day with the same start and end times.
 */
export const toSessionFormValues = (
  sessions: EventSession[]
): SessionFormValues[] =>
  sessions.flatMap(({ startsAt, endsAt }) => {
    const start = new Date(startsAt);
    const end = endsAt ? new Date(endsAt) : null;
    const startTime = toLocalTime(start);
    const endTime = end ? toLocalTime(end) : "";

    if (!end || toLocalDate(end) === toLocalDate(start)) {
      return [{ date: toLocalDate(start), startTime, endTime }];
    }

    const rows: SessionFormValues[] = [];
    const day = new Date(start);
    while (toLocalDate(day) <= toLocalDate(end)) {
      rows.push({
        date: toLocalDate(day),
        startTime,
        endTime: endTime > startTime ? endTime : "",
      });
      day.setDate(day.getDate() + 1);
    }
    return rows;
  });

/** Form row → UTC ISO strings for the API */
export const toSessionInput = ({
  date,
  startTime,
  endTime,
}: SessionFormValues) => ({
  startsAt: new Date(`${date}T${startTime}`).toISOString(),
  endsAt: endTime ? new Date(`${date}T${endTime}`).toISOString() : undefined,
});

/** The row after `prev`: the following day, same times */
export const nextSession = (prev?: SessionFormValues): SessionFormValues => {
  if (!prev?.date) return EMPTY_SESSION;
  const day = new Date(`${prev.date}T00:00`);
  day.setDate(day.getDate() + 1);
  return { ...prev, date: toLocalDate(day) };
};
