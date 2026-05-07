import { AppBar, IconButton, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BACKDROP_BLUR, BORDER_COLOR, SURFACE_BG } from "@style/tokens";

export const StyledAppBar = styled(AppBar)({
  backgroundColor: SURFACE_BG,
  backdropFilter: BACKDROP_BLUR,
  borderBottom: `1px solid ${BORDER_COLOR}`,
});

export const StyledToolbar = styled(Toolbar)({
  gap: 8,
});

export const MenuButton = styled(IconButton)({
  color: "#fff",
});
