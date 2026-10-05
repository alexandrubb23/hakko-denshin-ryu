import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import { PAGE_TRANSITION_DURATION } from "@constants/animationsTiming";

import MoonLoader from "./MoonLoader";
import { loaderScreenSx } from "./PageLoader.style";

interface Props {
  loading: boolean;
}

// The dark scheme's body background (see the theme's CssBaseline)
const NIGHT_BODY_BACKGROUND = "#000";

/**
 * Keeps the body dark while the loader is on screen, so the page fades in
 * over the night in either scheme; once it's gone, the body eases into the
 * scheme's own background.
 */
const useNightBody = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const { style } = document.body;
    style.setProperty("--body-background", NIGHT_BODY_BACKGROUND);

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
const PageLoader = ({ loading }: Props) => {
  const [faded, setFaded] = useState(false);
  const shown = !(faded && !loading);
  useNightBody(shown);

  if (!shown) return null;

  return (
    <Box
      sx={loaderScreenSx(loading)}
      aria-hidden={!loading}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget) setFaded(!loading);
      }}
    >
      <MoonLoader />
    </Box>
  );
};

export default PageLoader;
