import moonArt from "@assets/images/hakko-moon-bg.webp";
import type { SxProps, Theme } from "@mui/material";

import {
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_30,
  PURPLE_ALPHA_50,
  TEXT_MUTED,
  TEXT_PRIMARY,
  WHITE_ALPHA_85,
} from "@style/tokens";

// Wide screens: moon art + arc menu left, photo + title right

// The art fills the hero height; these locate the moon painted in it
// (measured on hakko-moon-bg.webp, as fractions of the image size)
const ART_HEIGHT = "100dvh";
const ART_ASPECT = 1024 / 1536;
const MOON_X = 0.3022; // of the width
const MOON_Y = 0.4336; // of the height
const MOON_DIAMETER = 0.1465; // of the height

const ART_WIDTH = `calc(${ART_HEIGHT} * ${ART_ASPECT.toFixed(4)})`;
// Fade the art's right edge into the page background
const ART_EDGE_FADE = "linear-gradient(90deg, black 75%, transparent 100%)";
// Fade the photo in from the title side and towards the bottom
const PHOTO_FADE =
  "linear-gradient(90deg, transparent 0%, black 45%), linear-gradient(0deg, transparent 0%, black 30%)";

const KANJI_FONT =
  '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif';

export const desktopGridSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 2,
  height: "100%",
  display: "grid",
  gridTemplateColumns: `${ART_WIDTH} 1fr`,
};

export const desktopNavColSx: SxProps<Theme> = {
  position: "relative",
  height: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${moonArt})`,
    backgroundSize: "cover",
    backgroundPosition: "left top",
    maskImage: ART_EDGE_FADE,
    WebkitMaskImage: ART_EDGE_FADE,
  },
};

// Puts the menu's moon exactly over the painted moon
export const arcMenuPositionSx: SxProps<Theme> = {
  "--moon-size": `calc(${ART_HEIGHT} * ${MOON_DIAMETER})`,
  position: "absolute",
  top: `${MOON_Y * 100}%`,
  left: `calc(${ART_WIDTH} * ${MOON_X} - var(--moon-size) / 2)`,
  translate: "0 -50%",
  zIndex: 1,
};

export const desktopPhotoColSx: SxProps<Theme> = {
  position: "relative",
  height: "100%",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
};

export const desktopPhotoSx: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  right: 0,
  height: "100%",
  width: "auto",
  maxWidth: "70%",
  objectFit: "cover",
  opacity: 0.55,
  maskImage: PHOTO_FADE,
  maskComposite: "intersect",
  WebkitMaskImage: PHOTO_FADE,
  WebkitMaskComposite: "source-in",
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

export const coverCaptionSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: "clamp(0.8rem, 1.1vw, 1.05rem)",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: PURPLE,
};

export const coverTitleSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: "clamp(3rem, 5.2vw, 6rem)",
  lineHeight: 1.1,
  textTransform: "uppercase",
  color: TEXT_PRIMARY,
  textShadow: `0 0 40px ${PURPLE_ALPHA_30}`,
  p: 0,
  mt: 1,
};

export const coverCountrySx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: "clamp(1.4rem, 2.2vw, 2.4rem)",
  letterSpacing: "0.6em",
  textTransform: "uppercase",
  color: WHITE_ALPHA_85,
  mt: 1,
};

// 八光伝心流柔術 between two thin rules
export const coverRuleSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2.5,
  mt: 3,
  maxWidth: 460,
  fontFamily: KANJI_FONT,
  fontSize: "clamp(1rem, 1.3vw, 1.3rem)",
  letterSpacing: "0.3em",
  color: TEXT_MUTED,
  "&::before, &::after": {
    content: '""',
    flex: 1,
    height: "1px",
    backgroundColor: PURPLE_ALPHA_50,
  },
};

export const coverTaglineSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontStyle: "italic",
  fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
  color: "rgba(255,255,255,0.75)",
  mt: 3,
};

export const coverQuotesSx: SxProps<Theme> = {
  maxWidth: 560,
  mt: 1,
  // Quotes centre themselves; the cover layout is left-aligned
  "& > *": { justifyContent: "flex-start", px: 0, textAlign: "left" },
};

// The header is hidden on this layout, so the switcher lives in the hero
export const langSwitcherSx: SxProps<Theme> = {
  position: "absolute",
  top: 24,
  right: 32,
  zIndex: 2,
};

export const sealSx: SxProps<Theme> = {
  position: "absolute",
  right: 40,
  bottom: 40,
  zIndex: 1,
  px: 1.25,
  py: 0.75,
  fontFamily: KANJI_FONT,
  fontSize: "1.35rem",
  fontWeight: 700,
  lineHeight: 1.25,
  letterSpacing: "0.08em",
  color: PURPLE,
  border: `2px solid ${PURPLE}`,
  borderRadius: "6px",
  backgroundColor: PURPLE_ALPHA_08,
  boxShadow: `0 0 18px ${PURPLE_ALPHA_30}`,
  writingMode: "vertical-rl",
};
