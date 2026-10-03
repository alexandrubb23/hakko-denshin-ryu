import { SxProps, Theme } from "@mui/material";

import {
  kanjiCardSx,
  kanjiCardTitleSx,
} from "@components/ui/PageSections/PageSections.style";
import {
  ART_ZOOM_TRANSITION,
  DISPLAY_FONT,
  KANJI_FONT,
  fadeMask,
} from "@style/art";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_25,
  PURPLE_ALPHA_50,
  TEXT_MUTED,
  TEXT_PRIMARY,
  WHITE_ALPHA_65,
  WHITE_ALPHA_85,
} from "@style/tokens";
import { mergeSx } from "@utils/sx";

import { gradeRankNoteSx, gradeSubtitleSx } from "./GradingSystem.style";

// ─── Grade tabs ───────────────────────────────────────────────────────────────

// Hairline tabs, the active one underlined in purple
export const programTabsSx: SxProps<Theme> = {
  mt: 4,
  mb: { xs: 4, md: 5 },
  borderBottom: `1px solid ${BORDER_COLOR}`,
  "& .MuiTabs-indicator": { backgroundColor: PURPLE, height: "1px" },
  "& .MuiTab-root": {
    alignItems: "flex-start",
    minWidth: { xs: 84, md: 128 },
    px: { xs: 1.5, md: 3 },
    pb: 2,
    fontSize: { xs: "0.85rem", md: "0.95rem" },
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: TEXT_MUTED,
    transition: "color 0.3s ease",
    "&:hover": { color: WHITE_ALPHA_85 },
    "&.Mui-selected": { color: TEXT_PRIMARY },
  },
};

export const programTabKanjiSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  fontFamily: KANJI_FONT,
  fontSize: { xs: "1.1rem", md: "1.4rem" },
  letterSpacing: "0.2em",
  color: PURPLE,
  mb: 0.5,
};

// A small round belt before the tab's kanji
export const programTabBeltSx: SxProps<Theme> = {
  width: { xs: 22, md: 26 },
  height: { xs: 22, md: 26 },
  borderRadius: "50%",
};

export const programErrorSx: SxProps<Theme> = { color: TEXT_MUTED, mt: 4 };

// ─── Grade header: title on the left, kanji · dan · count on the right ───────

export const gradeHeaderSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  columnGap: 3,
  rowGap: 1,
  mb: 3,
};

// The title, after its round belt when it has one
export const gradeHeadingSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: { xs: 2, md: 3 },
};

export const gradeBeltSx: SxProps<Theme> = {
  flexShrink: 0,
  width: { xs: 72, md: 96 },
  height: { xs: 72, md: 96 },
  borderRadius: "50%",
  outline: `1px solid ${PURPLE_ALPHA_25}`,
  outlineOffset: 6,
  boxShadow: `0 0 40px ${PURPLE_ALPHA_25}`,
};

export const gradeTitleSx = mergeSx(kanjiCardTitleSx, { mb: 0 });

export const gradeMetaSx = mergeSx(gradeSubtitleSx, { mb: 0 });

export const gradeMetaKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: "1rem",
  color: PURPLE,
};

// ─── Practice categories ──────────────────────────────────────────────────────

// A kanji card, opening like an accordion
export const categorySx = mergeSx(kanjiCardSx, {
  height: "auto",
  // Same breakpoints as the card's padding, or its media queries win
  p: { xs: 0, md: 0 },
  mb: 1.5,
  color: TEXT_PRIMARY,
  "&::before": { display: "none" },
  "&:first-of-type, &:last-of-type": { borderRadius: 3 },
  "&.Mui-expanded": {
    borderColor: BORDER_HOVER,
    backgroundColor: PURPLE_ALPHA_08,
  },
  "&:hover .category-thumb": { transform: "scale(1.06)" },
});

export const categorySummarySx: SxProps<Theme> = {
  px: { xs: 2, md: 3 },
  py: 1.5,
  "& .MuiAccordionSummary-content": {
    alignItems: "center",
    gap: { xs: 2, md: 3 },
    my: 0,
  },
  "& .MuiAccordionSummary-expandIconWrapper": { color: PURPLE },
};

