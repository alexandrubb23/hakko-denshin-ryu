import { CardContent, Grid, Skeleton } from "@mui/material";

import { SKELETON_SX } from "@style/tokens";
import { SkeletonCard } from "./PublicEvents.style";

const PublicEventSkeleton = () => (
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <SkeletonCard>
      <Skeleton variant="rectangular" height={180} sx={SKELETON_SX} />
      <CardContent>
        <Skeleton variant="text" width="70%" sx={{ ...SKELETON_SX, mb: 1 }} />
        <Skeleton variant="text" width="50%" sx={SKELETON_SX} />
      </CardContent>
    </SkeletonCard>
  </Grid>
);

export default PublicEventSkeleton;
