import {
  Alert,
  Box,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

export const PageWrapper = styled(Box)({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: 24,
  "@media (min-width:600px)": { padding: "24px" },
});

export const ErrorAlert = styled(Alert)({
  backgroundColor: "rgba(211,47,47,0.12)",
  color: "#f48fb1",
  border: "1px solid rgba(211,47,47,0.3)",
});

export const ContentCard = styled(Paper)({
  width: "100%",
  backgroundColor: SURFACE_BG,
  backdropFilter: "blur(20px)",
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
  padding: "16px",
  "@media (min-width:600px)": { padding: "24px" },
});

export const ContentTitle = styled(Typography)({
  color: PURPLE,
  letterSpacing: 1,
  fontWeight: 700,
  marginBottom: 8,
});

export const ContentDivider = styled(Divider)({
  borderColor: BORDER_COLOR,
  marginBottom: 24,
});

export const GroupsGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
  gap: 16,
});

export const GroupCard = styled(Box)({
  backgroundColor: "rgba(255,255,255,0.02)",
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 6,
  padding: "12px",
  "@media (min-width:600px)": { padding: "16px" },
});

export const GroupTitle = styled(Typography)({
  color: "rgba(255,255,255,0.85)",
  fontWeight: 700,
  letterSpacing: 0.5,
  marginBottom: 12,
});

export const TechniqueList = styled(Box)({
  margin: 0,
  paddingLeft: "1.4em",
  display: "flex",
  flexDirection: "column",
  gap: 4,
}) as typeof Box;

export const TechniqueItem = styled(Box)({
  fontSize: "0.82rem",
  color: "rgba(255,255,255,0.65)",
  lineHeight: 1.6,
  "&::marker": { color: PURPLE, fontSize: "0.75rem" },
}) as typeof Box;

export const PageTabs = styled(Tabs)({
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

export const PageTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== "compact",
})<{ compact?: boolean }>(({ compact }) => ({
  color: "rgba(255,255,255,0.5)",
  fontWeight: 600,
  letterSpacing: 0.5,
  fontSize: compact ? "0.7rem" : "0.75rem",
  ...(compact ? { minWidth: 72, padding: "8px 12px" } : {}),
  "@media (min-width:600px)": {
    fontSize: compact ? "0.8rem" : "0.85rem",
    minWidth: compact ? 90 : 100,
  },
  "&.Mui-selected": { color: PURPLE },
}));
