import type { SxProps, Theme } from "@mui/material";

import {
  PURPLE,
  PURPLE_ALPHA_30,
  TEXT_PRIMARY,
  WHITE_ALPHA_75,
  WHITE_ALPHA_85,
} from "./tokens";

import { mergeSx } from "@utils/sx";

// Shared by the painted-art covers (home, hakko-ryu, dojo); each page adds its own
// sizes and spacing on top

export const KANJI_FONT =
  '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';

export const DISPLAY_FONT = "Jarene, serif";

export const TITLE_GLOW = `0 0 40px ${PURPLE_ALPHA_30}`;

export const COVER_HEIGHT = "100dvh";

// Narrow screens: the art floats mid-cover; fade every edge into the page
export const NARROW_COVER_ART_FADE = [
  "linear-gradient(180deg, transparent 0%, black 20%, black 72%, transparent 100%)",
  "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
].join(", ");

/** Fades an element through one or more gradients, intersected */
export const fadeMask = (gradient: string) => ({
  maskImage: gradient,
  maskComposite: "intersect",
  WebkitMaskImage: gradient,
  WebkitMaskComposite: "source-in",
});

/** The cover box; each layout adds its own height and layout on top */
export const coverWrapperSx: SxProps<Theme> = {
  position: "relative",
  // The arc menu paints its art behind the content, inside this stacking context
  isolation: "isolate",
  overflow: "hidden",
};

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

/** Italic line of prose under a cover title */
export const coverTaglineSx: SxProps<Theme> = {
  fontStyle: "italic",
  fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
  color: WHITE_ALPHA_75,
  mt: 3,
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

/** The cover's vertical kanji, beside the title on wide screens */
export const coverVerticalKanjiSx = mergeSx(verticalKanjiSx, {
  fontSize: "clamp(2.5rem, 3.6vw, 4rem)",
  letterSpacing: "0.12em",
});
