import { SxProps, Theme } from "@mui/material";

import { KANJI_FONT, TITLE_GLOW } from "@style/art";
import { PURPLE } from "@style/tokens";

// ─── 02. What we offer ────────────────────────────────────────────────────────

// Leaves room for the card's corner kanji
export const offerTextSx: SxProps<Theme> = {
  pr: { xs: 7, md: 9 },
  mb: 0,
};

// ─── 03. Closing (valley art band) ────────────────────────────────────────────

// 道 — the Way
export const closingKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: { xs: "4rem", md: "6rem" },
  lineHeight: 1,
  color: PURPLE,
  textShadow: TITLE_GLOW,
  mb: 4,
};

export const closingTextSx: SxProps<Theme> = {
  fontSize: { xs: "1.05rem", md: "1.2rem" },
  lineHeight: 1.9,
};
