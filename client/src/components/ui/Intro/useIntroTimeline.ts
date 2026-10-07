import { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import { getQuoteDisplayTime } from "@utils/time";

import { BEAT_FADE, type IntroStage } from "./Intro.style";

/** The lines shown in turn below the quote, each keyed `intro.<line>` */
export const INTRO_LINES = ["line1", "line2"] as const;

/** The words shown in turn before the title: the quote mid-screen, then the lines */
export const INTRO_WORDS = ["quote", ...INTRO_LINES] as const;
export type IntroWords = (typeof INTRO_WORDS)[number];

/** The words, then the dojo's name, in the order they're shown */
export const INTRO_BEATS = [...INTRO_WORDS, "title"] as const;

/** Which words are on screen */
export type IntroBeat = "none" | (typeof INTRO_BEATS)[number];

// The intro's timeline, in ms from its start
const SHOWN_AT = 80;
export const SKIP_SHOWN_AT = 800;
const FIRST_WORDS_AT = 1200;
// The pause after each of the words, so it fades out before the next fades in
const BEAT_GAP = 700;
const TITLE_HOLD = 4900;
// The page starts fading in this long into the exit, as the scene is entered
export const EXIT_HANDOFF = 900;

/**
 * The quote, then each line in turn, a pause after each, then the title: each
 * of the words holds long enough to be read, as the quotes elsewhere do, once
 * it has faded in. `duration` runs from the intro's start to `onEnd`, when
 * left to play out.
 */
export const introTimeline = (textOf: (words: IntroWords) => string) => {
  const beats: [at: number, beat: IntroBeat][] = [];
  let at = FIRST_WORDS_AT;
  for (const words of INTRO_WORDS) {
    const hold = BEAT_FADE + getQuoteDisplayTime(textOf(words));
    beats.push([at, words], [at + hold, "none"]);
    at += hold + BEAT_GAP;
  }
  beats.push([at, "title"]);
  const exitAt = at + TITLE_HOLD;
  return { beats, exitAt, duration: exitAt + EXIT_HANDOFF };
};

/**
 * Runs the intro's timeline for the words `textOf` gives, and its skip (the
 * button's `skip`, or Escape); `onEnd` is called once, as the scene is entered.
 */
const useIntroTimeline = (
  onEnd: () => void,
  textOf: (words: IntroWords) => string
) => {
  // Timed once, as it starts, so a change of language doesn't upset it
  const [{ beats, exitAt }] = useState(() => introTimeline(textOf));
  const [stage, setStage] = useState<IntroStage>("dark");
  const [beat, setBeat] = useState<IntroBeat>("none");
  // The latest words shown, kept through the pauses between them
  const [reached, setReached] = useState<IntroBeat>("none");
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
      ...beats.map(([at, next]) =>
        setTimeout(() => {
          setBeat(next);
          if (next !== "none") setReached(next);
        }, at)
      ),
      setTimeout(exit, exitAt),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, [exit, beats, exitAt]);

  // Escape skips, as with any intro
  useEventListener("keydown", (e) => {
    if (e.key === "Escape") exit();
  });

  return { stage, beat, reached, skipShown, skip: exit };
};

export default useIntroTimeline;
