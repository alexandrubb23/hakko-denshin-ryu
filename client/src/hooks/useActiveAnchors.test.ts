import { describe, expect, it } from "vitest";

import {
  initialAnchors,
  nextAnchors,
  NO_ANCHORS,
  summarizeAnchors,
} from "./useActiveAnchors";

const IDS = ["a", "b", "c", "d"];

const entry = (id: string, isIntersecting: boolean) => ({
  target: { id } as Element,
  isIntersecting,
});

describe("nextAnchors", () => {
  it("takes the report's word for the targets it names", () => {
    const next = nextAnchors(
      initialAnchors(IDS),
      [entry("b", true), entry("c", true)],
      null,
      1
    );
    expect(next.map((a) => a.active)).toEqual([false, true, true, false]);
  });

  it("keeps the others as they were", () => {
    const first = nextAnchors(initialAnchors(IDS), [entry("b", true)], null, 1);
    const next = nextAnchors(first, [entry("c", true)], null, 2);

    expect(next.map((a) => a.active)).toEqual([false, true, true, false]);
    // Unchanged targets keep when they last changed
    expect(next[1].t).toBe(1);
    expect(next[2].t).toBe(2);
  });

  it("lights the nearest to the top while none is in view", () => {
    const distances: Record<string, number> = { a: 900, b: 40, c: 300 };
    const next = nextAnchors(
      initialAnchors(IDS),
      [entry("a", false)],
      (id) => distances[id],
      1
    );

    expect(next.map((a) => a.active)).toEqual([false, true, false, false]);
    expect(next[1].fallback).toBe(true);
  });

  it("drops the stand-in once a target comes into view", () => {
    const withStandIn = nextAnchors(
      initialAnchors(IDS),
      [entry("a", false)],
      (id) => (id === "b" ? 10 : 500),
      1
    );
    expect(withStandIn[1].fallback).toBe(true);

    const next = nextAnchors(withStandIn, [entry("d", true)], () => 0, 2);

    expect(next.map((a) => a.active)).toEqual([false, false, false, true]);
  });
});

describe("summarizeAnchors", () => {
  const at = (actives: boolean[], times: number[] = []) =>
    IDS.map((id, i) => ({
      id,
      active: actives[i],
      fallback: false,
      t: times[i] ?? 0,
    }));

  it("spans the first to the last target in view", () => {
    const summary = summarizeAnchors(
      at([false, true, true, false]),
      NO_ANCHORS
    );
    expect(summary.range).toEqual([1, 2]);
    expect(summary.active).toEqual([false, true, true, false]);
  });

  it("reads the latest to come into view", () => {
    const summary = summarizeAnchors(
      at([false, true, true, false], [0, 5, 3, 0]),
      NO_ANCHORS
    );
    expect(summary.current).toBe("b");
  });

  it("has no range while none is in view", () => {
    const summary = summarizeAnchors(
      at([false, false, false, false]),
      NO_ANCHORS
    );
    expect(summary.range).toBeNull();
    expect(summary.current).toBeUndefined();
  });

  it("follows which way the reading moves", () => {
    const down = summarizeAnchors(at([false, true, true, false]), {
      ...NO_ANCHORS,
      range: [0, 1],
    });
    expect(down.movingUp).toBe(false);

    const up = summarizeAnchors(at([true, true, false, false]), down);
    expect(up.movingUp).toBe(true);

    // Unchanged, it keeps its way
    expect(summarizeAnchors(at([true, true, false, false]), up).movingUp).toBe(
      true
    );
  });
});
