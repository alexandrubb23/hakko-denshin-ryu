import type { StudentCategory } from "@hakko/core";
import { SxProps, Theme } from "@mui/material";

import {
  descriptionSx,
  eyebrowSx,
} from "@components/ui/PublicPageHeader/PublicPageHeader.style";
import { CATEGORY_COLORS } from "@style/categories.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  BORDER_HOVER,
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_30,
  SURFACE_BG,
  SURFACE_BG_02,
  TEXT_MUTED,
  TEXT_SUBTLE,
} from "@style/tokens";

export const pageSx: SxProps<Theme> = {
  position: "relative",
  overflow: "hidden",
  pb: 8,
};

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

export const groupCardSx = (
  group: StudentCategory,
  { isSelected, isDimmed }: { isSelected: boolean; isDimmed: boolean }
): SxProps<Theme> => {
  const { color, bg } = CATEGORY_COLORS[group];

  return {
    ...glassSx,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 2,
    px: { xs: 2.5, md: 3 },
    py: 2.5,
    textAlign: "left",
    borderLeft: `3px solid ${color}`,
    opacity: isDimmed ? 0.5 : 1,
    transition: "border-color 0.2s, background-color 0.2s, opacity 0.2s",
    ...(isSelected && { borderColor: color, backgroundColor: bg }),
    "&:hover": { borderColor: isSelected ? color : BORDER_HOVER, opacity: 1 },
    "&.Mui-focusVisible": { outline: `2px solid ${PURPLE}`, outlineOffset: 2 },
  };
};

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
  fontFamily: "Jarene, serif",
  fontSize: "1.35rem",
  lineHeight: 1.2,
  color: "#fff",
  padding: 0,
};

export const groupSummarySx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.85rem",
  color: TEXT_MUTED,
  padding: 0,
};

export const groupHintSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.8rem",
  color: TEXT_SUBTLE,
  mt: 1.5,
  mb: { xs: 3, md: 4 },
  padding: 0,
};

// ─── Day cards ────────────────────────────────────────────────────────────────

export const dayCardSx: SxProps<Theme> = {
  ...glassSx,
  position: "relative",
  overflow: "hidden",
  height: "100%",
  p: { xs: 2.5, md: 3 },
  transition: "border-color 0.2s, transform 0.2s",
  "&:hover": {
    borderColor: BORDER_HOVER,
    transform: "translateY(-2px)",
  },
};

export const dayKanjiSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: "6.5rem",
  lineHeight: 1,
  color: PURPLE,
  opacity: 0.06,
  position: "absolute",
  top: 8,
  right: 12,
  userSelect: "none",
  pointerEvents: "none",
  padding: 0,
};

export const dayNameSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "1.75rem", md: "2rem" },
  fontWeight: 400,
  lineHeight: 1.1,
  color: "#fff",
  padding: 0,
};

export const dayMetaSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
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

export const sessionListSx: SxProps<Theme> = {
  listStyle: "none",
  m: 0,
  p: 0,
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
};

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
  fontFamily: "Inter, sans-serif",
  fontSize: { xs: "1.2rem", md: "1.3rem" },
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.02em",
  color: "#fff",
  lineHeight: 1.2,
  padding: 0,
};

export const sessionDurationSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
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
  mt: { xs: 5, md: 7 },
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
  fontFamily: "Jarene, serif",
  fontSize: { xs: "1.6rem", md: "1.9rem" },
  lineHeight: 1.15,
  color: "#fff",
  mb: 0.75,
  padding: 0,
};

export const ctaButtonSx: SxProps<Theme> = {
  flexShrink: 0,
  borderColor: PURPLE_ALPHA_30,
  color: PURPLE,
  px: 3,
  "&:hover": {
    borderColor: PURPLE,
    backgroundColor: PURPLE_ALPHA_08,
  },
};

// ─── Featured quote ───────────────────────────────────────────────────────────

export const quoteSx: SxProps<Theme> = {
  position: "relative",
  m: 0,
  mt: { xs: 7, md: 10 },
  px: { xs: 1, md: 8 },
  textAlign: "center",
};

export const quoteMarkSx: SxProps<Theme> = {
  fontFamily: "Georgia, serif",
  fontSize: { xs: "6rem", md: "8rem" },
  lineHeight: 1,
  height: { xs: "3rem", md: "4rem" },
  overflow: "hidden",
  color: PURPLE,
  opacity: 0.35,
  userSelect: "none",
  padding: 0,
  mb: 1,
};

export const quoteTextSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: { xs: "1.5rem", md: "2.25rem" },
  fontWeight: 300,
  fontStyle: "italic",
  lineHeight: 1.35,
  textWrap: "balance",
  color: "#fff",
  maxWidth: 820,
  mx: "auto",
  my: 0,
  padding: 0,
};

export const quoteAuthorSx: SxProps<Theme> = {
  ...eyebrowSx,
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  fontStyle: "normal",
  mt: 3,
  mb: 0,
  "&::before, &::after": {
    content: '""',
    width: 32,
    height: "1px",
    backgroundColor: PURPLE_ALPHA_30,
  },
} as SxProps<Theme>;

export const quoteMoralSx: SxProps<Theme> = {
  ...descriptionSx,
  maxWidth: 560,
  mx: "auto",
  mt: 2.5,
} as SxProps<Theme>;
