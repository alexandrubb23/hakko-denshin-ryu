import { describe, expect, it } from "vitest";

import {
  countEventDays,
  describeSession,
  formatDuration,
  formatEventSessions,
  formatEventSpan,
} from "./formatEventDate";

// 18:30–20:30 Fri, 10:00–13:00 Sat in Bucharest (UTC+3 in October)
const WEEKEND = [
  { startsAt: "2026-10-23T15:30:00.000Z", endsAt: "2026-10-23T17:30:00.000Z" },
  { startsAt: "2026-10-24T07:00:00.000Z", endsAt: "2026-10-24T10:00:00.000Z" },
];

// 08:00 on 20 Jul to 18:00 on 25 Jul in Bucharest (UTC+3)
const CAMP = {
  startsAt: "2025-07-20T05:00:00.000Z",
  endsAt: "2025-07-25T15:00:00.000Z",
};

// The weekend's first session, without an end
const NO_END = { ...WEEKEND[0], endsAt: null };

describe("formatEventSessions", () => {
  it("shows one line per day, in dojo-local time", () => {
    expect(formatEventSessions("en-GB", WEEKEND)).toEqual([
      "23 Oct 2026, 18:30 – 20:30",
      "24 Oct 2026, 10:00 – 13:00",
    ]);
  });

  it("shows only the start when there is no end", () => {
    expect(formatEventSessions("en-GB", [NO_END])).toEqual([
      "23 Oct 2026, 18:30",
    ]);
  });

  it("shows the full range for a session that spans several days", () => {
    expect(formatEventSessions("en-GB", [CAMP])).toEqual([
      "20 Jul 2025, 08:00 – 25 Jul 2025, 18:00",
    ]);
  });
});

describe("formatEventSpan", () => {
  it("spans the first to the last day", () => {
    expect(formatEventSpan("en-GB", WEEKEND)).toBe("23–24 Oct 2026");
  });

  it("shows a single date for a one-day event", () => {
    expect(formatEventSpan("en-GB", [WEEKEND[0]])).toBe("23 Oct 2026");
  });

  it("reaches the end of a session that runs over several days", () => {
    expect(formatEventSpan("en-GB", [CAMP])).toBe("20–25 Jul 2025");
  });
});

describe("countEventDays", () => {
  it("counts the first and last day", () => {
    expect(countEventDays(WEEKEND)).toBe(2);
    expect(countEventDays([CAMP])).toBe(6);
  });

  it("counts dojo-local days, not UTC ones", () => {
    // 23:30 on 24 Oct and 01:00 on 25 Oct in Bucharest: two days there,
    // though both fall on 24 Oct in UTC
    expect(
      countEventDays([
        { startsAt: "2026-10-24T20:30:00.000Z", endsAt: null },
        { startsAt: "2026-10-24T22:00:00.000Z", endsAt: null },
      ])
    ).toBe(2);
  });
});

describe("formatDuration", () => {
  it.each([
    [45, "45 min"],
    [120, "2 h"],
    [150, "2 h 30 min"],
  ])("%i minutes -> %s", (minutes, expected) => {
    expect(formatDuration(minutes)).toBe(expected);
  });
});

describe("describeSession", () => {
  it("describes a same-day session in dojo-local time", () => {
    expect(describeSession("en-GB", WEEKEND[0])).toEqual({
      weekday: 5,
      weekdayName: "Friday",
      date: "23 Oct 2026",
      startTime: "18:30",
      endTime: "20:30",
      endDate: null,
      minutes: 120,
    });
  });

  it("names the weekday in the locale, capitalised", () => {
    expect(describeSession("ro-RO", WEEKEND[1]).weekdayName).toBe("Sâmbătă");
  });

  it("gives the end date of a session that runs over several days", () => {
    expect(describeSession("en-GB", CAMP)).toMatchObject({
      weekday: 0,
      date: "20 Jul 2025",
      endDate: "25 Jul 2025",
      endTime: "18:00",
      minutes: null,
    });
  });

  it("has no end time or length without an end", () => {
    expect(describeSession("en-GB", NO_END)).toMatchObject({
      endTime: null,
      endDate: null,
      minutes: null,
    });
  });
});
