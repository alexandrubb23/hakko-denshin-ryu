import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

export const ChartRoot = styled("div")({
  marginTop: 24,
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 12,
  padding: "20px 16px 16px",
  backdropFilter: "blur(20px)",
});

export const ChartHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
});

export const ChartTitle = styled(Typography)({
  color: PURPLE,
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: "uppercase",
  fontSize: "0.7rem",
});

export const CountBadge = styled("span")({
  fontSize: "0.7rem",
  fontWeight: 700,
  color: PURPLE,
  backgroundColor: "rgba(171,150,255,0.12)",
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 20,
  padding: "2px 10px",
  letterSpacing: 0.3,
});

export const FilterRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    gap: 6,
  },
}));
