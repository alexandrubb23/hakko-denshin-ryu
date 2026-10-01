import type { SxProps, Theme } from "@mui/material";

import {
  PURPLE,
  PURPLE_ALPHA_30,
  PURPLE_ALPHA_50,
  TEXT_MUTED,
  TEXT_PRIMARY,
  WHITE_ALPHA_85,
} from "./tokens";

// Shared by the painted-art covers (home, hakko-ryu); each page adds its own
// sizes and spacing on top

export const KANJI_FONT =
  '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';

export const DISPLAY_FONT = "Jarene, serif";

export const TITLE_GLOW = `0 0 40px ${PURPLE_ALPHA_30}`;

export const COVER_HEIGHT = "100dvh";

/** Fades an element through one or more gradients, intersected */
export const fadeMask = (gradient: string) => ({
  maskImage: gradient,
  maskComposite: "intersect",
  WebkitMaskImage: gradient,
  WebkitMaskComposite: "source-in",
});

/** Small purple caption above a cover title */
export const coverEyebrowSx: SxProps<Theme> = {
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: PURPLE,
  p: 0,
};

export const coverTitleSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  textTransform: "uppercase",
  color: TEXT_PRIMARY,
  textShadow: TITLE_GLOW,
  mt: 1,
  p: 0,
};

export const coverSubtitleSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  textTransform: "uppercase",
  color: WHITE_ALPHA_85,
  mt: 1,
  p: 0,
};

/** 八光伝心流柔術 between two thin rules */
export const kanjiRuleSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2.5,
  maxWidth: 460,
  fontFamily: KANJI_FONT,
  letterSpacing: "0.3em",
  color: TEXT_MUTED,
  "&::before, &::after": {
    content: '""',
    flex: 1,
    height: "1px",
    backgroundColor: PURPLE_ALPHA_50,
  },
};

/** Kanji written top to bottom, beside a thin rule */
export const verticalKanjiSx: SxProps<Theme> = {
  writingMode: "vertical-rl",
  fontFamily: KANJI_FONT,
  lineHeight: 1,
  color: PURPLE,
  pl: 3,
  borderLeft: `1px solid ${PURPLE_ALPHA_30}`,
};
