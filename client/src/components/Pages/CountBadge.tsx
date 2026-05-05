import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BORDER_COLOR, PURPLE, SKELETON_SX } from "@style/tokens";

const PillBox = styled("span")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 24,
  height: 20,
  padding: "0 6px",
  borderRadius: 10,
  border: `1px solid ${BORDER_COLOR}`,
  color: PURPLE,
  fontSize: "0.7rem",
  fontWeight: 700,
  lineHeight: 1,
});

interface CountBadgeProps {
  count: number | undefined;
  isLoading: boolean;
}

const CountBadge = ({ count, isLoading }: CountBadgeProps) => {
  if (isLoading) {
    return (
      <Skeleton variant="rounded" width={40} height={20} sx={SKELETON_SX} />
    );
  }
  if (count === undefined) return null;
  return <PillBox>{count}</PillBox>;
};

export default CountBadge;
