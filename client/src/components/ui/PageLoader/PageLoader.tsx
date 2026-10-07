import { Box } from "@mui/material";
import { type ReactNode, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { PAGE_TRANSITION_DURATION } from "@constants/animationsTiming";
import { NIGHT_BLACK } from "@style/tokens";

import { loaderScreenSx } from "./PageLoader.style";
import PathLoader from "./PathLoader";

interface Props {
  loading: boolean;
  /** Plays on the screen in place of the path loader, e.g. the intro */
  children?: ReactNode;
}

/**
 * Keeps the body dark while the loader is on screen, so the page fades in
 * over the night in either scheme; once it's gone, the body eases into the
 * scheme's own background.
 */
const useNightBody = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const { style } = document.body;
    style.setProperty("--body-background", NIGHT_BLACK);

    return () => {
      style.transition = `background-color ${PAGE_TRANSITION_DURATION}ms ease-in-out`;
      style.removeProperty("--body-background");
      setTimeout(() => {
        style.transition = "";
      }, PAGE_TRANSITION_DURATION);
    };
  }, [active]);
};

/**
 * A full-screen loading screen over the page; once `loading` ends it fades
 * out while the page fades in, then leaves the DOM.
 */
const PageLoader = ({ loading, children }: Props) => {
  const intl = useIntl();
  const [faded, setFaded] = useState(false);
  const shown = !(faded && !loading);
  useNightBody(shown);

  if (!shown) return null;

  return (
    <Box
      sx={loaderScreenSx(loading)}
      role="status"
      aria-label={intl.formatMessage({ id: "common.loading" })}
      aria-hidden={!loading}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget) setFaded(!loading);
      }}
    >
      {children || <PathLoader />}
    </Box>
  );
};

export default PageLoader;
