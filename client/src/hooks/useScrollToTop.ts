import { useLocation, useNavigationType } from "react-router";
import { useEventListener, useIsomorphicLayoutEffect } from "usehooks-ts";

import { scrollToHash } from "@utils/scroll";

// Where the user was on each history entry, keyed by `location.key`
const scrollPositions = new Map<string, number>();

const PASSIVE = { passive: true };

/**
 * Opens every new page at its top, or at the section of its #hash, and back /
 * forward (POP) navigations where the user left that page. The app restores
 * scroll itself: left to the browser, a reload reopens the page wherever the
 * user had scrolled.
 */
const useScrollToTop = () => {
  const { key, pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useIsomorphicLayoutEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useEventListener(
    "scroll",
    () => scrollPositions.set(key, window.scrollY),
    undefined,
    PASSIVE
  );

  // Before paint, so neither the page nor its view transition shows the old
  // scroll position. A reload is a POP with nothing saved, so it opens at the
  // top. Only a new page scrolls: a query-string change on the same page (e.g.
  // a tab recorded in the URL) keeps the scroll, though it changes the
  // navigation type to REPLACE. So it runs on the pathname alone: rerunning
  // would also let go of the #section still being followed
  useIsomorphicLayoutEffect(() => {
    const saved =
      navigationType === "POP" ? scrollPositions.get(key) : undefined;
    if (saved === undefined && hash) return scrollToHash(hash);
    window.scrollTo({ top: saved ?? 0, left: 0, behavior: "instant" });
  }, [pathname]);
};

export default useScrollToTop;
