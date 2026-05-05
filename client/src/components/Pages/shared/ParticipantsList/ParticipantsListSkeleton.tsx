import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

import { BORDER_COLOR, SKELETON_SX } from "@style/tokens";

const ParticipantsListSkeleton = () => (
  <List>
    {Array.from({ length: 4 }).map((_, i) => (
      <ListItem key={i} divider sx={{ borderColor: BORDER_COLOR }}>
        <ListItemAvatar>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={SKELETON_SX}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" width={120} sx={SKELETON_SX} />}
          secondary={<Skeleton variant="text" width={180} sx={SKELETON_SX} />}
        />
      </ListItem>
    ))}
  </List>
);

export default ParticipantsListSkeleton;
