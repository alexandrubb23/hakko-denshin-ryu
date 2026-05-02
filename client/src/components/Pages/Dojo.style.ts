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
  height: { xs: "55vh", md: "72vh" },
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
  backgroundPosition: "center 30%",
  backgroundRepeat: "no-repeat",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(10,6,25,0.4) 0%, rgba(10,6,25,0.65) 55%, rgba(10,6,25,1) 100%)",
  },
});

export const heroKanjiSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "5rem", md: "13rem" },
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
  fontSize: { xs: "clamp(2.2rem, 8vw, 5rem)" },
  fontWeight: 400,
  lineHeight: 1.0,
  color: "#fff",
  mb: 0.5,
  padding: 0,
};

export const heroSubtitleSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "clamp(1.1rem, 3.5vw, 2.4rem)" },
  fontWeight: 400,
  lineHeight: 1.1,
  color: "rgba(255,255,255,0.42)",
  padding: 0,
};

// ─── Content ──────────────────────────────────────────────────────────────────

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

export const dividerSx: SxProps<Theme> = {
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
  "& strong": { color: "#fff", fontWeight: 600 },
};

// ─── Training list ────────────────────────────────────────────────────────────

export const trainingListSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 0,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 2,
  overflow: "hidden",
  backgroundColor: SURFACE_BG,
};

export const trainingItemSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  gap: 2,
  px: 2.5,
  py: 2,
  borderBottom: `1px solid ${BORDER_COLOR}`,
  "&:last-child": { borderBottom: "none" },
  transition: "background-color 0.15s",
  "&:hover": { backgroundColor: PURPLE_ALPHA_08 },
};

export const trainingDotSx: SxProps<Theme> = {
  width: 6,
  height: 6,
  borderRadius: "50%",
  bgcolor: PURPLE,
  mt: "9px",
  flexShrink: 0,
  opacity: 0.7,
};

export const trainingTextSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: { xs: "0.88rem", md: "0.93rem" },
  color: "rgba(255,255,255,0.75)",
  lineHeight: 1.6,
  padding: 0,
  "& strong": { color: "#fff", fontWeight: 600 },
};

// ─── Closing band ─────────────────────────────────────────────────────────────

export const closingBandSx: SxProps<Theme> = {
  mt: { xs: 6, md: 8 },
  mx: -2,
  px: { xs: 3, md: 6 },
  py: { xs: 5, md: 6 },
  backgroundColor: PURPLE_ALPHA_08,
  borderTop: `1px solid ${BORDER_COLOR}`,
  borderBottom: `1px solid ${BORDER_COLOR}`,
};

export const closingTextSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  color: "rgba(255,255,255,0.78)",
  lineHeight: 1.9,
  fontSize: { xs: "0.93rem", md: "1.05rem" },
  maxWidth: "760px",
  mx: "auto",
  textAlign: "center",
  padding: 0,
  "& strong": { color: PURPLE, fontWeight: 500 },
};

export const closingBgCounterSx: SxProps<Theme> = {
  fontFamily: "Jarene, serif",
  fontSize: { xs: "5rem", md: "10rem" },
  lineHeight: 1,
  color: PURPLE,
  opacity: 0.06,
  textAlign: "center",
  mb: -3,
  mt: 1,
  userSelect: "none",
  padding: 0,
};
