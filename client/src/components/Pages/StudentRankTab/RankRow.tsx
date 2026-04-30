import { TableCell, TableRow, Typography } from "@mui/material";

import { type StudentRankEntry } from "@api/students";

import BeltImage from "./BeltImage";

interface Props {
  entry: StudentRankEntry;
}

const RankRow = ({ entry }: Props) => (
  <TableRow sx={{ "&:last-child td": { border: 0 } }}>
    <TableCell sx={{ py: 2 }}>
      <BeltImage belt={entry.rank.belt} />
    </TableCell>
    <TableCell>
      <Typography variant="body2" fontWeight={600} color="text.primary">
        {entry.rank.name}
      </Typography>
    </TableCell>
    <TableCell>
      <Typography variant="body2" color="text.secondary">
        {new Date(entry.awardedAt).toLocaleDateString()}
      </Typography>
    </TableCell>
    <TableCell>
      <Typography variant="body2" color="text.secondary">
        {entry.notes ?? "—"}
      </Typography>
    </TableCell>
  </TableRow>
);

export default RankRow;
