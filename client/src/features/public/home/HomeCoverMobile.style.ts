import type { SxProps, Theme } from "@mui/material";

import { COVER_HEIGHT, NARROW_COVER_ART_FADE, fadeMask } from "@style/art";

import { COMPACT_ARC_SIZE } from "@components/ui/ArcNavMenu/ArcNavMenu.style";

// Narrow screens: title, then the moon with the arc menu, then the motto.
// The moon art is anchored to the menu's moon, so it scales with it.

export const heroSx: SxProps<Theme> = {
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

export const arcMenuSx: SxProps<Theme> = { ...COMPACT_ARC_SIZE, my: 2 };

export const arcArtSx: SxProps<Theme> = fadeMask(NARROW_COVER_ART_FADE);

export const mottoSx: SxProps<Theme> = { maxWidth: 520, mx: "auto" };

export const quotesSx: SxProps<Theme> = {
  "& > *": { minHeight: 150, py: 1 },
};

export const sealPositionSx: SxProps<Theme> = {
  top: 20,
  left: 20,
  px: 0.75,
  py: 0.5,
  fontSize: "1rem",
};
