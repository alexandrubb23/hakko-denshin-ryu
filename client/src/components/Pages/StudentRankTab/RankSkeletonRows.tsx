import { Skeleton, TableCell, TableRow } from "@mui/material";

import { SKELETON_SX } from "@style/tokens";

const RankSkeletonRows = () => (
  <>
    {[1, 2, 3].map((i) => (
      <TableRow key={i}>
        <TableCell>
          <Skeleton variant="rounded" width={80} height={40} sx={SKELETON_SX} />
        </TableCell>
        <TableCell>
          <Skeleton width={60} sx={SKELETON_SX} />
        </TableCell>
        <TableCell>
          <Skeleton width={90} sx={SKELETON_SX} />
        </TableCell>
        <TableCell>
          <Skeleton width={120} sx={SKELETON_SX} />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default RankSkeletonRows;
