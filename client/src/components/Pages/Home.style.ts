import type { SxProps, Theme } from "@mui/material";

import {
  BORDER_COLOR,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_08,
  TEXT_MUTED,
} from "@style/tokens";

export const heroWrapperSx: SxProps<Theme> = {
  height: "100dvh",
  position: "relative",
  overflow: "hidden",
  backgroundColor: DARK_BG,
};

export const tilesBgSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  opacity: 0.5,
  zIndex: 0,
};

export const overlayGradientSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  background: [
    `radial-gradient(ellipse 65% 75% at 50% 50%, transparent 0%, ${DARK_BG} 80%)`,
    `linear-gradient(180deg, ${DARK_BG} 0%, transparent 18%, transparent 82%, ${DARK_BG} 100%)`,
  ].join(", "),
  zIndex: 1,
};

export const topAccentSx: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 2,
  background: `linear-gradient(90deg, transparent 0%, ${PURPLE} 50%, transparent 100%)`,
  zIndex: 3,
};

export const bottomAccentSx: SxProps<Theme> = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 1,
  zIndex: 3,
};

export const glowBlobSx: SxProps<Theme> = {
  position: "absolute",
  width: 700,
  height: 340,
  borderRadius: "50%",
  background: `radial-gradient(ellipse, ${PURPLE_ALPHA_08} 0%, transparent 70%)`,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  zIndex: 0,
};

export const badgeSx: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  mb: 3.5,
  px: 2.5,
  py: 1,
  borderRadius: 10,
  border: `1px solid ${BORDER_COLOR}`,
  backdropFilter: "blur(10px)",
  backgroundColor: PURPLE_ALPHA_08,
};

export const pulseDotSx: SxProps<Theme> = {
  width: 7,
  height: 7,
  borderRadius: "50%",
  backgroundColor: PURPLE,
  boxShadow: `0 0 10px ${PURPLE}`,
  flexShrink: 0,
  animation: "pulseDot 2.2s ease-in-out infinite",
  "@keyframes pulseDot": {
    "0%, 100%": { opacity: 1, transform: "scale(1)" },
    "50%": { opacity: 0.35, transform: "scale(0.8)" },
  },
};

export const containerSx: SxProps<Theme> = {
  position: "relative",
  zIndex: 2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  py: 4,
  gap: 0.5,
};

export const badgeLabelSx: SxProps<Theme> = {
  color: PURPLE,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 700,
};

export const headingAccentSx: SxProps<Theme> = {
  color: PURPLE,
  textShadow: "0 0 25px rgba(171,150,255,0.65)",
};

export const headingSx: SxProps<Theme> = {
  mb: 1.5,
  textShadow: "0 0 50px rgba(171,150,255,0.3)",
  lineHeight: 1.2,
};

export const subtitleSx: SxProps<Theme> = {
  color: TEXT_MUTED,
  fontStyle: "italic",
};

export const dividerSx: SxProps<Theme> = {
  borderColor: BORDER_COLOR,
};
