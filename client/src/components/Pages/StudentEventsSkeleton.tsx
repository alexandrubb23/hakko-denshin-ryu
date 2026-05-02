import { Skeleton, TableCell, TableRow } from "@mui/material";

import { BORDER_COLOR, SKELETON_SX } from "@style/tokens";

const SKELETON_ROWS = 4;

const cellBorder = { "& td, & th": { borderBottomColor: BORDER_COLOR } };

const StudentEventsSkeleton = () => (
  <>
    {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
      <TableRow
        key={i}
        sx={{ ...cellBorder, "&:last-child td": { border: 0 } }}
      >
        <TableCell>
          <Skeleton variant="text" width={160} sx={SKELETON_SX} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width={70} sx={SKELETON_SX} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width={90} sx={SKELETON_SX} />
        </TableCell>
        <TableCell>
          <Skeleton variant="text" width={120} sx={SKELETON_SX} />
        </TableCell>
        <TableCell>
          <Skeleton variant="rounded" width={60} height={22} sx={SKELETON_SX} />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default StudentEventsSkeleton;
