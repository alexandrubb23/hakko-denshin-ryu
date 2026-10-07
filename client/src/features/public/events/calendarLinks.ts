import {
  calendarDescription,
  calendarSessionEnd,
  compactUtc,
} from "@hakko/core";

import type { Event, EventSession } from "@api/events";
import { API_URL } from "@api/http";
import { ApiRoutes } from "@lib/routes";
import { escapeHtml } from "@utils/string";

import { eventPageUrl } from "./eventMeta";
import { dojoDate, lastMoment } from "./formatEventDate";

/** A span of whole dojo-local days, `end` excluded: "2025-05-29"–"2025-06-01" */
interface AllDay {
  allDay: true;
  start: string;
  end: string;
}

interface Timed {
  allDay: false;
  start: Date;
  end: Date;
}

/** One entry in a web calendar */
export type CalendarEntry = (AllDay | Timed) & {
  title: string;
  description: string;
  location: string;
};

/** "2025-05-31" -> "2025-06-01" */
const nextDay = (date: string) => {
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
};

const timed = (session: Pick<EventSession, "startsAt" | "endsAt">): Timed => ({
  allDay: false,
  start: new Date(session.startsAt),
  end: calendarSessionEnd(session),
});

const entry = (
  event: Event,
  pageUrl: string,
  when: AllDay | Timed
): CalendarEntry => ({
  ...when,
  title: event.name,
  description: calendarDescription(event.details, pageUrl),
  location: event.location,
});

/**
 * The whole event as one entry: a single session keeps its hours; several
 * become the days they span, as web calendars take one entry per link (the
 * iCalendar file and each session's own links keep every day's hours)
 */
export const eventCalendarEntry = (
  event: Event,
  pageUrl: string
): CalendarEntry => {
  const { sessions } = event;
  if (sessions.length === 1) return entry(event, pageUrl, timed(sessions[0]));
  return entry(event, pageUrl, {
    allDay: true,
    start: dojoDate(new Date(sessions[0].startsAt)),
    end: nextDay(dojoDate(lastMoment(sessions))),
  });
};

/** One session of the event, at its hours */
export const sessionCalendarEntry = (
  event: Event,
  session: EventSession,
  pageUrl: string
): CalendarEntry => entry(event, pageUrl, timed(session));

/** Query string with every value percent-encoded ("+" isn't a space to all) */
const query = (params: Record<string, string>) =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

/** "2025-05-29T13:00:00.000Z" -> "2025-05-29T13:00:00Z" */
const isoUtc = (date: Date) => date.toISOString().replace(/\.\d{3}/, "");

export const googleCalendarUrl = (entry: CalendarEntry) => {
  const dates = entry.allDay
    ? `${entry.start.replace(/-/g, "")}/${entry.end.replace(/-/g, "")}`
    : `${compactUtc(entry.start)}/${compactUtc(entry.end)}`;
  // `dates` stays unencoded, as Google's own links write it
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${dates}&${query(
    {
      text: entry.title,
      details: entry.description,
      location: entry.location,
    }
  )}`;
};

const OUTLOOK_HOSTS = {
  /** Work and school accounts */
  office365: "https://outlook.office.com",
  /** Personal accounts (outlook.com, hotmail.com…) */
  live: "https://outlook.live.com",
} as const;

export type OutlookAccount = keyof typeof OUTLOOK_HOSTS;

export const outlookCalendarUrl = (
  entry: CalendarEntry,
  account: OutlookAccount
) => {
  const params = {
    rru: "addevent",
    // Outlook cuts the subject at a bare "&"
    subject: entry.title.replace(/ & /g, " and "),
    startdt: entry.allDay ? entry.start : isoUtc(entry.start),
    enddt: entry.allDay ? entry.end : isoUtc(entry.end),
    ...(entry.allDay && { allday: "true" }),
    // Outlook's body is HTML
    body: escapeHtml(entry.description).replace(/\n/g, "<br>"),
    location: entry.location,
  };
  return `${OUTLOOK_HOSTS[account]}/calendar/0/action/compose?${query(params)}`;
};

export type CalendarKey = "google" | "ical" | "office365" | "live";

/**
 * Each calendar's link for the event, or for just one of its sessions; the
 * entries link back to the event's page at `origin`
 */
export const calendarLinks = (
  event: Event,
  session: EventSession | undefined,
  origin: string
): Record<CalendarKey, string> => {
  const pageUrl = eventPageUrl(origin, event.slug);
  const entry = session
    ? sessionCalendarEntry(event, session, pageUrl)
    : eventCalendarEntry(event, pageUrl);
  return {
    google: googleCalendarUrl(entry),
    ical: `${API_URL}${ApiRoutes.eventCalendar(event.slug, session?.id)}`,
    office365: outlookCalendarUrl(entry, "office365"),
    live: outlookCalendarUrl(entry, "live"),
  };
};
