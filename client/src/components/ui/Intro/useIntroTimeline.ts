import { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import type { IntroStage } from "./Intro.style";

/** Which words are on screen */
export type IntroBeat = "none" | "line1" | "line2" | "title";

// The intro's timeline, in ms from its start
const SHOWN_AT = 80;
export const SKIP_SHOWN_AT = 800;
// Each beat holds until the next, with a pause between them so one line
// fades out before the next fades in
const BEATS: [at: number, beat: IntroBeat][] = [
  [1200, "line1"],
  [3700, "none"],
  [4400, "line2"],
  [6900, "none"],
  [7600, "title"],
];
const EXIT_AT = 11000;

// The page starts fading in this long into the exit, as the scene is entered
export const EXIT_HANDOFF = 900;

/** From the intro's start to `onEnd`, when left to play out */
export const INTRO_DURATION = EXIT_AT + EXIT_HANDOFF;

/**
 * Runs the intro's timeline, and its skip (the button's `skip`, or Escape);
 * `onEnd` is called once, as the scene is entered.
 */
const useIntroTimeline = (onEnd: () => void) => {
  const [stage, setStage] = useState<IntroStage>("dark");
  const [beat, setBeat] = useState<IntroBeat>("none");
  const [skipShown, setSkipShown] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const exited = useRef(false);

  // The latest callback, so a new one doesn't restart the timeline
  const onEndRef = useRef(onEnd);
  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  const exit = useCallback(() => {
    // A skip as it ends on its own, or a second skip, changes nothing
    if (exited.current) return;
    exited.current = true;
    timers.current.forEach(clearTimeout);
    setStage("exit");
    // The words drift away with the scene
    setBeat("none");
    setSkipShown(false);
    timers.current = [setTimeout(() => onEndRef.current(), EXIT_HANDOFF)];
  }, []);

  useEffect(() => {
    timers.current = [
      setTimeout(() => setStage("shown"), SHOWN_AT),
      setTimeout(() => setSkipShown(true), SKIP_SHOWN_AT),
      ...BEATS.map(([at, next]) => setTimeout(() => setBeat(next), at)),
      setTimeout(exit, EXIT_AT),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, [exit]);

  // Escape skips, as with any intro
  useEventListener("keydown", (e) => {
    if (e.key === "Escape") exit();
  });

  return { stage, beat, skipShown, skip: exit };
};

export default useIntroTimeline;
