import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { type StudentRankEntry } from "@api/students";
import { PURPLE } from "@style/tokens";

import BeltImage from "./BeltImage";

interface Props {
  entry: StudentRankEntry;
  onEdit: (entry: StudentRankEntry) => void;
  onDelete: (entry: StudentRankEntry) => void;
}

const RankRow = ({ entry, onEdit, onDelete }: Props) => (
  <TableRow sx={{ "&:last-child td": { border: 0 } }}>
    <TableCell sx={{ py: 2, width: "1%", whiteSpace: "nowrap" }}>
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
    <TableCell sx={{ py: 1 }}>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={() => onEdit(entry)}
          aria-label="edit rank"
          sx={{ color: PURPLE, opacity: 0.7, "&:hover": { opacity: 1 } }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onDelete(entry)}
          aria-label="delete rank"
          sx={{ color: "#d32f2f", opacity: 0.7, "&:hover": { opacity: 1 } }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
    </TableCell>
  </TableRow>
);

export default RankRow;
