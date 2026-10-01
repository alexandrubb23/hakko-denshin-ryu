import type { SxProps, Theme } from "@mui/material";

import { COVER_HEIGHT, fadeMask } from "./cover.style";
import { MOON_DIAMETER, MOON_X, MOON_Y, artWidth, moonArt } from "./moonArt";

// Narrow screens: title, then the moon with the arc menu, then the motto.
// The moon art is anchored to the menu's moon, so it scales with it.

const ART_HEIGHT = `calc(var(--moon-size) / ${MOON_DIAMETER})`;
const ART_WIDTH = artWidth(ART_HEIGHT);
// Fade every edge of the art into the page background
const ART_FADE =
  "linear-gradient(180deg, transparent 0%, black 20%, black 72%, transparent 100%), linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)";

export const heroSx: SxProps<Theme> = {
  // The art is painted behind the content, inside this stacking context
  isolation: "isolate",
  minHeight: COVER_HEIGHT,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  px: 2.5,
  pt: 10,
  pb: 2,
};

export const titleSx: SxProps<Theme> = { textAlign: "center" };

export const arcMenuSx: SxProps<Theme> = {
  "--moon-size": "clamp(84px, 24vw, 140px)",
  "--arc-radius": "clamp(28px, 9vw, 72px)",
  "--arc-gap": "clamp(12px, 4vw, 32px)",
  "--arc-item-size": "clamp(1.05rem, 4.4vw, 1.5rem)",
  my: 2,
  "&::before": {
    content: '""',
    position: "absolute",
    zIndex: -1,
    width: ART_WIDTH,
    height: ART_HEIGHT,
    // The menu's moon is its first flex item, vertically centred
    left: `calc(var(--moon-size) / 2 - ${ART_WIDTH} * ${MOON_X})`,
    top: `calc(50% - ${ART_HEIGHT} * ${MOON_Y})`,
    backgroundImage: `url(${moonArt})`,
    backgroundSize: "100% 100%",
    ...fadeMask(ART_FADE),
  },
};

export const mottoSx: SxProps<Theme> = { maxWidth: 520, mx: "auto" };

export const quotesSx: SxProps<Theme> = {
  "& > *": { minHeight: 150, py: 1 },
};

export const langSwitcherPositionSx: SxProps<Theme> = { top: 20, right: 20 };

export const sealPositionSx: SxProps<Theme> = {
  top: 20,
  left: 20,
  px: 0.75,
  py: 0.5,
  fontSize: "1rem",
};
