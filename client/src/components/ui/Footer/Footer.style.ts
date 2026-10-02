import { SxProps, Theme } from "@mui/material";

import { sectionNumberSx } from "@components/ui/PageSections/PageSections.style";
import { DISPLAY_FONT, KANJI_FONT, TITLE_GLOW } from "@style/art";
import { listResetSx } from "@style/list";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_12,
  PURPLE_ALPHA_50,
  TEXT_MUTED,
  TEXT_PRIMARY,
  TEXT_SUBTLE,
  WHITE_ALPHA_10,
  WHITE_ALPHA_75,
} from "@style/tokens";
import { mergeSx } from "@utils/sx";

// ─── Frame ────────────────────────────────────────────────────────────────────

// A moon glow rising from behind the top rule
export const footerSx: SxProps<Theme> = {
  position: "relative",
  // The app shell is a full-height column; keep the footer from being squeezed
  flexShrink: 0,
  overflow: "hidden",
  mt: { xs: 6, md: 10 },
  pt: { xs: 8, md: 11 },
  pb: 4,
  backgroundColor: DARK_BG,
  background: `radial-gradient(ellipse 60% 220px at 50% 0%, ${PURPLE_ALPHA_12} 0%, transparent 100%), ${DARK_BG}`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: `linear-gradient(90deg, transparent, ${PURPLE_ALPHA_50} 50%, transparent)`,
  },
};

// 洗心館, oversized and faint behind the columns
export const footerWatermarkSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: { xs: "9rem", md: "16rem" },
  opacity: 0.025,
  top: "auto",
  bottom: { xs: "-2rem", md: "-4rem" },
  right: { xs: "-1rem", md: "2%" },
  whiteSpace: "nowrap",
};

export const footerGridSx: SxProps<Theme> = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    lg: "1.5fr 1fr 1.3fr 1.3fr",
  },
  columnGap: { xs: 4, lg: 6 },
  rowGap: { xs: 6, md: 7 },
};

// ─── Brand column ─────────────────────────────────────────────────────────────

export const brandLinkSx: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
};

export const brandLogoSx: SxProps<Theme> = { height: 52, width: "auto" };

export const brandNameSx: SxProps<Theme> = {
  fontFamily: DISPLAY_FONT,
  fontSize: "1.6rem",
  lineHeight: 1.1,
  textTransform: "uppercase",
  color: TEXT_PRIMARY,
  textShadow: TITLE_GLOW,
  p: 0,
};

export const brandKanjiSx: SxProps<Theme> = {
  fontFamily: KANJI_FONT,
  fontSize: "0.85rem",
  letterSpacing: "0.3em",
  color: TEXT_MUTED,
  mt: 0.5,
};

export const brandTaglineSx: SxProps<Theme> = {
  fontStyle: "italic",
  fontSize: "0.95rem",
  lineHeight: 1.7,
  color: WHITE_ALPHA_75,
  maxWidth: 320,
  mt: 3,
};

export const socialListSx: SxProps<Theme> = {
  gap: 1.5,
  mt: 3,
};

export const socialLinkSx: SxProps<Theme> = {
  display: "grid",
  placeItems: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: `1px solid ${BORDER_COLOR}`,
  color: PURPLE,
  transition: "border-color 0.3s ease, background-color 0.3s ease",
  "&:hover, &:focus-visible": {
    borderColor: BORDER_HOVER,
    backgroundColor: PURPLE_ALPHA_08,
  },
};

// ─── Columns ──────────────────────────────────────────────────────────────────

// The sections' "01 ———" caption, in capitals with a shorter rule
export const columnTitleSx: SxProps<Theme> = mergeSx(sectionNumberSx, {
  gap: 1.5,
  textTransform: "uppercase",
  mb: 3,
  "&::after": { width: 40 },
});

export const listSx: SxProps<Theme> = mergeSx(listResetSx, { gap: 1.5 });

// Links light up and slide a short rule in from the left
export const navLinkSx: SxProps<Theme> = {
  fontSize: "0.95rem",
  color: WHITE_ALPHA_75,
  "& a": {
    display: "inline-flex",
    alignItems: "center",
    color: "inherit",
    transition: "color 0.25s ease",
    "&::before": {
      content: '""',
      width: 0,
      height: "1px",
      backgroundColor: PURPLE,
      transition: "width 0.25s ease, margin-right 0.25s ease",
    },
    "&:hover, &:focus-visible, &[aria-current='page']": {
      color: TEXT_PRIMARY,
      "&::before": { width: 12, mr: 1 },
    },
  },
};

// ─── Training hours ───────────────────────────────────────────────────────────

export const hoursDaySx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "6.5rem 1fr",
  gap: 2,
  pb: 1.5,
  borderBottom: `1px solid ${WHITE_ALPHA_10}`,
  "&:last-of-type": { borderBottom: 0 },
};

export const hoursDayNameSx: SxProps<Theme> = {
  fontSize: "0.9rem",
  color: TEXT_PRIMARY,
};

export const hoursSessionSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  gap: 1.5,
  fontSize: "0.9rem",
  color: WHITE_ALPHA_75,
  fontVariantNumeric: "tabular-nums",
};

export const hoursGroupSx: SxProps<Theme> = {
  fontSize: "0.8rem",
  color: TEXT_MUTED,
};

export const moreLinkSx: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  mt: 3,
  fontSize: "0.85rem",
  letterSpacing: "0.05em",
  color: `${PURPLE} !important`,
  "& svg": { fontSize: "1rem", transition: "transform 0.25s ease" },
  "&:hover svg, &:focus-visible svg": { transform: "translateX(4px)" },
};

// ─── Contact ──────────────────────────────────────────────────────────────────

export const addressSx: SxProps<Theme> = { fontStyle: "normal" };

export const contactListSx: SxProps<Theme> = mergeSx(listSx, { gap: 2.5 });

export const contactItemSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1.5,
  fontSize: "0.92rem",
  lineHeight: 1.6,
  color: WHITE_ALPHA_75,
  overflowWrap: "anywhere",
  "& > svg": { fontSize: "1.1rem", color: PURPLE, mt: "0.2em", flexShrink: 0 },
  "& a": {
    color: "inherit",
    transition: "color 0.25s ease",
    "&:hover, &:focus-visible": { color: TEXT_PRIMARY },
  },
};

export const contactNoteSx: SxProps<Theme> = {
  display: "block",
  fontSize: "0.8rem",
  color: TEXT_MUTED,
};

// ─── Bottom bar ───────────────────────────────────────────────────────────────

export const bottomBarSx: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: { xs: "flex-start", md: "center" },
  justifyContent: "space-between",
  gap: 2,
  mt: { xs: 7, md: 9 },
  pt: 3,
  borderTop: `1px solid ${BORDER_COLOR}`,
};

export const bottomTextSx: SxProps<Theme> = {
  fontSize: "0.8rem",
  lineHeight: 1.7,
  color: TEXT_SUBTLE,
};

export const backToTopSx: SxProps<Theme> = {
  fontFamily: "Inter",
  color: TEXT_MUTED,
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  px: 2,
  borderRadius: 5,
  border: `1px solid ${BORDER_COLOR}`,
  "&:hover": {
    color: PURPLE,
    borderColor: BORDER_HOVER,
    backgroundColor: PURPLE_ALPHA_08,
  },
};
