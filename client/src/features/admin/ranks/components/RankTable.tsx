import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { type StudentRankEntry } from "@api/students";
import CenterSpinner from "@components/ui/Spinner/CenterSpinner";
import { BACKDROP_BLUR, BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

import RankRow from "./RankRow";

const TABLE_HEADERS = ["Belt", "Rank", "Awarded on", "Notes", "Actions"];
const TABLE_HEADERS_READONLY = ["Belt", "Rank", "Awarded on", "Notes"];

interface Props {
  isLoading: boolean;
  ranks: StudentRankEntry[] | undefined;
  onEdit: (entry: StudentRankEntry) => void;
  onDelete: (entry: StudentRankEntry) => void;
  readOnly?: boolean;
}

const RankTable = ({ isLoading, ranks, onEdit, onDelete, readOnly }: Props) => {
  if (isLoading) return <CenterSpinner />;

  const headers = readOnly ? TABLE_HEADERS_READONLY : TABLE_HEADERS;
  return (
    <TableContainer
      sx={{
        mt: 2,
        backgroundColor: SURFACE_BG,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 2,
        backdropFilter: BACKDROP_BLUR,
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((h) => (
              <TableCell
                key={h}
                sx={{
                  color: PURPLE,
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  borderBottom: `1px solid ${BORDER_COLOR}`,
                }}
              >
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ranks?.map((entry) => (
            <RankRow
              key={entry.id}
              entry={entry}
              onEdit={onEdit}
              onDelete={onDelete}
              readOnly={readOnly}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankTable;
