import type { SxProps, Theme } from "@mui/material/styles";

import { rectOnArt } from "@components/ui/ArcNavMenu/moonArt";
import {
  BACKDROP_BLUR,
  BOARD_FRAME,
  BORDER_COLOR,
  DARK_BG_ALPHA_45,
  SURFACE_BG,
} from "@style/tokens";
import { mergeSx } from "@utils/sx";

import { darkFieldSx } from "./auth.style";
import { DOOR_PANEL } from "./lockedDoorArt";

// A card below the menu, or a panel on the painted door. On the door (lg+)
// everything is sized in cqh — 1% of the art's height — so the form scales
// with the painted panel

export const doorFormSx: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
  p: 3,
  backgroundColor: SURFACE_BG,
  backdropFilter: BACKDROP_BLUR,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 2,
  [theme.breakpoints.down("lg")]: { maxWidth: 380, mx: "auto" },
  [theme.breakpoints.up("lg")]: {
    ...rectOnArt(DOOR_PANEL),
    gap: "1.1cqh",
    p: "1.2cqh 1.8cqh",
    // A translucent panel, framed like the boards of the dojo front
    backgroundColor: DARK_BG_ALPHA_45,
    backdropFilter: "blur(2px)",
    border: `1px solid ${BOARD_FRAME}`,
    borderRadius: "3px",
    // The layer over the art passes clicks through
    pointerEvents: "auto",
  },
});

export const doorFieldSx = mergeSx(darkFieldSx, (theme) => ({
  [theme.breakpoints.up("lg")]: {
    "& .MuiOutlinedInput-root": { fontSize: "1.45cqh" },
    "& .MuiOutlinedInput-input": { py: "1cqh", px: "1.3cqh" },
    "& .MuiSvgIcon-root": { fontSize: "2.1cqh" },
  },
}));

export const doorButtonSx: SxProps<Theme> = (theme) => ({
  mt: 0.5,
  [theme.breakpoints.up("lg")]: {
    mt: "0.3cqh",
    py: "0.9cqh",
    fontSize: "1.4cqh",
  },
});
