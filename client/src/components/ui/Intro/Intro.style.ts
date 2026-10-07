import { SxProps, Theme } from "@mui/material";

import {
  DISPLAY_FONT,
  KANJI_FONT,
  REDUCED_MOTION,
  moonlitPathArt,
} from "@style/art";
import {
  NIGHT_BLACK,
  PURPLE,
  PURPLE_ALPHA_30,
  TEXT_PRIMARY,
  WHITE_ALPHA_60,
  WHITE_ALPHA_75,
  WHITE_ALPHA_85,
} from "@style/tokens";

// The intro is always on the night background, so its text keeps the dark
// scheme's colours in either scheme

// The painting fills the screen's height, its edges dissolving into the night
const ART_SIZE = "min(100dvh, 100vw)";

const LETTERBOX_HEIGHT = "9dvh";

/** Where the scene stands on its way in and out */
export type IntroStage = "dark" | "shown" | "exit";

export const introSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ART_TRANSFORM: Record<IntroStage, string> = {
  // Starts close on the scene and slowly draws back to reveal it
  dark: "scale(1.15)",
  shown: "scale(1)",
  // Then walks on, into the path
  exit: "scale(1.7)",
};

export const introArtSx = (stage: IntroStage): SxProps<Theme> => ({
  ...moonlitPathArt(ART_SIZE, "38%"),
  transform: ART_TRANSFORM[stage],
  transformOrigin: "50% 62%",
  opacity: stage === "shown" ? 1 : 0,
  // Moonlight blooms as the scene is entered
  filter: stage === "exit" ? "brightness(1.6) blur(2px)" : "brightness(1)",
  transition:
    stage === "exit"
      ? "transform 1.8s cubic-bezier(0.4, 0, 0.6, 0.6), opacity 1.6s ease-in, filter 1.2s ease-in"
      : "transform 11s cubic-bezier(0.2, 0.6, 0.2, 1), opacity 3s ease-out",
  [REDUCED_MOTION]: { transform: "none", filter: "none" },
});

/** Cinematic bars that close in over the top and bottom, then open again */
export const letterboxSx = (
  edge: "top" | "bottom",
  stage: IntroStage
): SxProps<Theme> => ({
  position: "absolute",
  [edge]: 0,
  left: 0,
  right: 0,
  zIndex: 3,
  height: stage === "shown" ? LETTERBOX_HEIGHT : 0,
  bgcolor: NIGHT_BLACK,
  transition: "height 1.2s cubic-bezier(0.65, 0, 0.35, 1)",
});

const textLayerSx = {
  position: "absolute",
  left: 0,
  right: 0,
  zIndex: 4,
  display: "grid",
  placeItems: "center",
  px: 3,
  textAlign: "center",
  pointerEvents: "none",
} as const;

export const introTextSx: SxProps<Theme> = {
  ...textLayerSx,
  bottom: `calc(${LETTERBOX_HEIGHT} + clamp(32px, 9dvh, 96px))`,
  // The lines and the title share one spot, one fading out before the next
  "& > *": { gridArea: "1 / 1" },
};

/** The opening quote, alone in the middle of the screen */
export const introQuoteSx: SxProps<Theme> = {
  ...textLayerSx,
  top: 0,
  bottom: 0,
};

/** How long a beat takes to drift in (and away), in ms */
export const BEAT_FADE = 1200;

const BEAT_FADE_TRANSITION = `opacity ${BEAT_FADE}ms ease-in-out, filter ${BEAT_FADE}ms ease-in-out`;

/** Each beat drifts in out of a blur, letters settling together, then away */
const beatSx = (visible: boolean): SxProps<Theme> => ({
  opacity: visible ? 1 : 0,
  filter: visible ? "blur(0)" : "blur(8px)",
  transform: visible ? "translateY(0)" : "translateY(12px)",
  transition: `${BEAT_FADE_TRANSITION}, transform 1.6s ease-out, letter-spacing 2.6s ease-out`,
  [REDUCED_MOTION]: { filter: "none", transform: "none" },
});

