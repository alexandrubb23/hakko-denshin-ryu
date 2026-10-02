import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

/**
 * Opens every new page at its top. Back / forward (POP) navigations are left
 * to the browser, which restores where the user was on that page.
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  // Before paint, so neither the page nor its view transition shows the old
  // scroll position
  useLayoutEffect(() => {
    if (navigationType === "POP") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, navigationType]);
};

export default useScrollToTop;
