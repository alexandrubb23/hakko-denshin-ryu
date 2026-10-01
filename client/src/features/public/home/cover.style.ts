import type { SxProps, Theme } from "@mui/material";

import { DARK_BG, PURPLE } from "@style/tokens";

// Shared by the wide and the narrow home cover

export const KANJI_FONT =
  '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';

export const COVER_HEIGHT = "100dvh";

/** Fades an element through one or more gradients, intersected */
export const fadeMask = (gradient: string) => ({
  maskImage: gradient,
  maskComposite: "intersect",
  WebkitMaskImage: gradient,
  WebkitMaskComposite: "source-in",
});

// Each layout adds its own height and layout on top
export const heroWrapperSx: SxProps<Theme> = {
  position: "relative",
  overflow: "hidden",
  backgroundColor: DARK_BG,
};

export const topAccentSx: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 2,
  background: `linear-gradient(90deg, transparent 0%, ${PURPLE} 50%, transparent 100%)`,
  zIndex: 3,
};

// The header is hidden on the home page, so the switcher lives in the hero
export const langSwitcherSx: SxProps<Theme> = {
  position: "absolute",
  zIndex: 2,
};
