import { SxProps, Theme } from "@mui/material";

import {
  kanjiCardTitleSx,
  photoFrameSx,
  sectionNumberSx,
} from "@components/ui/PageSections/PageSections.style";
import { ART_ZOOM_TRANSITION, KANJI_FONT } from "@style/art";
import {
  BORDER_COLOR,
  PURPLE_ALPHA_25,
  PURPLE_ALPHA_50,
  TEXT_MUTED,
  TEXT_PRIMARY,
  TEXT_SUBTLE,
  WHITE_ALPHA_65,
} from "@style/tokens";
import { mergeSx } from "@utils/sx";

// ─── One card per circle of rank ──────────────────────────────────────────────

// Merged over the kanji card; its hover turns the belt and lights its ring
export const gradeCardSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  "&:hover .grade-belt": { transform: "scale(1.04) rotate(-2deg)" },
  "&:hover .grade-belt-frame::after": { borderColor: PURPLE_ALPHA_50 },
};

const BELT_SIZE = { xs: 140, md: 168 };

// The round belt photo inside a thin ensō-like ring, over the photos' glow
export const gradeBeltFrameSx = mergeSx(photoFrameSx, {
  width: BELT_SIZE,
  height: BELT_SIZE,
  mb: 4,
  "&::before": { inset: "-30%" },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: -8,
    borderRadius: "50%",
    border: `1px solid ${PURPLE_ALPHA_25}`,
    transition: "border-color 0.4s ease",
    pointerEvents: "none",
  },
});

export const gradeBeltSx: SxProps<Theme> = {
  position: "relative",
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  transition: ART_ZOOM_TRANSITION,
};

// "壱 ——" above the title, a smaller kanji take on the section number
export const gradeIndexSx = mergeSx(sectionNumberSx, {
  gap: 1.5,
  fontFamily: KANJI_FONT,
  fontSize: "0.85rem",
  letterSpacing: "normal",
  mb: 1,
  "&::after": { width: 32 },
});

export const gradeTitleSx = mergeSx(kanjiCardTitleSx, { mb: 0.5 });

export const gradeSubtitleSx: SxProps<Theme> = {
  fontSize: "0.8rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: TEXT_MUTED,
  mb: 3,
  padding: 0,
};

// ─── Rank rows ────────────────────────────────────────────────────────────────

// Romaji and grade on the left, the kanji on the right, between hairlines
export const gradeRankSx: SxProps<Theme> = {
  display: "flex",
  // A long kanji title drops below the name rather than squeezing it
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  columnGap: 2,
  rowGap: 0.5,
  py: 1.5,
  borderTop: `1px solid ${BORDER_COLOR}`,
};

export const gradeRankNameSx: SxProps<Theme> = {
  color: TEXT_PRIMARY,
  fontSize: "0.98rem",
  lineHeight: 1.3,
  padding: 0,
};

export const gradeRankNoteSx: SxProps<Theme> = {
  color: TEXT_SUBTLE,
  fontSize: "0.72rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  mt: 0.25,
  padding: 0,
};

export const gradeRankKanjiSx: SxProps<Theme> = {
  // Stays right-aligned when it wraps onto its own line
  ml: "auto",
  fontFamily: KANJI_FONT,
  fontSize: "1.15rem",
  letterSpacing: "0.2em",
  color: WHITE_ALPHA_65,
  whiteSpace: "nowrap",
  padding: 0,
};
