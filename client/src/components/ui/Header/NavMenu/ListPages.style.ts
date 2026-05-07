import { ListItem, styled } from "@mui/material";

import { PURPLE } from "@style/tokens";

export const ListItemStyle = styled(ListItem)(({ sx }) => ({
  cursor: "pointer",
  display: "block",
  fontSize: "2rem",
  textAlign: "center",
  transition: "200ms ease-in-out",
  "&:hover": {
    color: PURPLE,
    cursor: "pointer",
    transform: "scale(1.1)",
  },

  ...(sx as Object),
}));
