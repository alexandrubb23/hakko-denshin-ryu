import type { SxProps, Theme } from "@mui/material";

import { PURPLE, PURPLE_ALPHA_30 } from "@style/tokens";

import { COVER_HEIGHT, KANJI_FONT, fadeMask } from "./cover.style";
import { MOON_DIAMETER, MOON_X, MOON_Y, artWidth, moonArt } from "./moonArt";

// Wide screens: moon art + arc menu left, photo + title right

// The art fills the hero height
const ART_HEIGHT = COVER_HEIGHT;
const ART_WIDTH = artWidth(ART_HEIGHT);
// Fade the art's right edge into the page background
const ART_EDGE_FADE = "linear-gradient(90deg, black 75%, transparent 100%)";
// Fade the photo in from the title side and towards the bottom
const PHOTO_FADE =
  "linear-gradient(90deg, transparent 0%, black 45%), linear-gradient(0deg, transparent 0%, black 30%)";

export const heroSx: SxProps<Theme> = { height: COVER_HEIGHT };

export const gridSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 2,
  height: "100%",
  display: "grid",
  gridTemplateColumns: `${ART_WIDTH} 1fr`,
};

export const navColSx: SxProps<Theme> = {
  position: "relative",
  height: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${moonArt})`,
    backgroundSize: "cover",
    backgroundPosition: "left top",
    ...fadeMask(ART_EDGE_FADE),
  },
};

// Puts the menu's moon exactly over the painted moon
export const arcMenuSx: SxProps<Theme> = {
  "--moon-size": `calc(${ART_HEIGHT} * ${MOON_DIAMETER})`,
  position: "absolute",
  top: `${MOON_Y * 100}%`,
  left: `calc(${ART_WIDTH} * ${MOON_X} - var(--moon-size) / 2)`,
  translate: "0 -50%",
  zIndex: 1,
};

export const photoColSx: SxProps<Theme> = {
  position: "relative",
  height: "100%",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
};

export const photoSx: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
  width: "auto",
  maxWidth: "70%",
  objectFit: "cover",
  opacity: 0.55,
  ...fadeMask(PHOTO_FADE),
};

export const coverBlockSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  gap: { lg: 4, xl: 6 },
  pl: { lg: 2, xl: 6 },
  pr: 4,
};

export const verticalKanjiSx: SxProps<Theme> = {
  writingMode: "vertical-rl",
  fontFamily: KANJI_FONT,
  fontSize: "clamp(2.5rem, 3.6vw, 4rem)",
  lineHeight: 1,
  letterSpacing: "0.12em",
  color: PURPLE,
  pl: { lg: 3, xl: 4 },
  mt: 6,
  borderLeft: `1px solid ${PURPLE_ALPHA_30}`,
};

export const langSwitcherPositionSx: SxProps<Theme> = { top: 24, right: 32 };

export const sealPositionSx: SxProps<Theme> = { right: 40, bottom: 40 };
