import { useEffect, useState } from "react";

// Ported from Fumadocs' table of contents (fumadocs-core/toc, MIT,
// Copyright (c) 2023 Fuma)

/** A target counts as in view once this much of it shows */
const THRESHOLD = 0.9;

/** One target's state between the observer's reports */
export interface AnchorState {
  id: string;
  active: boolean;
  /** Lit only because none is in view: the nearest to the top */
  fallback: boolean;
  /** When it last came into view or left it */
  t: number;
}

export interface ActiveAnchors {
  /** Whether each target is in view, in the order of the ids */
  active: readonly boolean[];
  /** The first and last of them in view (indices), or null if none */
  range: readonly [number, number] | null;
  /** The latest to come into view: the one being read */
  current: string | undefined;
  /** Whether the reading last moved up the page */
  movingUp: boolean;
}

type Entry = Pick<IntersectionObserverEntry, "target" | "isIntersecting">;

export const initialAnchors = (ids: readonly string[]): AnchorState[] =>
  ids.map((id) => ({ id, active: false, fallback: false, t: 0 }));

/**
 * The targets after an observer report: those reported take its word, the
 * others keep theirs (a fallback is dropped). While none is in view, the
 * nearest to the top stands in, by `distance` (undefined: not on the page).
 */
export const nextAnchors = (
  anchors: readonly AnchorState[],
  entries: readonly Entry[],
  distance: ((id: string) => number | undefined) | null,
  now: number
): AnchorState[] => {
  const next = anchors.map((anchor) => {
    const entry = entries.find((e) => e.target.id === anchor.id);
    const active = entry
      ? entry.isIntersecting
      : anchor.active && !anchor.fallback;
    return anchor.active === active
      ? anchor
      : { ...anchor, active, fallback: false, t: now };
  });

  if (next.some((anchor) => anchor.active) || !distance) return next;

  let nearest = -1;
  let min = Infinity;
  next.forEach((anchor, i) => {
    const d = distance(anchor.id);
    if (d !== undefined && d < min) [nearest, min] = [i, d];
  });
  if (nearest !== -1) {
    next[nearest] = { ...next[nearest], active: true, fallback: true, t: now };
  }
  return next;
};

/** What the reader sees of the targets, against what they saw before */
export const summarizeAnchors = (
  anchors: readonly AnchorState[],
  previous: ActiveAnchors
): ActiveAnchors => {
  const active = anchors.map((anchor) => anchor.active);
  const start = active.indexOf(true);
  const range =
    start === -1 ? null : ([start, active.lastIndexOf(true)] as const);

  const current = anchors
    .filter((anchor) => anchor.active)
    .reduce<
      AnchorState | undefined
    >((latest, anchor) => (!latest || anchor.t > latest.t ? anchor : latest), undefined)?.id;

  // Up when the range's either end moved up; unchanged, it keeps its way
  const [prevStart, prevEnd] = previous.range ?? [];
  const movingUp =
    range && prevStart !== undefined && prevEnd !== undefined
      ? prevStart > range[0] ||
        prevEnd > range[1] ||
        (prevStart === range[0] && prevEnd === range[1] && previous.movingUp)
      : previous.movingUp;

  return { active, range, current, movingUp };
};

/** Before the observer's first report: nothing in view */
export const NO_ANCHORS: ActiveAnchors = {
  active: [],
  range: null,
  current: undefined,
  movingUp: false,
};

/**
 * Which of the elements of `ids` are in view as the page scrolls, for a table
 * of contents. Several can be at once; while none is, the nearest to the top
 * stands in, so a long section's row stays lit. `ids` should keep its
 * identity between renders: a new array re-observes every target.
 */
const useActiveAnchors = (ids: readonly string[]): ActiveAnchors => {
  const [anchors, setAnchors] = useState(NO_ANCHORS);

  useEffect(() => {
    let state = initialAnchors(ids);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length === 0) return;
        const viewTop = entries[0].rootBounds?.top;
        const distance =
          viewTop === undefined
            ? null
            : (id: string) => {
                const element = document.getElementById(id);
                return element
                  ? Math.abs(viewTop - element.getBoundingClientRect().top)
                  : undefined;
              };

        state = nextAnchors(state, entries, distance, Date.now());
        setAnchors((previous) => summarizeAnchors(state, previous));
      },
      { threshold: THRESHOLD }
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return anchors;
};

export default useActiveAnchors;
