import { useCallback, useLayoutEffect, useState } from "react";

import { getSearchParams } from "@utils/routes";

const WELCOMED_KEY = "intro-seen";

// `?intro` in the address plays it again, e.g. to show it off
const REPLAY_PARAM = "intro";

// Storage can be blocked: then they're welcomed every visit rather than never
const wasWelcomed = () => {
  try {
    return sessionStorage.getItem(WELCOMED_KEY) !== null;
  } catch {
    return false;
  }
};

const markWelcomed = () => {
  try {
    sessionStorage.setItem(WELCOMED_KEY, "1");
  } catch {
    // See wasWelcomed
  }
};

/**
 * Whether the intro plays: once a session (or whenever asked for with
 * `?intro`), never for automated browsers.
 * Both flags start false on the server and the first client render, so
 * hydration matches; `done` turns true once the intro has ended or been
 * skipped (straight away when it doesn't play), and `play` stays true while
 * it fades away.
 */
const useIntro = () => {
  const [play, setPlay] = useState(false);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const replay = getSearchParams().has(REPLAY_PARAM);
    if (!replay && (wasWelcomed() || navigator.webdriver)) setDone(true);
    else setPlay(true);
  }, []);

  // Marked only once it's over, so leaving midway brings it back next visit
  const finish = useCallback(() => {
    markWelcomed();
    setDone(true);
  }, []);

  return { play, done, finish };
};

export default useIntro;
