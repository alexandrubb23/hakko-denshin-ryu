import { Avatar, Box, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BORDER_COLOR, PURPLE, PURPLE_ALPHA_25, SURFACE_BG } from "@style/tokens";

export const StyledListItem = styled(ListItem)({
  borderColor: BORDER_COLOR,
  transition: "background-color 0.15s",
  overflowX: "auto",
  "&:last-child": { borderBottom: 0 },
  "&:hover": { backgroundColor: SURFACE_BG },
});

export const ItemRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  minWidth: "max-content",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  gap: theme.spacing(2),
}));

export const StyledListItemAvatar = styled(ListItemAvatar)({
  minWidth: 44,
});

export const StudentAvatar = styled(Avatar)({
  width: 36,
  height: 36,
  backgroundColor: PURPLE_ALPHA_25,
  fontSize: 14,
  fontWeight: 700,
  color: PURPLE,
});

export const StyledListItemText = styled(ListItemText)({
  flex: 1,
  minWidth: 120,
});

export const ActionBox = styled(Box)({
  flexShrink: 0,
});
