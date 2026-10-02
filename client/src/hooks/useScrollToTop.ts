import { useLocation, useNavigationType } from "react-router";
import { useEventListener, useIsomorphicLayoutEffect } from "usehooks-ts";

// Where the user was on each history entry, keyed by `location.key`
const scrollPositions = new Map<string, number>();

const PASSIVE = { passive: true };

/**
 * Opens every new page at its top, and back / forward (POP) navigations where
 * the user left that page. The app restores scroll itself: left to the
 * browser, a reload reopens the page wherever the user had scrolled.
 */
const useScrollToTop = () => {
  const { key, pathname } = useLocation();
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
  // top; query-string changes on the same page keep the scroll
  useIsomorphicLayoutEffect(() => {
    const top = navigationType === "POP" ? (scrollPositions.get(key) ?? 0) : 0;
    window.scrollTo({ top, left: 0, behavior: "instant" });
  }, [pathname, navigationType]);
};

export default useScrollToTop;
