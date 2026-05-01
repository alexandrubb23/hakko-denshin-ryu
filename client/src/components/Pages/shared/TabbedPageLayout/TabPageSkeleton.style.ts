import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
  gap: 16,
  marginTop: 16,
});
