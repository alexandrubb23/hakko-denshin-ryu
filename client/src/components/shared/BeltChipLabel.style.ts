import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const LabelRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 6,
});

export const BeltImage = styled("img")({
  height: 12,
  width: "auto",
  maxWidth: 32,
  objectFit: "cover",
  borderRadius: "2px",
  display: "block",
  flexShrink: 0,
});