const THUMB_SIZE = { xs: 52, md: 64 };

// The practice's painting in a small moon, ringed like the belts
export const categoryThumbSx: SxProps<Theme> = {
  flexShrink: 0,
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  borderRadius: "50%",
  objectFit: "cover",
  outline: `1px solid ${PURPLE_ALPHA_25}`,
  outlineOffset: 4,
  transition: ART_ZOOM_TRANSITION,
};

export const categoryNameSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: { xs: "1.15rem", md: "1.4rem" },
  fontWeight: 400,
  lineHeight: 1.2,
  padding: 0,
};

export const categoryKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: "0.9rem",
  letterSpacing: "0.3em",
  color: TEXT_MUTED,
  mt: 0.5,
  padding: 0,
};

export const categoryMetaSx: SxProps<Theme> = {
  ml: "auto",
  pr: 1,
  textAlign: "right",
};

export const categoryCountSx = mergeSx(gradeRankNoteSx, {
  mt: 0,
  whiteSpace: "nowrap",
});

// The range, e.g. "01 — 08"; narrow screens keep only the count
export const categoryRangeSx = mergeSx(categoryCountSx, {
  display: { xs: "none", sm: "block" },
  color: PURPLE,
  mb: 0.25,
});

export const categoryDetailsSx: SxProps<Theme> = {
  position: "relative",
  px: { xs: 2, md: 3 },
  pt: 0,
  pb: { xs: 2, md: 3 },
};

// The painting melting into the open panel's right side, beside the list
export const categoryArtSx = (src: string): SxProps<Theme> => ({
  display: { xs: "none", md: "block" },
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  width: "40%",
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.45,
  pointerEvents: "none",
  ...fadeMask(
    [
      "linear-gradient(90deg, transparent 0%, black 60%)",
      "linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)",
    ].join(", ")
  ),
});

// One technique per row, read straight down; the painting sits beside it
export const categoryListSx: SxProps<Theme> = {
  position: "relative",
  display: "block",
  maxWidth: { md: "60%" },
  borderTop: `1px solid ${BORDER_COLOR}`,
  pt: 1,
};

export const techniqueSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "2.2em 1fr auto",
  alignItems: "baseline",
  gap: 1.5,
  py: 1.25,
  borderBottom: `1px solid ${PURPLE_ALPHA_08}`,
};

export const techniqueNumberSx: SxProps<Theme> = {
  fontSize: "0.75rem",
  letterSpacing: "0.1em",
  color: PURPLE_ALPHA_50,
  fontVariantNumeric: "tabular-nums",
};

export const techniqueNameSx: SxProps<Theme> = {
  color: TEXT_PRIMARY,
  fontSize: "0.95rem",
  lineHeight: 1.35,
};

export const techniqueKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: "1rem",
  letterSpacing: "0.15em",
  color: WHITE_ALPHA_65,
  whiteSpace: "nowrap",
};

// ─── Kyu program: kihon waza and their henka ──────────────────────────────────

// Henka (variations) step back behind the kihon waza they vary
export const henkaSx: SxProps<Theme> = {
  "& .technique-name": { color: TEXT_MUTED },
  "& .technique-kanji": { opacity: 0.6 },
};

export const henkaTagSx = mergeSx(gradeRankNoteSx, {
  display: "inline",
  ml: 1.5,
  color: PURPLE_ALPHA_50,
});

export const legendSx: SxProps<Theme> = {
  display: "flex",
  gap: 3,
  mb: 3,
};

export const legendItemSx = mergeSx(gradeRankNoteSx, {
  display: "flex",
  alignItems: "center",
  gap: 1,
  mt: 0,
});

export const legendDotSx = (kihon: boolean): SxProps<Theme> => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: kihon ? PURPLE : "transparent",
  border: `1px solid ${kihon ? PURPLE : PURPLE_ALPHA_50}`,
});
