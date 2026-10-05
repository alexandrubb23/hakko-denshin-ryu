import { describe, expect, it } from "vitest";

import {
  eventFormSchema,
  nextSession,
  toSessionFormValues,
  toSessionInput,
} from "./eventFormSchema";

const toStored = (row: Parameters<typeof toSessionInput>[0], id = "s1") => {
  const { startsAt, endsAt } = toSessionInput(row);
  return { id, startsAt, endsAt: endsAt ?? null };
};

describe("eventFormSchema", () => {
  it("rejects more than 31 sessions, like the API does", () => {
    const sessions = Array.from({ length: 32 }, (_, i) => ({
      date: `2026-10-${String((i % 28) + 1).padStart(2, "0")}`,
      startTime: "10:00",
      endTime: "",
    }));
    const result = eventFormSchema.safeParse({
      name: "Seminar",
      type: "seminar",
      status: "draft",
      sessions,
      location: "Bucuresti",
      details: "Ten chars at least",
      ticketUrl: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]).toMatchObject({
      path: ["sessions"],
      message: "An event can have at most 31 dates",
    });
  });

  it("round-trips form rows through the API shape", () => {
    const rows = [
      { date: "2026-10-23", startTime: "18:30", endTime: "20:30" },
      { date: "2026-10-24", startTime: "10:00", endTime: "" },
    ];
    expect(toSessionFormValues(rows.map((r) => toStored(r)))).toEqual(rows);
  });

  it("splits a legacy multi-day session into one row per day", () => {
    const start = toSessionInput({
      date: "2025-07-20",
      startTime: "08:00",
      endTime: "",
    }).startsAt;
    const end = toSessionInput({
      date: "2025-07-22",
      startTime: "18:00",
      endTime: "",
    }).startsAt;

    expect(
      toSessionFormValues([{ id: "s1", startsAt: start, endsAt: end }])
    ).toEqual([
      { date: "2025-07-20", startTime: "08:00", endTime: "18:00" },
      { date: "2025-07-21", startTime: "08:00", endTime: "18:00" },
      { date: "2025-07-22", startTime: "08:00", endTime: "18:00" },
    ]);
  });

  it("suggests the following day with the same times", () => {
    expect(
      nextSession({ date: "2026-10-31", startTime: "10:00", endTime: "13:00" })
    ).toEqual({ date: "2026-11-01", startTime: "10:00", endTime: "13:00" });
  });

  it("rejects an end time before the start time", () => {
    const result = eventFormSchema.shape.sessions.safeParse([
      { date: "2026-10-23", startTime: "18:30", endTime: "17:00" },
    ]);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual([0, "endTime"]);
  });

  it("requires at least one date", () => {
    expect(eventFormSchema.shape.sessions.safeParse([]).success).toBe(false);
  });
});
