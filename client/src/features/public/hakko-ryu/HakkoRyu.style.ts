import { SxProps, Theme } from "@mui/material";

import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_08,
  SURFACE_BG,
  TEXT_MUTED,
} from "@style/tokens";

// ─── Hero ────────────────────────────────────────────────────────────────────

export const heroSx: SxProps<Theme> = {
  position: "relative",
  height: { xs: "70vh", md: "85vh" },
  overflow: "hidden",
  mx: -2,
  mt: -2,
  mb: { xs: 6, md: 10 },
};

export const heroBgSx = (src: string): SxProps<Theme> => ({
  position: "absolute",
  inset: 0,
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
  backgroundPosition: "center 20%",
  backgroundRepeat: "no-repeat",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(10,6,25,0.35) 0%, rgba(10,6,25,0.65) 55%, rgba(10,6,25,1) 100%)",
  },
});

export const heroKanjiSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "6rem", md: "14rem" },
  lineHeight: 1,
  color: PURPLE,
  opacity: 0.1,
  position: "absolute",
  top: { xs: "8%", md: "6%" },
  right: { xs: "4%", md: "7%" },
  userSelect: "none",
  pointerEvents: "none",
  padding: 0,
};

export const heroContentSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  pb: { xs: 4, md: 6 },
  px: { xs: 3, md: 6 },
  maxWidth: "lg",
  mx: "auto",
};

export const heroEyebrowSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: { xs: "0.75rem", md: "0.85rem" },
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: PURPLE,
  mb: 1.5,
  padding: 0,
};

export const heroTitleSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "clamp(2.5rem, 9vw, 5.5rem)" },
  fontWeight: 400,
  lineHeight: 1.0,
  color: "#fff",
  mb: 0.5,
  padding: 0,
};

export const heroSubtitleSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "clamp(1.3rem, 4vw, 2.8rem)" },
  fontWeight: 400,
  lineHeight: 1.1,
  color: "rgba(255,255,255,0.45)",
  mb: 0,
  padding: 0,
};

// ─── Sections ─────────────────────────────────────────────────────────────────

export const sectionWrapperSx: SxProps<Theme> = {
  mb: { xs: 8, md: 12 },
};

export const sectionNumberSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  color: PURPLE,
  opacity: 0.7,
  mb: 0.5,
  textTransform: "uppercase",
  padding: 0,
};

export const sectionTitleSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "clamp(1.6rem, 4vw, 2.5rem)" },
  fontWeight: 400,
  lineHeight: 1.15,
  color: "#fff",
  mb: 0.25,
  padding: 0,
};

export const sectionKanjiSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.8rem",
  letterSpacing: "0.2em",
  color: TEXT_MUTED,
  mb: 2.5,
  padding: 0,
};

export const sectionDividerSx: SxProps<Theme> = {
  borderColor: BORDER_COLOR,
  mb: 3,
};

export const bodyTextSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  color: "rgba(255,255,255,0.78)",
  lineHeight: 1.85,
  fontSize: { xs: "0.93rem", md: "1rem" },
  mb: 2,
  padding: 0,
  "& strong": {
    color: "#fff",
    fontWeight: 600,
  },
};

// ─── Philosophy (full-bleed band) ─────────────────────────────────────────────

export const philosophyBandSx: SxProps<Theme> = {
  mb: { xs: 8, md: 12 },
  mx: -2,
  px: { xs: 3, md: 6 },
  py: { xs: 6, md: 8 },
  backgroundColor: PURPLE_ALPHA_08,
  borderTop: `1px solid ${BORDER_COLOR}`,
  borderBottom: `1px solid ${BORDER_COLOR}`,
};

export const pullQuoteSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "clamp(1.4rem, 3.5vw, 2.25rem)" },
  fontWeight: 400,
  lineHeight: 1.35,
  color: PURPLE,
  mb: 3,
  maxWidth: "600px",
  padding: 0,
};

// ─── Companion cards ──────────────────────────────────────────────────────────

export const companionCardSx: SxProps<Theme> = {
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 2,
  overflow: "hidden",
  height: "100%",
};

export const companionImgSx: SxProps<Theme> = {
  width: "100%",
  aspectRatio: "16/9",
};

export const companionBodySx: SxProps<Theme> = {
  p: 3,
};
