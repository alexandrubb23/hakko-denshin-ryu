import { SxProps, Theme } from "@mui/material";

import { PURPLE } from "@style/tokens";

export const watermarkSx: SxProps<Theme> = {
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
