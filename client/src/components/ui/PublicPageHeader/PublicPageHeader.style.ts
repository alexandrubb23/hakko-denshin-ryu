import { SxProps, Theme } from "@mui/material";

import {
  BORDER_COLOR,
  PURPLE,
  TEXT_MUTED,
  WHITE_ALPHA_65,
} from "@style/tokens";

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

export const dividerSx = (hasDescription: boolean): SxProps<Theme> => ({
  borderColor: BORDER_COLOR,
  mb: hasDescription ? 4 : 0,
  mt: 2,
});

export const descriptionSx: SxProps<Theme> = {
  fontFamily: "Inter, sans-serif",
  color: WHITE_ALPHA_65,
  lineHeight: 1.75,
  fontSize: { xs: "0.93rem", md: "1rem" },
  maxWidth: "480px",
  padding: 0,
};
