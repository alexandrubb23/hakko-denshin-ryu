import type { TypographyProps } from "@mui/material";
import { Skeleton, Typography } from "@mui/material";

import { SKELETON_SX } from "@style/tokens";

type Props = TypographyProps & {
  isLoading: boolean;
  skeletonWidth?: number | string;
};

const SkeletonText = ({
  isLoading,
  skeletonWidth = 120,
  children,
  ...typographyProps
}: Props) => (
  <Typography {...typographyProps}>
    {isLoading ? <Skeleton width={skeletonWidth} sx={SKELETON_SX} /> : children}
  </Typography>
);

export default SkeletonText;
