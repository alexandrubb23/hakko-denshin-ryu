import { styled } from "@mui/material/styles";

import { PURPLE_ALPHA_30 } from "@style/tokens";

export const FilterContainer = styled("div")({
  position: "relative",
  marginBottom: 20,
});

export const ChipRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    gap: 6,
  },
}));

export const SubRow = styled("div", {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  ...(isMobile && {
    borderLeft: `2px solid ${PURPLE_ALPHA_30}`,
    paddingLeft: 12,
  }),
  [theme.breakpoints.down("sm")]: {
    gap: 6,
  },
}));

export const ConnectorSvg = styled("svg")({
  position: "absolute",
  top: 0,
  left: 0,
  pointerEvents: "none",
  overflow: "visible",
});
