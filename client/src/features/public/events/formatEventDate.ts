import type { EventSession } from "@api/events";

const TIME_ZONE = "Europe/Bucharest";

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
};

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
};

const DATE_TIME_OPTIONS = { ...DATE_OPTIONS, ...TIME_OPTIONS };

/**
 * One session in dojo-local time: "23 Oct 2026, 18:30 – 20:30" when it
 * starts and ends on the same day, otherwise the full start – end range
 */
const formatSession = (
  locale: string,
  { startsAt, endsAt }: Pick<EventSession, "startsAt" | "endsAt">
): string => {
  const start = new Date(startsAt);
  const startStr = start.toLocaleString(locale, DATE_TIME_OPTIONS);
  if (!endsAt) return startStr;

  const end = new Date(endsAt);
  const sameDay =
    start.toLocaleDateString(locale, DATE_OPTIONS) ===
    end.toLocaleDateString(locale, DATE_OPTIONS);
  const endStr = sameDay
    ? end.toLocaleTimeString(locale, TIME_OPTIONS)
    : end.toLocaleString(locale, DATE_TIME_OPTIONS);
  return `${startStr} – ${endStr}`;
};

/** Every day of the event, one line each, in dojo-local time */
export const formatEventSessions = (
  locale: string,
  sessions: Pick<EventSession, "startsAt" | "endsAt">[]
): string[] => sessions.map((session) => formatSession(locale, session));
