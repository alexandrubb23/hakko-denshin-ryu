import {
  Box,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  PURPLE,
  SURFACE_BG,
  SURFACE_BG_02,
  TEXT_MUTED,
  WHITE_ALPHA_65,
  WHITE_ALPHA_85,
} from "@style/tokens";

export const PageWrapper = styled(Box)({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: 24,
  "@media (min-width:600px)": { padding: "24px" },
});

export const ContentCard = styled(Paper)({
  width: "100%",
  backgroundColor: SURFACE_BG,
  backdropFilter: BACKDROP_BLUR,
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
  backgroundColor: SURFACE_BG_02,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 6,
  padding: "12px",
  "@media (min-width:600px)": { padding: "16px" },
});

export const GroupTitle = styled(Typography)({
  color: WHITE_ALPHA_85,
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
  color: WHITE_ALPHA_65,
  lineHeight: 1.6,
  "&::marker": { color: PURPLE, fontSize: "0.75rem" },
}) as typeof Box;

export const PageTabs = styled(Tabs)({
  width: "100%",
  minWidth: 0,
  borderBottom: `1px solid ${BORDER_COLOR}`,
  "& .MuiTabs-indicator": { backgroundColor: PURPLE },
  "& .MuiTabs-scrollButtons": { color: TEXT_MUTED },
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
  color: TEXT_MUTED,
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
