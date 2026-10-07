import {
  calendarDescription,
  calendarSessionEnd,
  compactUtc,
} from "@hakko/core";

// iCalendar (RFC 5545) files, for calendars that import them: Apple
// Calendar, desktop Outlook, Thunderbird…

const CRLF = "\r\n";
const MAX_LINE_OCTETS = 75;
const UID_DOMAIN = "senshinkan.ro";

const encoder = new TextEncoder();

/** Escapes a TEXT value: backslashes, commas, semicolons and line breaks */
const escapeText = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

/**
 * Folds a content line into lines of at most 75 octets, each continuation
 * starting with a space; never splits a character's UTF-8 bytes
 */
const foldLine = (line: string) => {
  const lines: string[] = [];
  let current = "";
  let octets = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    // Continuations lose an octet to their leading space
    const limit = lines.length ? MAX_LINE_OCTETS - 1 : MAX_LINE_OCTETS;
    if (octets + size > limit) {
      lines.push(current);
      current = "";
      octets = 0;
    }
    current += char;
    octets += size;
  }
  lines.push(current);
  return lines.join(`${CRLF} `);
};

export interface CalendarEvent {
  name: string;
  details: string;
  location: string;
  /** The event's page, linked from each entry */
  pageUrl: string;
  sessions: { id: string; startsAt: Date; endsAt: Date | null }[];
}

/** One VEVENT per session, so each day keeps its own hours */
export const buildEventCalendar = (
  { name, details, location, pageUrl, sessions }: CalendarEvent,
  now = new Date()
) => {
  const description = calendarDescription(details, pageUrl);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Senshinkan Romania//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...sessions.flatMap((session) => [
      "BEGIN:VEVENT",
      // Stable, so importing again updates the entry rather than doubling it
      `UID:${session.id}@${UID_DOMAIN}`,
      `DTSTAMP:${compactUtc(now)}`,
      `DTSTART:${compactUtc(session.startsAt)}`,
      `DTEND:${compactUtc(calendarSessionEnd(session))}`,
      `SUMMARY:${escapeText(name)}`,
      `LOCATION:${escapeText(location)}`,
      `DESCRIPTION:${escapeText(description)}`,
      `URL:${pageUrl}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ];
  return lines.map(foldLine).join(CRLF) + CRLF;
};
