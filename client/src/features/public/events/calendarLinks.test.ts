import { describe, expect, it } from "vitest";

import type { Event } from "@api/events";

import {
  calendarLinks,
  eventCalendarEntry,
  googleCalendarUrl,
  outlookCalendarUrl,
  sessionCalendarEntry,
} from "./calendarLinks";

const PAGE_URL = "https://senshinkan.ro/events/taikai-2025";

const session = (id: string, startsAt: string, endsAt: string | null) => ({
  id,
  startsAt,
  endsAt,
});

const event = (sessions: Event["sessions"]): Event => ({
  id: "e1",
  name: "Taikai & Seminar",
  slug: "taikai-2025",
  type: "seminar",
  status: "published",
  startDate: sessions[0].startsAt,
  endDate: null,
  location: "Corbeanca, România",
  details: "Line one\n<b>Line two</b>",
  ticketUrl: null,
  image: null,
  createdAt: "2025-01-01T00:00:00.000Z",
  sessions,
});

// 16:00–18:00 in Bucharest (UTC+3 in May), three days running
const THREE_DAYS = [
  session("s1", "2025-05-29T13:00:00.000Z", "2025-05-29T15:00:00.000Z"),
  session("s2", "2025-05-30T13:00:00.000Z", "2025-05-30T15:00:00.000Z"),
  session("s3", "2025-05-31T13:00:00.000Z", "2025-05-31T15:00:00.000Z"),
];

const params = (url: string) => new URL(url).searchParams;

describe("eventCalendarEntry", () => {
  it("keeps the hours of a single session", () => {
    expect(eventCalendarEntry(event([THREE_DAYS[0]]), PAGE_URL)).toMatchObject({
      allDay: false,
      start: new Date("2025-05-29T13:00:00.000Z"),
      end: new Date("2025-05-29T15:00:00.000Z"),
    });
  });

  it("spans the days of several sessions, the last one included", () => {
    expect(eventCalendarEntry(event(THREE_DAYS), PAGE_URL)).toMatchObject({
      allDay: true,
      start: "2025-05-29",
      end: "2025-06-01",
    });
  });

  it("uses dojo-local days", () => {
    // 01:00 on 30 May and 23:30 on 31 May in Bucharest
    const late = [
      session("a", "2025-05-29T22:00:00.000Z", null),
      session("b", "2025-05-31T20:30:00.000Z", null),
    ];
    expect(eventCalendarEntry(event(late), PAGE_URL)).toMatchObject({
      start: "2025-05-30",
      end: "2025-06-01",
    });
  });

  it("notes the description, then the event's page", () => {
    expect(eventCalendarEntry(event(THREE_DAYS), PAGE_URL).description).toBe(
      `Line one\n<b>Line two</b>\n\n${PAGE_URL}`
    );
  });
});

describe("sessionCalendarEntry", () => {
  it("gives a session without an end an hour", () => {
    const open = session("s", "2025-05-29T13:00:00.000Z", null);
    expect(sessionCalendarEntry(event([open]), open, PAGE_URL).end).toEqual(
      new Date("2025-05-29T14:00:00.000Z")
    );
  });
});

describe("googleCalendarUrl", () => {
  it("writes timed entries in UTC", () => {
    const url = googleCalendarUrl(
      eventCalendarEntry(event([THREE_DAYS[0]]), PAGE_URL)
    );
    expect(url).toContain("dates=20250529T130000Z/20250529T150000Z");
    expect(params(url).get("text")).toBe("Taikai & Seminar");
    expect(params(url).get("location")).toBe("Corbeanca, România");
  });

  it("writes all-day entries as dates, the end excluded", () => {
    const url = googleCalendarUrl(
      eventCalendarEntry(event(THREE_DAYS), PAGE_URL)
    );
    expect(url).toContain("dates=20250529/20250601");
  });
});

describe("outlookCalendarUrl", () => {
  it.each([
    ["office365", "https://outlook.office.com/calendar/0/action/compose?"],
    ["live", "https://outlook.live.com/calendar/0/action/compose?"],
  ] as const)("opens %s's compose form", (account, prefix) => {
    const url = outlookCalendarUrl(
      eventCalendarEntry(event([THREE_DAYS[0]]), PAGE_URL),
      account
    );
    expect(url.startsWith(prefix)).toBe(true);
    expect(params(url).get("rru")).toBe("addevent");
    expect(params(url).get("startdt")).toBe("2025-05-29T13:00:00Z");
    expect(params(url).get("enddt")).toBe("2025-05-29T15:00:00Z");
    expect(params(url).has("allday")).toBe(false);
  });

  it("marks all-day entries", () => {
    const p = params(
      outlookCalendarUrl(
        eventCalendarEntry(event(THREE_DAYS), PAGE_URL),
        "live"
      )
    );
    expect(p.get("allday")).toBe("true");
    expect(p.get("startdt")).toBe("2025-05-29");
    expect(p.get("enddt")).toBe("2025-06-01");
  });

  it("keeps the subject whole and the body as safe HTML", () => {
    const p = params(
      outlookCalendarUrl(
        eventCalendarEntry(event(THREE_DAYS), PAGE_URL),
        "live"
      )
    );
    expect(p.get("subject")).toBe("Taikai and Seminar");
    expect(p.get("body")).toBe(
      `Line one<br>&lt;b&gt;Line two&lt;/b&gt;<br><br>${PAGE_URL}`
    );
  });
});

describe("calendarLinks", () => {
  const ORIGIN = "https://senshinkan.ro";

  it("links every calendar back to the event's page", () => {
    const links = calendarLinks(event(THREE_DAYS), undefined, ORIGIN);
    expect(params(links.google).get("details")).toContain(
      `${ORIGIN}/events/taikai-2025`
    );
    expect(links.ical).toMatch(/\/api\/events\/taikai-2025\/calendar\.ics$/);
  });

  it("narrows every link to the session given", () => {
    const links = calendarLinks(event(THREE_DAYS), THREE_DAYS[1], ORIGIN);
    expect(params(links.google).get("dates")).toBe(
      "20250530T130000Z/20250530T150000Z"
    );
    expect(links.ical).toMatch(/calendar\.ics\?session=s2$/);
    expect(params(links.office365).get("startdt")).toBe("2025-05-30T13:00:00Z");
  });
});
