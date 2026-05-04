import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PURPLE } from "@style/tokens";

export const TabRoot = styled("div")({ marginTop: 24 });

export const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  paddingTop: 48,
  paddingBottom: 48,
});

export const PurpleSpinner = styled(CircularProgress)({ color: PURPLE });
