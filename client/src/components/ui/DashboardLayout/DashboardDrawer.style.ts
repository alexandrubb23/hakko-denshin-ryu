import { SxProps, Theme } from "@mui/material";

import { BACKDROP_BLUR, BORDER_COLOR, SURFACE_BG } from "@style/tokens";

export const DRAWER_WIDTH = 220;

const DRAWER_PAPER_SX: SxProps<Theme> = {
  width: DRAWER_WIDTH,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: SURFACE_BG,
  backdropFilter: BACKDROP_BLUR,
  "& .MuiListItemIcon-root": { color: "#fff" },
  borderRight: `1px solid ${BORDER_COLOR}`,
};

export const temporaryDrawerSx: SxProps<Theme> = {
  "& .MuiDrawer-paper": DRAWER_PAPER_SX,
};

export const permanentDrawerSx: SxProps<Theme> = {
  width: DRAWER_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": DRAWER_PAPER_SX,
};
