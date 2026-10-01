import type { SxProps, Theme } from "@mui/material";

import {
  COVER_HEIGHT,
  fadeMask,
  verticalKanjiSx as verticalKanjiBaseSx,
} from "@style/art";
import { mergeSx } from "@utils/sx";

import { artWidth, menuOnArt } from "@components/ui/ArcNavMenu/moonArt";

import { HOME_MOON_ART } from "./homeArt";

// Wide screens: moon art + arc menu left, photo + title right

// The art fills the hero height
const ART_HEIGHT = COVER_HEIGHT;
const ART_WIDTH = artWidth(HOME_MOON_ART, ART_HEIGHT);
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
};

// Sizes the menu so its painting fills the column, top-left aligned
export const arcMenuSx: SxProps<Theme> = {
  ...menuOnArt(HOME_MOON_ART, "right", ART_HEIGHT),
  zIndex: 1,
};

export const arcArtSx: SxProps<Theme> = fadeMask(ART_EDGE_FADE);

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

export const verticalKanjiSx = mergeSx(verticalKanjiBaseSx, {
  fontSize: "clamp(2.5rem, 3.6vw, 4rem)",
  letterSpacing: "0.12em",
  pl: { lg: 3, xl: 4 },
  mt: 6,
});

export const sealPositionSx: SxProps<Theme> = { right: 40, bottom: 40 };
