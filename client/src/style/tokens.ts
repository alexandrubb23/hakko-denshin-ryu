import { SxProps, Theme } from "@mui/material";

// ─── Core accent ────────────────────────────────────────────────────────────
export const PURPLE = "#AB96FF";
export const PURPLE_HOVER = "#c4b4ff";

// ─── Dark backgrounds ────────────────────────────────────────────────────────
export const DARK_BG = "#0a0619";
export const DARK_BG_OVERLAY = "rgba(10,6,25,0.65)";
export const DARK_BG_GRADIENT =
  "linear-gradient(180deg, rgba(10,6,25,0) 0%, rgba(10,6,25,0.8) 100%)";

// ─── Borders & surfaces ──────────────────────────────────────────────────────
export const BORDER_COLOR = "rgba(171,150,255,0.2)";
export const BORDER_HOVER = "rgba(171,150,255,0.55)";
export const SURFACE_BG = "rgba(255,255,255,0.04)";
export const SURFACE_BG_02 = "rgba(255,255,255,0.02)";
export const BACKDROP_BLUR = "blur(20px)";

// ─── Purple alpha scale ──────────────────────────────────────────────────────
export const PURPLE_ALPHA_04 = "rgba(171,150,255,0.04)";
export const PURPLE_ALPHA_05 = "rgba(171,150,255,0.05)";
export const PURPLE_ALPHA_06 = "rgba(171,150,255,0.06)";
export const PURPLE_ALPHA_08 = "rgba(171,150,255,0.08)";
export const PURPLE_ALPHA_10 = "rgba(171,150,255,0.1)";
export const PURPLE_ALPHA_12 = "rgba(171,150,255,0.12)";
export const PURPLE_ALPHA_15 = "rgba(171,150,255,0.15)";
export const PURPLE_ALPHA_18 = "rgba(171,150,255,0.18)";
export const PURPLE_ALPHA_25 = "rgba(171,150,255,0.25)";
export const PURPLE_ALPHA_30 = "rgba(171,150,255,0.3)";
export const PURPLE_ALPHA_50 = "rgba(171,150,255,0.5)";

// ─── Text ────────────────────────────────────────────────────────────────────
export const TEXT_PRIMARY = "#fff";
export const TEXT_MUTED = "rgba(255,255,255,0.5)";
export const TEXT_SUBTLE = "rgba(255,255,255,0.35)";

// ─── White alpha scale ───────────────────────────────────────────────────────
export const WHITE_ALPHA_05 = "rgba(255,255,255,0.05)";
export const WHITE_ALPHA_06 = "rgba(255,255,255,0.06)";
export const WHITE_ALPHA_10 = "rgba(255,255,255,0.1)";
export const WHITE_ALPHA_25 = "rgba(255,255,255,0.25)";
export const WHITE_ALPHA_35 = "rgba(255,255,255,0.35)";
export const WHITE_ALPHA_45 = "rgba(255,255,255,0.45)";
export const WHITE_ALPHA_60 = "rgba(255,255,255,0.6)";
export const WHITE_ALPHA_65 = "rgba(255,255,255,0.65)";
export const WHITE_ALPHA_85 = "rgba(255,255,255,0.85)";
export const WHITE_ALPHA_90 = "rgba(255,255,255,0.9)";

// ─── Skeleton ────────────────────────────────────────────────────────────────
export const SKELETON_SX: SxProps<Theme> = {
  bgcolor: PURPLE_ALPHA_12,
} as const;
