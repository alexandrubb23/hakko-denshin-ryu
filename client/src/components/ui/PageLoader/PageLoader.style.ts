import { SxProps, Theme } from "@mui/material";

import { PAGE_TRANSITION_DURATION } from "@constants/animationsTiming";
import { DARK_BG, PURPLE_ALPHA_08 } from "@style/tokens";

// The ensō is painted round a square; the moon, painted with its halo and
// rays, sits in its empty centre
const MOON_SCALE = 0.62; // of the ensō's size

// The ensō's turn and the moon's breath share one rhythm
const LOADER_CYCLE = "2.8s";

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

export const moonLoaderSx = (size: string): SxProps<Theme> => ({
  position: "relative",
  width: size,
  height: size,
  flexShrink: 0,
});

export const ensoSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  // The stroke's bright head leads, its faded tail trails behind
  animation: `ensoSpin ${LOADER_CYCLE} linear infinite`,
  "@keyframes ensoSpin": { to: { rotate: "360deg" } },
  // Still turning, so the page reads as loading, but gently
  "@media (prefers-reduced-motion: reduce)": { animationDuration: "8s" },
};

export const moonSx: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: `${MOON_SCALE * 100}%`,
  height: `${MOON_SCALE * 100}%`,
  translate: "-50% -50%",
  // The painted halo breathes
  animation: `loaderMoonGlow ${LOADER_CYCLE} ease-in-out infinite`,
  "@keyframes loaderMoonGlow": {
    "0%, 100%": { filter: "brightness(1)" },
    "50%": { filter: "brightness(1.15)" },
  },
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
};
