import type { SxProps, Theme } from "@mui/material";

import {
  PURPLE,
  PURPLE_ALPHA_30,
  TEXT_PRIMARY,
  WHITE_ALPHA_75,
  WHITE_ALPHA_85,
} from "./colorScheme";

import { mergeSx } from "@utils/sx";

// Shared by the painted-art covers (home, hakko-ryu, dojo); each page adds its own
// sizes and spacing on top

export const KANJI_FONT =
  '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';

export const DISPLAY_FONT = "Jarene, serif";

export const TITLE_GLOW = `0 0 40px ${PURPLE_ALPHA_30}`;

export const COVER_HEIGHT = "100dvh";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const REDUCED_MOTION = `@media ${REDUCED_MOTION_QUERY}`;

/** The same, for motion started from script (scrolling, view transitions) */
export const prefersReducedMotion = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

// The settle of controls sliding in and out of the screen's edge
const SLIDE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Slides with `SLIDE_EASE`, plus any `extra` transitions; still if reduced */
export const slideMotionSx = (...extra: string[]) =>
  ({
    transition: [`transform 0.35s ${SLIDE_EASE}`, ...extra].join(", "),
    [REDUCED_MOTION]: { transition: "none" },
  }) as const;

// Lifts the floating controls off the paper and the painted bands
export const CONTROL_SHADOW = "0 4px 16px rgba(0,0,0,0.25)";

// The slow settle of round art zooming on hover (belts, practice thumbs)
export const ART_ZOOM_TRANSITION =
  "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

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

/**
 * The moonlit path painting (loader and intro): a square of `size` whose
 * edges dissolve into the night from `clearTo` of the way out
 */
export const moonlitPathArt = (size: string, clearTo: string) => ({
  width: size,
  height: size,
  flexShrink: 0,
  ...fadeMask(
    `radial-gradient(circle at 50% 46%, black ${clearTo}, transparent 70%)`
  ),
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
