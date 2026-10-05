import type { StudentCategory } from "@hakko/core";
import { SxProps, Theme } from "@mui/material";

import { DISPLAY_FONT, KANJI_FONT, TITLE_GLOW } from "@style/art";
import { CATEGORY_COLORS } from "@style/categories.tokens";
import {
  PURPLE,
  PURPLE_ALPHA_30,
  TEXT_PRIMARY,
  WHITE_ALPHA_60,
} from "@style/colorScheme";
import { listResetSx } from "@style/list";

import { type ArtRect, rectOnArt } from "@components/ui/ArcNavMenu/moonArt";
import { mergeSx } from "@utils/sx";

import { BOARDS_MEDIA } from "./facadeArt";

// Everything is sized in cqh — 1% of the art's height — so the writing
// scales with the painted boards

export const wallSx: SxProps<Theme> = {
  display: "none",
  [BOARDS_MEDIA]: { display: "block" },
};

export const boardSx = (board: ArtRect): SxProps<Theme> => ({
  ...rectOnArt(board),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.45cqh",
  px: "0.6cqh",
  textAlign: "center",
  // The layer over the art passes clicks through; keep the times selectable
  pointerEvents: "auto",
});

// Hung from the eave, just clear of the board's painted frame
export const lanternOnBoardSx: SxProps<Theme> = {
  left: "50%",
  bottom: "calc(100% + 0.6cqh)",
};

export const boardKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: "2.3cqh",
  lineHeight: 1,
  color: PURPLE,
  textShadow: TITLE_GLOW,
};

export const boardDayNameSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: "1.35cqh",
  lineHeight: 1.1,
  textTransform: "uppercase",
  color: TEXT_PRIMARY,
  p: 0,
};

export const boardRuleSx: SxProps<Theme> = {
  width: "40%",
  height: "1px",
  my: "0.35cqh",
  backgroundColor: PURPLE_ALPHA_30,
};

export const boardSessionListSx: SxProps<Theme> = mergeSx(listResetSx, {
  gap: "0.8cqh",
  // Don't inherit the page's (large) body line height
  "& > li": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25cqh",
    lineHeight: 1,
  },
});

export const boardTimeSx: SxProps<Theme> = {
  fontSize: "1.25cqh",
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1.2,
  whiteSpace: "nowrap",
  color: TEXT_PRIMARY,
  p: 0,
};

export const boardGroupSx = (group: StudentCategory): SxProps<Theme> => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4cqh",
  fontSize: "0.95cqh",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: WHITE_ALPHA_60,
  p: 0,
  "&::before": {
    content: '""',
    width: "0.6cqh",
    height: "0.6cqh",
    borderRadius: "50%",
    backgroundColor: CATEGORY_COLORS[group].color,
  },
});
