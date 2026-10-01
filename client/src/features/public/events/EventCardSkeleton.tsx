import { CardContent, Skeleton } from "@mui/material";

import { SKELETON_SX } from "@style/tokens";

import {
  CARD_CONTENT_SX,
  EVENT_IMAGE_HEIGHT,
  SkeletonCard,
} from "./PublicEvents.style";

const LINE_WIDTHS = ["40%", "80%", "60%", "50%"];

/** Placeholder shaped like an EventCard, shown while events load */
const EventCardSkeleton = () => (
  <SkeletonCard>
    <Skeleton
      variant="rectangular"
      height={EVENT_IMAGE_HEIGHT}
      sx={SKELETON_SX}
    />
    <CardContent sx={CARD_CONTENT_SX}>
      {LINE_WIDTHS.map((width) => (
        <Skeleton key={width} width={width} sx={SKELETON_SX} />
      ))}
      <Skeleton variant="rectangular" height={36} sx={SKELETON_SX} />
    </CardContent>
  </SkeletonCard>
);

export default EventCardSkeleton;
