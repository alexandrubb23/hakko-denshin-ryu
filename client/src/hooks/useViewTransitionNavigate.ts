import { useCallback, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router";

// Ends the view transition in flight, once its page has rendered
let finishTransition: (() => void) | null = null;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Navigates inside a view transition: elements named alike on both pages
 * (e.g. the arc menu's moon, rays and links) glide to their new place while the
 * rest cross-fades. Plain navigation where unsupported or with reduced
 * motion.
 *
 * The router renders navigations in a React transition, which `flushSync`
 * can't force, so the view transition waits for `useViewTransitionCommit`
 * to see the new page instead.
 */
export const useViewTransitionNavigate = () => {
  const navigate = useNavigate();

  return useCallback(
    (to: string) => {
      if (
        typeof document.startViewTransition !== "function" ||
        prefersReducedMotion()
      ) {
        navigate(to);
        return;
      }

      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            // A newer navigation supersedes one still waiting for its page
            finishTransition?.();
            finishTransition = resolve;
            navigate(to);
          })
      );
    },
    [navigate]
  );
};

/** Call once, above the routes, so pending view transitions can finish */
export const useViewTransitionCommit = () => {
  // Keyed on the location entry, not the pathname, so a navigation that keeps
  // the path (e.g. a new query string) still ends its transition
  const { key } = useLocation();

  // Before paint, so the transition captures the new page's first frame
  useLayoutEffect(() => {
    finishTransition?.();
    finishTransition = null;
  }, [key]);
};
