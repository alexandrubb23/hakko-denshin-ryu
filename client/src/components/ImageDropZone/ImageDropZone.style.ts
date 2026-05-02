import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

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
  backgroundColor: isDragging ? "rgba(171,150,255,0.08)" : SURFACE_BG,
  transition: "border-color 0.2s, background-color 0.2s",
  "&:hover": {
    borderColor: PURPLE,
    backgroundColor: "rgba(171,150,255,0.06)",
  },
}));
