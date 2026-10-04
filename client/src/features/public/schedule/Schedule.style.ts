import type { StudentCategory } from "@hakko/core";
import { SxProps, Theme } from "@mui/material";

import { DISPLAY_FONT, KANJI_FONT, TITLE_GLOW } from "@style/art";
import { CATEGORY_COLORS } from "@style/categories.tokens";
import {
  BACKDROP_BLUR,
  BOARD_BG,
  BOARD_FRAME,
  BORDER_COLOR,
  BORDER_HOVER,
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_50,
  SURFACE_BG,
  SURFACE_BG_02,
  TEXT_MUTED,
  TEXT_PRIMARY,
  TEXT_SUBTLE,
  WHITE_ALPHA_65,
} from "@style/colorScheme";
import { listResetSx } from "@style/list";
import { mergeSx } from "@utils/sx";

import { BOARDS_MEDIA } from "./facadeArt";

// ─── Cover photo ──────────────────────────────────────────────────────────────

// In the cover's dark corner, clear of the painted temple
export const coverPhotoSx: SxProps<Theme> = { mr: "160px" };

// ─── Group summary ────────────────────────────────────────────────────────────

const glassSx = {
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 2,
  backdropFilter: BACKDROP_BLUR,
} as const;

/** Foreground/background tint for a group. */
const groupTintSx = (group: StudentCategory) => ({
  color: CATEGORY_COLORS[group].color,
  backgroundColor: CATEGORY_COLORS[group].bg,
});

export const groupCardSx = (group: StudentCategory): SxProps<Theme> => ({
  ...glassSx,
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: { xs: 2.5, md: 3 },
  py: 2.5,
  borderLeft: `3px solid ${CATEGORY_COLORS[group].color}`,
});

export const groupDotSx = (group: StudentCategory): SxProps<Theme> => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  ...groupTintSx(group),
});

export const groupNameSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: "1.35rem",
  lineHeight: 1.2,
  color: TEXT_PRIMARY,
  padding: 0,
};

export const groupSummarySx: SxProps<Theme> = {
  fontSize: "0.85rem",
  color: TEXT_MUTED,
  padding: 0,
};

// ─── Day cards (where the cover's boards don't show the timetable) ─────────────

export const timetableSx: SxProps<Theme> = {
  [BOARDS_MEDIA]: { display: "none" },
};

// Like the boards on the painted dojo front: a panel in a thin frame

export const dayCardSx: SxProps<Theme> = {
  position: "relative",
  overflow: "hidden",
  height: "100%",
  p: { xs: 2.5, md: 3 },
  backgroundColor: BOARD_BG,
  border: `2px solid ${BOARD_FRAME}`,
  borderRadius: "3px",
  boxShadow: `inset 0 0 0 6px ${BOARD_BG}, inset 0 0 0 7px ${BORDER_COLOR}`,
  transition: "border-color 0.2s",
  "&:hover": { borderColor: BORDER_HOVER },
};

export const dayKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: "3.5rem",
  lineHeight: 1,
  color: PURPLE,
  opacity: 0.35,
  textShadow: TITLE_GLOW,
  position: "absolute",
  top: 20,
  right: 22,
  userSelect: "none",
  pointerEvents: "none",
  padding: 0,
};

export const dayNameSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: { xs: "1.75rem", md: "2rem" },
  fontWeight: 400,
  lineHeight: 1.1,
  color: TEXT_PRIMARY,
  padding: 0,
};

export const dayMetaSx: SxProps<Theme> = {
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: PURPLE,
  opacity: 0.7,
  mt: 0.75,
  padding: 0,
};

export const dayDividerSx: SxProps<Theme> = {
  borderColor: BORDER_COLOR,
  my: 2.5,
};

export const sessionListSx: SxProps<Theme> = mergeSx(listResetSx, { gap: 1.5 });

export const sessionSx = (group: StudentCategory): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  px: 2,
  py: 1.75,
  borderRadius: 1.5,
  backgroundColor: SURFACE_BG_02,
  border: `1px solid ${BORDER_COLOR}`,
  borderLeft: `3px solid ${CATEGORY_COLORS[group].color}`,
});

export const sessionTimeSx: SxProps<Theme> = {
  fontSize: { xs: "1.2rem", md: "1.3rem" },
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.02em",
  color: TEXT_PRIMARY,
  lineHeight: 1.2,
  padding: 0,
};

export const sessionDurationSx: SxProps<Theme> = {
  fontSize: "0.78rem",
  color: TEXT_SUBTLE,
  mt: 0.25,
  padding: 0,
};

export const groupChipSx = (group: StudentCategory): SxProps<Theme> => ({
  flexShrink: 0,
  fontWeight: 600,
  ...groupTintSx(group),
  border: `1px solid ${CATEGORY_COLORS[group].color}`,
});

// ─── Call to action ───────────────────────────────────────────────────────────

export const ctaSx: SxProps<Theme> = {
  ...glassSx,
  px: { xs: 3, md: 5 },
  py: { xs: 3.5, md: 4 },
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: { xs: "flex-start", md: "center" },
  justifyContent: "space-between",
  gap: 3,
  background: `linear-gradient(120deg, ${PURPLE_ALPHA_08} 0%, ${SURFACE_BG} 60%)`,
};

export const ctaTitleSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: { xs: "1.6rem", md: "1.9rem" },
  lineHeight: 1.15,
  color: TEXT_PRIMARY,
  mb: 0.75,
  padding: 0,
};

export const ctaDescriptionSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  color: WHITE_ALPHA_65,
  lineHeight: 1.75,
  fontSize: { xs: "0.93rem", md: "1rem" },
  maxWidth: "480px",
  padding: 0,
};

export const ctaButtonSx: SxProps<Theme> = { flexShrink: 0 };

// ─── Quote (valley art band) ─────────────────────────────────────────────────

export const quoteSx: SxProps<Theme> = { m: 0 };

// "——— MARCUS AURELIUS"
export const quoteAuthorSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  fontStyle: "normal",
  fontSize: "0.8rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: PURPLE,
  mb: 2,
  "&::before": {
    content: '""',
    width: 32,
    height: "1px",
    backgroundColor: PURPLE_ALPHA_50,
  },
};
