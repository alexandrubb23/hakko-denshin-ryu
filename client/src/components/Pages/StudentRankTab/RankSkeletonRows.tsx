import { Skeleton, TableCell, TableRow } from "@mui/material";

const SKEL = { bgcolor: "rgba(171,150,255,0.12)" };

const RankSkeletonRows = () => (
  <>
    {[1, 2, 3].map((i) => (
      <TableRow key={i}>
        <TableCell>
          <Skeleton variant="rounded" width={80} height={40} sx={SKEL} />
        </TableCell>
        <TableCell>
          <Skeleton width={60} sx={SKEL} />
        </TableCell>
        <TableCell>
          <Skeleton width={90} sx={SKEL} />
        </TableCell>
        <TableCell>
          <Skeleton width={120} sx={SKEL} />
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default RankSkeletonRows;
