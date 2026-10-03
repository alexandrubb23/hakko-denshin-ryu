import { SxProps, Theme } from "@mui/material";

import { kanjiCardBodySx } from "@components/ui/PageSections/PageSections.style";
import { KANJI_FONT, TITLE_GLOW } from "@style/art";
import { PURPLE } from "@style/tokens";

// ─── Cover photo ──────────────────────────────────────────────────────────────

// Clear of the painted room, in the cover's dark corner
export const coverPhotoSx: SxProps<Theme> = { mr: "160px" };

// ─── 02. What we offer ────────────────────────────────────────────────────────

export const offerTextSx: SxProps<Theme> = { ...kanjiCardBodySx, mb: 0 };

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
