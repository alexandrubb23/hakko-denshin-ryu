import type { SxProps, Theme } from "@mui/material";

import {
  PURPLE,
  PURPLE_ALPHA_30,
  PURPLE_ALPHA_50,
  TEXT_MUTED,
  TEXT_PRIMARY,
  WHITE_ALPHA_75,
  WHITE_ALPHA_85,
} from "@style/tokens";

import { KANJI_FONT } from "./cover.style";

export const coverCaptionSx: SxProps<Theme> = {
  fontSize: "clamp(0.8rem, 1.1vw, 1.05rem)",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: PURPLE,
};

export const coverTitleSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: {
    xs: "clamp(2.6rem, 12vw, 4.5rem)",
    lg: "clamp(3rem, 5.2vw, 6rem)",
  },
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
  fontStyle: "italic",
  fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
  color: WHITE_ALPHA_75,
  mt: 3,
};

export const coverQuotesSx: SxProps<Theme> = {
  maxWidth: 560,
  mt: 1,
};

// Quotes centre themselves; undo that where the cover is left-aligned
export const coverQuotesStartSx: SxProps<Theme> = {
  "& > *": { justifyContent: "flex-start", px: 0, textAlign: "left" },
};
