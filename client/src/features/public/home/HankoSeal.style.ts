import type { SxProps, Theme } from "@mui/material";

import { PURPLE, PURPLE_ALPHA_08, PURPLE_ALPHA_30 } from "@style/tokens";

import { KANJI_FONT } from "./cover.style";

// Hanko seal look; each layout places and sizes it
export const sealSx: SxProps<Theme> = {
  position: "absolute",
  zIndex: 1,
  px: 1.25,
  py: 0.75,
  fontFamily: KANJI_FONT,
  fontSize: "1.35rem",
  fontWeight: 700,
  lineHeight: 1.25,
  letterSpacing: "0.08em",
  color: PURPLE,
  border: `2px solid ${PURPLE}`,
  borderRadius: "6px",
  backgroundColor: PURPLE_ALPHA_08,
  boxShadow: `0 0 18px ${PURPLE_ALPHA_30}`,
  writingMode: "vertical-rl",
};
