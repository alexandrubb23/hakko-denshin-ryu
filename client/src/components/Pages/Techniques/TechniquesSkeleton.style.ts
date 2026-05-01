import { Box, Paper, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BORDER_COLOR, SURFACE_BG } from "@style/tokens";

export const SuiteCard = styled(Paper)({
  width: "100%",
  backgroundColor: SURFACE_BG,
  backdropFilter: "blur(20px)",
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
  padding: "16px",
  "@media (min-width:600px)": { padding: "24px" },
});

export const SkeletonWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 24,
});

export const SkeletonTabBar = styled(Skeleton)({
  backgroundColor: "rgba(171,150,255,0.1)",
});

export const SkeletonTitle = styled(Skeleton)({
  backgroundColor: "rgba(171,150,255,0.12)",
});

export const SkeletonText = styled(Skeleton)({
  backgroundColor: "rgba(171,150,255,0.08)",
});

export const SkeletonBlock = styled(Skeleton)({
  backgroundColor: "rgba(171,150,255,0.08)",
});

export const SkeletonGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 16,
  marginTop: 16,
});
