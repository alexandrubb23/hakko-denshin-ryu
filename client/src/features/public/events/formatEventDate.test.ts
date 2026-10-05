import { describe, expect, it } from "vitest";

import { formatEventSessions } from "./formatEventDate";

describe("formatEventSessions", () => {
  it("shows one line per day, in dojo-local time", () => {
    expect(
      formatEventSessions("en-GB", [
        // 18:30–20:30 and 10:00–13:00 in Bucharest (UTC+3 in October)
        {
          startsAt: "2026-10-23T15:30:00.000Z",
          endsAt: "2026-10-23T17:30:00.000Z",
        },
        {
          startsAt: "2026-10-24T07:00:00.000Z",
          endsAt: "2026-10-24T10:00:00.000Z",
        },
      ])
    ).toEqual(["23 Oct 2026, 18:30 – 20:30", "24 Oct 2026, 10:00 – 13:00"]);
  });

  it("shows only the start when there is no end", () => {
    expect(
      formatEventSessions("en-GB", [
        { startsAt: "2026-10-23T15:30:00.000Z", endsAt: null },
      ])
    ).toEqual(["23 Oct 2026, 18:30"]);
  });

  it("shows the full range for a session that spans several days", () => {
    expect(
      formatEventSessions("en-GB", [
        {
          startsAt: "2025-07-20T05:00:00.000Z",
          endsAt: "2025-07-25T15:00:00.000Z",
        },
      ])
    ).toEqual(["20 Jul 2025, 08:00 – 25 Jul 2025, 18:00"]);
  });
});
