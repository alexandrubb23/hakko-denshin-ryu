import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { type StudentRankEntry } from "@api/students";
import { BACKDROP_BLUR, BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

import RankRow from "./RankRow";
import RankSkeletonRows from "./RankSkeletonRows";

const TABLE_HEADERS = ["Belt", "Rank", "Awarded on", "Notes"];

interface Props {
  isLoading: boolean;
  ranks: StudentRankEntry[] | undefined;
}

const RankTable = ({ isLoading, ranks }: Props) => (
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
          {TABLE_HEADERS.map((h) => (
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
        {isLoading ? (
          <RankSkeletonRows />
        ) : (
          ranks?.map((entry) => <RankRow key={entry.id} entry={entry} />)
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default RankTable;
