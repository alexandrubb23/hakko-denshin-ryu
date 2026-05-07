import { Box, Typography, styled } from "@mui/material";

const TEXT_SX = {
  fontSize: "clamp(1rem, 2vw, 1.5rem)",
  textShadow: "0 0 5px rgba(0, 0, 0, 0.7)",
} as const;

export const QuoteContainer = styled(Box)(({ theme }) => ({
  minHeight: 250,
  overflow: "hidden",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const QuoteText = styled(Typography)({
  ...TEXT_SX,
  fontStyle: "italic",
});

export const AuthorText = styled(Typography)({
  ...TEXT_SX,
  textAlign: "right",
});
