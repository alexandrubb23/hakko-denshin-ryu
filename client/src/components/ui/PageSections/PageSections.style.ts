import { SxProps, Theme } from "@mui/material";

import { DISPLAY_FONT, KANJI_FONT, TITLE_GLOW, fadeMask } from "@style/art";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_15,
  PURPLE_ALPHA_50,
  SURFACE_BG,
  SURFACE_BG_02,
  TEXT_MUTED,
  TEXT_PRIMARY,
  WHITE_ALPHA_45,
  WHITE_ALPHA_75,
} from "@style/tokens";

// Content sections shared by the cover pages (hakko-ryu, dojo, schedule)

// Melts the black studio backdrop of the photos into the page background
const PHOTO_FADE =
  "radial-gradient(ellipse 70% 72% at 50% 50%, black 55%, transparent 100%)";

// ─── Sections ─────────────────────────────────────────────────────────────────

export const sectionWrapperSx: SxProps<Theme> = {
  mb: { xs: 10, md: 16 },
};

// "01 ———" index above each section title
export const sectionNumberSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  fontSize: "0.75rem",
  letterSpacing: "0.3em",
  color: PURPLE,
  mb: 2,
  padding: 0,
  "&::after": {
    content: '""',
    width: 56,
    height: "1px",
    background: `linear-gradient(90deg, ${PURPLE_ALPHA_50}, transparent)`,
  },
};

export const sectionTitleSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
  fontWeight: 400,
  lineHeight: 1.15,
  color: TEXT_PRIMARY,
  padding: 0,
};

export const sectionKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: "1rem",
  letterSpacing: "0.3em",
  color: TEXT_MUTED,
  mt: 1,
  mb: 3.5,
  padding: 0,
};

export const bodyTextSx: SxProps<Theme> = {
  color: WHITE_ALPHA_75,
  lineHeight: 1.85,
  fontSize: { xs: "0.95rem", md: "1.02rem" },
  mb: 2.5,
  padding: 0,
  "& strong": {
    color: TEXT_PRIMARY,
    fontWeight: 600,
  },
  "& a": {
    color: PURPLE,
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
};

// ─── Photos ───────────────────────────────────────────────────────────────────

// A soft moon glow behind the photo
export const photoFrameSx: SxProps<Theme> = {
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-8% -4%",
    background: `radial-gradient(circle at 50% 45%, ${PURPLE_ALPHA_15} 0%, transparent 65%)`,
    pointerEvents: "none",
  },
};

export const photoSx = (aspectRatio: string): SxProps<Theme> => ({
  position: "relative",
  aspectRatio,
  ...fadeMask(PHOTO_FADE),
});

export const photoCaptionSx: SxProps<Theme> = {
  position: "relative",
  fontFamily: KANJI_FONT,
  fontSize: "0.85rem",
  letterSpacing: "0.3em",
  color: WHITE_ALPHA_45,
  textAlign: "center",
  mt: 1,
};

// ─── Art band: a full-width strip over a painting ─────────────────────────────

export const artBandSx = (src: string): SxProps<Theme> => ({
  position: "relative",
  overflow: "hidden",
  mx: -2,
  mb: { xs: 10, md: 16 },
  py: { xs: 8, md: 14 },
  backgroundColor: DARK_BG,
  borderTop: `1px solid ${BORDER_COLOR}`,
  borderBottom: `1px solid ${BORDER_COLOR}`,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    // The paintings keep their subject around 75% of the width and their
    // left side dark for the text
    backgroundPosition: "75% 30%",
    opacity: { xs: 0.35, md: 0.7 },
    ...fadeMask(
      "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)"
    ),
  },
});

export const artBandContentSx: SxProps<Theme> = {
  position: "relative",
  maxWidth: { md: "58%" },
};

// ─── Card grid ────────────────────────────────────────────────────────────────

export const cardGridSx: SxProps<Theme> = { mt: 4 };

// ─── Kanji cards ──────────────────────────────────────────────────────────────

export const kanjiCardSx: SxProps<Theme> = {
  position: "relative",
  overflow: "hidden",
  height: "100%",
  p: { xs: 3.5, md: 5 },
  borderRadius: 3,
  border: `1px solid ${BORDER_COLOR}`,
  background: `linear-gradient(160deg, ${SURFACE_BG} 0%, ${SURFACE_BG_02} 100%)`,
  transition: "border-color 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    borderColor: BORDER_HOVER,
    backgroundColor: PURPLE_ALPHA_08,
  },
};

// Oversized kanji glowing in the card's corner
export const kanjiCardKanjiSx: SxProps<Theme> = {
  position: "absolute",
  top: { xs: 16, md: 24 },
  right: { xs: 16, md: 28 },
  writingMode: "vertical-rl",
  fontFamily: KANJI_FONT,
  fontSize: { xs: "2.6rem", md: "3.6rem" },
  lineHeight: 1,
  whiteSpace: "nowrap",
  color: PURPLE,
  opacity: 0.18,
  userSelect: "none",
  pointerEvents: "none",
};

export const kanjiCardTitleSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: "clamp(1.4rem, 3vw, 2rem)",
  fontWeight: 400,
  color: TEXT_PRIMARY,
  mb: 3,
  padding: 0,
};

// ─── Pull quote, e.g. on an art band ──────────────────────────────────────────

export const pullQuoteSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)",
  fontWeight: 400,
  lineHeight: 1.3,
  color: TEXT_PRIMARY,
  textShadow: TITLE_GLOW,
  mb: 4,
  padding: 0,
};

export const quoteRuleSx: SxProps<Theme> = {
  width: 80,
  height: "1px",
  backgroundColor: PURPLE,
  mb: 4,
};
