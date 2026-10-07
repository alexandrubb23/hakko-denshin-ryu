// What every "add to calendar" entry agrees on, whether it is a web
// calendar link (client) or an iCalendar file (server)

/** Calendars need an end; a session without one is given an hour */
export const DEFAULT_SESSION_MINUTES = 60;

const MINUTE_MS = 60_000;

/**
 * The compact UTC stamp both iCalendar's DTSTART/DTEND and Google's `dates=`
 * use: "2025-05-29T13:00:00.000Z" -> "20250529T130000Z"
 */
export const compactUtc = (date: Date) =>
  date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

/** When a session ends in the calendar: its own end, or an hour in */
export const calendarSessionEnd = ({
  startsAt,
  endsAt,
}: {
  startsAt: string | Date;
  endsAt: string | Date | null;
}): Date =>
  endsAt
    ? new Date(endsAt)
    : new Date(
        new Date(startsAt).getTime() + DEFAULT_SESSION_MINUTES * MINUTE_MS
      );

/** The entry's notes: the event's description, then a link to its page */
export const calendarDescription = (details: string, pageUrl: string) =>
  [details.trim(), pageUrl].filter(Boolean).join("\n\n");
