import { SxProps, Theme } from "@mui/material";

import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

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
