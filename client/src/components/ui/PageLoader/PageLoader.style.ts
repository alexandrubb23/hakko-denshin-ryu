import { SxProps, Theme } from "@mui/material";

import { PAGE_TRANSITION_DURATION } from "@constants/animationsTiming";
import { REDUCED_MOTION, moonlitPathArt } from "@style/art";
import { DARK_BG, PURPLE_ALPHA_08 } from "@style/tokens";

// The painting's breath
const LOADER_CYCLE = "2.8s";

const PATH_ART_SIZE = "clamp(220px, 46vmin, 420px)";

export const loaderScreenSx = (visible: boolean): SxProps<Theme> => ({
  position: "fixed",
  inset: 0,
  zIndex: (theme) => theme.zIndex.modal + 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `radial-gradient(circle at 50% 50%, ${PURPLE_ALPHA_08} 0%, transparent 45%), ${DARK_BG}`,
  // Fades out as the page fades in over it
  opacity: visible ? 1 : 0,
  transition: `opacity ${PAGE_TRANSITION_DURATION}ms ease-in-out`,
  pointerEvents: visible ? "auto" : "none",
});

export const pathLoaderSx: SxProps<Theme> = {
  display: "flex",
  px: 3,
};

export const pathArtSx = (loaded: boolean): SxProps<Theme> => ({
  ...moonlitPathArt(PATH_ART_SIZE, "42%"),
  // Fades in once decoded, so it never pops onto the screen
  opacity: loaded ? 1 : 0,
  transition: "opacity 0.8s ease-in-out",
  // The moonlight breathes
  animation: `loaderPathGlow ${LOADER_CYCLE} ease-in-out infinite`,
  "@keyframes loaderPathGlow": {
    "0%, 100%": { filter: "brightness(1)" },
    "50%": { filter: "brightness(1.15)" },
  },
  [REDUCED_MOTION]: { animation: "none" },
});
