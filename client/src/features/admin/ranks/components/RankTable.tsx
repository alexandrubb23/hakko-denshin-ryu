import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import { type StudentRankEntry } from "@api/students";
import CenterSpinner from "@components/ui/Spinner/CenterSpinner";

import RankRow from "./RankRow";
import { HeaderCell, StyledTableContainer } from "./RankTable.style";

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
    <StyledTableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((h) => (
              <HeaderCell key={h}>{h}</HeaderCell>
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
    </StyledTableContainer>
  );
};

export default RankTable;
