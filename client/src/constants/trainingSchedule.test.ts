import { describe, expect, it } from "vitest";

import {
  getGroupStats,
  getSessionMinutes,
  getSessionsByDay,
  TRAINING_DAYS,
} from "./trainingSchedule";

describe("trainingSchedule", () => {
  it("derives the training days from the sessions", () => {
    expect(TRAINING_DAYS).toEqual([2, 4, 6]);
  });

  it("computes a session's length in minutes", () => {
    expect(
      getSessionMinutes({ day: 2, group: "kid", start: "18:15", end: "19:15" })
    ).toBe(60);
    expect(
      getSessionMinutes({
        day: 2,
        group: "senior",
        start: "19:30",
        end: "21:00",
      })
    ).toBe(90);
  });

  it("sums weekly sessions per group", () => {
    expect(getGroupStats("kid")).toEqual({ count: 2, minutes: 120 });
    expect(getGroupStats("senior")).toEqual({ count: 3, minutes: 270 });
  });

  it("groups every session by day when no group is given", () => {
    const byDay = getSessionsByDay();
    expect(byDay.map(({ day }) => day)).toEqual([2, 4, 6]);
    expect(byDay.map(({ sessions }) => sessions.length)).toEqual([2, 1, 2]);
  });

  it("omits days without sessions for the selected group", () => {
    const byDay = getSessionsByDay("kid");
    expect(byDay.map(({ day }) => day)).toEqual([2, 6]);
    const groups = byDay.flatMap(({ sessions }) =>
      sessions.map((s) => s.group)
    );
    expect(new Set(groups)).toEqual(new Set(["kid"]));
  });
});
