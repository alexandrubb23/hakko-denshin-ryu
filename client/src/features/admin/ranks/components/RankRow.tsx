import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";

import { type StudentRankEntry } from "@api/students";
import { ERROR_DARK } from "@style/status.tokens";
import { PURPLE } from "@style/tokens";

import BeltImage from "./BeltImage";

interface Props {
  entry: StudentRankEntry;
  onEdit: (entry: StudentRankEntry) => void;
  onDelete: (entry: StudentRankEntry) => void;
  readOnly?: boolean;
}

const RankRow = ({ entry, onEdit, onDelete, readOnly }: Props) => {
  const intl = useIntl();

  return (
    <TableRow sx={{ "&:last-child td": { border: 0 } }}>
      <TableCell sx={{ py: 2, width: "1%", whiteSpace: "nowrap" }}>
        <BeltImage belt={entry.rank.belt} />
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          {entry.rank.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {new Date(entry.awardedAt).toLocaleDateString(intl.locale)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {entry.notes ?? "—"}
        </Typography>
      </TableCell>
      {!readOnly && (
        <TableCell sx={{ py: 1 }}>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onEdit(entry)}
              aria-label={intl.formatMessage({ id: "admin.ranks.row.edit" })}
              sx={{ color: PURPLE, opacity: 0.7, "&:hover": { opacity: 1 } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(entry)}
              aria-label={intl.formatMessage({ id: "admin.ranks.row.delete" })}
              sx={{
                color: ERROR_DARK,
                opacity: 0.7,
                "&:hover": { opacity: 1 },
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
};

export default RankRow;
