import type { EventSession } from "@api/events";
import { capitalize } from "@utils/string";
import { DATE_OPTIONS, TIME_ZONE } from "@utils/time";

type SessionTimes = Pick<EventSession, "startsAt" | "endsAt">;

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TIME_ZONE,
};

const DATE_TIME_OPTIONS = { ...DATE_OPTIONS, ...TIME_OPTIONS };

/** The dojo-local calendar date, as "2026-10-23" (en-CA writes it so) */
const dojoDate = (date: Date) =>
  date.toLocaleDateString("en-CA", { timeZone: TIME_ZONE });

const sameDojoDay = (a: Date, b: Date) => dojoDate(a) === dojoDate(b);

/**
 * One session in dojo-local time: "23 Oct 2026, 18:30 – 20:30" when it
 * starts and ends on the same day, otherwise the full start – end range
 */
const formatSession = (
  locale: string,
  { startsAt, endsAt }: SessionTimes
): string => {
  const start = new Date(startsAt);
  const startStr = start.toLocaleString(locale, DATE_TIME_OPTIONS);
  if (!endsAt) return startStr;

  const end = new Date(endsAt);
  const endStr = sameDojoDay(start, end)
    ? end.toLocaleTimeString(locale, TIME_OPTIONS)
    : end.toLocaleString(locale, DATE_TIME_OPTIONS);
  return `${startStr} – ${endStr}`;
};

/** Every day of the event, one line each, in dojo-local time */
export const formatEventSessions = (
  locale: string,
  sessions: SessionTimes[]
): string[] => sessions.map((session) => formatSession(locale, session));

const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * MINUTE_MS;

// Date.getDay() numbering, by the weekday's short English name: Intl has no
// numeric weekday, so describeSession reads the en-US name in the dojo's zone
const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** When the last session ends (or, without an end, starts) */
const lastMoment = (sessions: SessionTimes[]) =>
  new Date(
    Math.max(
      ...sessions.map(({ startsAt, endsAt }) =>
        new Date(endsAt ?? startsAt).getTime()
      )
    )
  );

/**
 * The event's span in dojo-local dates: "29 – 31 May 2025", or a single
 * date for a one-day event. `sessions` come sorted, earliest first.
 */
export const formatEventSpan = (
  locale: string,
  sessions: SessionTimes[]
): string =>
  new Intl.DateTimeFormat(locale, DATE_OPTIONS).formatRange(
    new Date(sessions[0].startsAt),
    lastMoment(sessions)
  );

/** Calendar days the event spans, first and last included */
export const countEventDays = (sessions: SessionTimes[]): number => {
  const first = Date.parse(dojoDate(new Date(sessions[0].startsAt)));
  const last = Date.parse(dojoDate(lastMoment(sessions)));
  return Math.round((last - first) / DAY_MS) + 1;
};

/** "2 h 30 min", "2 h", "45 min" */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
};

export interface SessionDetails {
  /** 0 = Sunday, as Date.getDay() */
  weekday: number;
  /** "Friday", in `locale` */
  weekdayName: string;
  /** "23 Oct 2026" */
  date: string;
  /** "18:30" */
  startTime: string;
  /** null without an end */
  endTime: string | null;
  /** Set when the session ends on a later day: "25 Jul 2025" */
  endDate: string | null;
  /** Length of a session that starts and ends on the same day */
  minutes: number | null;
}

/** One session, broken into what its card shows, in dojo-local time */
export const describeSession = (
  locale: string,
  { startsAt, endsAt }: SessionTimes
): SessionDetails => {
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;
  const sameDay = !end || sameDojoDay(start, end);
  const shortWeekday = start.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: TIME_ZONE,
  });
  const weekdayName = start.toLocaleDateString(locale, {
    weekday: "long",
    timeZone: TIME_ZONE,
  });

  return {
    weekday: WEEKDAY_INDEX[shortWeekday],
    weekdayName: capitalize(weekdayName),
    date: start.toLocaleDateString(locale, DATE_OPTIONS),
    startTime: start.toLocaleTimeString(locale, TIME_OPTIONS),
    endTime: end ? end.toLocaleTimeString(locale, TIME_OPTIONS) : null,
    endDate: sameDay ? null : end.toLocaleDateString(locale, DATE_OPTIONS),
    minutes:
      end && sameDay
        ? Math.round((end.getTime() - start.getTime()) / MINUTE_MS)
        : null,
  };
};
