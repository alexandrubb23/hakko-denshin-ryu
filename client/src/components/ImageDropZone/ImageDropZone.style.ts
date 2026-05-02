import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_06,
  PURPLE_ALPHA_08,
  SURFACE_BG,
} from "@style/tokens";

export const DropZoneRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragging",
})<{ isDragging: boolean }>(({ isDragging }) => ({
  border: `2px dashed ${isDragging ? PURPLE : BORDER_COLOR}`,
  borderRadius: 8,
  padding: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  backgroundColor: isDragging ? PURPLE_ALPHA_08 : SURFACE_BG,
  transition: "border-color 0.2s, background-color 0.2s",
  "&:hover": {
    borderColor: PURPLE,
    backgroundColor: PURPLE_ALPHA_06,
  },
}));
