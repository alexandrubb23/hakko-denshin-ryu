import { Box, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BORDER_COLOR, PURPLE } from "@style/tokens";

export const KyuTabs = styled(Tabs)({
  width: "100%",
  minWidth: 0,
  borderBottom: `1px solid ${BORDER_COLOR}`,
  "& .MuiTabs-indicator": { backgroundColor: PURPLE },
  "& .MuiTabs-scrollButtons": { color: "rgba(255,255,255,0.5)" },
  "& .MuiTabs-scroller": {
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
  },
  "& .MuiTabs-flexContainer": { gap: 4 },
});

export const KyuTab = styled(Tab)({
  color: "rgba(255,255,255,0.5)",
  fontWeight: 600,
  letterSpacing: 0.5,
  fontSize: "0.7rem",
  minWidth: 72,
  padding: "8px 12px",
  "@media (min-width:600px)": { fontSize: "0.8rem", minWidth: 90 },
  "&.Mui-selected": { color: PURPLE },
});

export const BeltImage = styled("img")({
  width: 52,
  height: "auto",
  objectFit: "contain",
  borderRadius: 2,
  "@media (min-width:600px)": { width: 64 },
});

export const TabLabelWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
});

export const KihonLegend = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap",
});

export const LegendItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: "0.75rem",
});

export const LegendDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isKihon",
})<{ isKihon: boolean }>(({ isKihon }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: isKihon ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
  flexShrink: 0,
}));
