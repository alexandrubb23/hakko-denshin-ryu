import { Box, styled } from "@mui/material";

export const MediaRow = styled(Box)({
  display: "flex",
  gap: 15,
});

export const IconWrapper = styled(Box)({
  borderRadius: "50%",
  backgroundColor: "#312b49",
  padding: 16, // theme.spacing(2)
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,
});