export const introLineSx = (visible: boolean): SxProps<Theme> => ({
  ...beatSx(visible),
  fontFamily: DISPLAY_FONT,
  textTransform: "uppercase",
  fontSize: "clamp(1.1rem, 2.6vw, 2.2rem)",
  // On a phone the wide spacing wraps a line that fits once settled, so it
  // would jump between two lines and one as it comes and goes: there the
  // letters hold still
  letterSpacing: { xs: "0.12em", sm: visible ? "0.12em" : "0.32em" },
  color: WHITE_ALPHA_85,
  textShadow: `0 0 32px ${PURPLE_ALPHA_30}, 0 2px 12px ${NIGHT_BLACK}`,
  p: 0,
});

/**
 * The opening quote, set as a film's title card: large and widely spaced, it
 * fades in a touch close and slowly settles back while it's read, then drifts
 * on towards the viewer as it fades away
 */
export const introQuoteTitleSx = (visible: boolean): SxProps<Theme> => ({
  ...beatSx(visible),
  transform: visible ? "scale(1)" : "scale(1.08)",
  transition: `${BEAT_FADE_TRANSITION}, transform 7s cubic-bezier(0.2, 0.6, 0.2, 1)`,
  fontFamily: DISPLAY_FONT,
  textTransform: "uppercase",
  fontSize: "clamp(1.6rem, 4.8vw, 4.2rem)",
  lineHeight: 1.25,
  // It wraps, so the spacing holds still rather than shifting its lines
  letterSpacing: "0.1em",
  // A few balanced lines rather than one long one
  maxWidth: "17em",
  textWrap: "balance",
  color: TEXT_PRIMARY,
  textShadow: `0 0 48px ${PURPLE_ALPHA_30}, 0 2px 16px ${NIGHT_BLACK}`,
  p: 0,
});

export const introTitleSx = (visible: boolean): SxProps<Theme> => ({
  ...beatSx(visible),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
});

export const introKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
  letterSpacing: "0.4em",
  // The last character's spacing would push the word off centre
  mr: "-0.4em",
  color: PURPLE,
  textShadow: `0 0 24px ${PURPLE_ALPHA_30}`,
  p: 0,
};

export const introNameSx = (visible: boolean): SxProps<Theme> => ({
  fontFamily: DISPLAY_FONT,
  textTransform: "uppercase",
  fontSize: "clamp(2rem, 6.5vw, 5rem)",
  lineHeight: 1,
  letterSpacing: visible ? "0.14em" : "0.4em",
  transition: "letter-spacing 3s ease-out",
  color: TEXT_PRIMARY,
  textShadow: `0 0 40px ${PURPLE_ALPHA_30}, 0 2px 16px ${NIGHT_BLACK}`,
  p: 0,
});

export const introCaptionSx: SxProps<Theme> = {
  mt: 1.5,
  color: WHITE_ALPHA_75,
  fontStyle: "italic",
  fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
  letterSpacing: "0.04em",
  textShadow: `0 2px 12px ${NIGHT_BLACK}`,
  p: 0,
};

export const introSkipSx = (visible: boolean): SxProps<Theme> => ({
  position: "absolute",
  right: { xs: 16, md: 40 },
  bottom: `calc(${LETTERBOX_HEIGHT} + 16px)`,
  zIndex: 5,
  px: 2,
  py: 0.75,
  color: WHITE_ALPHA_60,
  border: `1px solid ${PURPLE_ALPHA_30}`,
  borderRadius: 999,
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  backdropFilter: "blur(4px)",
  opacity: visible ? 1 : 0,
  pointerEvents: visible ? "auto" : "none",
  transition: "opacity 0.8s ease-in-out, color 0.3s, border-color 0.3s",
  "&:hover, &:focus-visible": { color: TEXT_PRIMARY, borderColor: PURPLE },
});
