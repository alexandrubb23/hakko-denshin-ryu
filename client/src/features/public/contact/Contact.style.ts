import { SxProps, Theme } from "@mui/material";

import { BORDER_COLOR, PURPLE, SURFACE_BG, TEXT_MUTED } from "@style/tokens";

// ─── Page header (no hero image) ──────────────────────────────────────────────

export const pageHeaderSx: SxProps<Theme> = {
  mb: { xs: 6, md: 8 },
  pt: { xs: 3, md: 4 },
};

export const eyebrowSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: { xs: "0.75rem", md: "0.85rem" },
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: PURPLE,
  mb: 1.5,
  padding: 0,
};

export const pageTitleSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "clamp(2rem, 8vw, 4rem)" },
  fontWeight: 400,
  lineHeight: 1.05,
  color: "#fff",
  mb: 1,
  padding: 0,
};

export const pageKanjiSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "0.8rem", md: "0.85rem" },
  letterSpacing: "0.2em",
  color: TEXT_MUTED,
  mb: 2,
  padding: 0,
};

export const descriptionSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  color: "rgba(255,255,255,0.65)",
  lineHeight: 1.75,
  fontSize: { xs: "0.93rem", md: "1rem" },
  maxWidth: "480px",
  padding: 0,
};

export const dividerSx: SxProps<Theme> = {
  borderColor: BORDER_COLOR,
  mb: 4,
  mt: 2,
};

// ─── Contact items container ──────────────────────────────────────────────────

export const contactBlockSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 2,
  px: { xs: 2.5, md: 3 },
  py: { xs: 2.5, md: 3 },
  backdropFilter: "blur(20px)",
};

export const contactBlockTitleSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: PURPLE,
  opacity: 0.7,
  mb: 1,
  padding: 0,
};

// ─── Portrait image ────────────────────────────────────────────────────────────

export const imageSx: SxProps<Theme> = {
  width: "100%",
  aspectRatio: "auto 360 / 540",
  borderRadius: 2,
  overflow: "hidden",
  border: `1px solid ${BORDER_COLOR}`,
};

// ─── Background kanji watermark ───────────────────────────────────────────────

export const bgKanjiSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "18rem", md: "28rem" },
  lineHeight: 1,
  color: PURPLE,
  opacity: 0.03,
  position: "absolute",
  top: { xs: "2%", md: "-5%" },
  right: { xs: "-5%", md: "-2%" },
  userSelect: "none",
  pointerEvents: "none",
  padding: 0,
};
