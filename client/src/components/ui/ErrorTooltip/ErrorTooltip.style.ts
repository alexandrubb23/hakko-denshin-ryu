import type { SxProps, Theme } from "@mui/material";

import {
  ERROR_DARK_ALPHA_90,
  ERROR_DARK_TEXT_LIGHT,
} from "@style/status.tokens";

export const errorTooltipSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.8rem",
  lineHeight: 1.4,
  maxWidth: 260,
  px: 1.5,
  py: 1,
  color: "#fff",
  backgroundColor: ERROR_DARK_ALPHA_90,
  border: `1px solid ${ERROR_DARK_TEXT_LIGHT}`,
  boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
};

export const errorArrowSx: SxProps<Theme> = {
  color: ERROR_DARK_ALPHA_90,
  "&::before": { border: `1px solid ${ERROR_DARK_TEXT_LIGHT}` },
};
