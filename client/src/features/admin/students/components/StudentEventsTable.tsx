import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { StudentEvent } from "@api/events";
import AttendedChip from "@components/shared/AttendedChip";
import CenterSpinner from "@components/ui/Spinner/CenterSpinner";
import { BORDER_COLOR, PURPLE_ALPHA_04, SURFACE_BG } from "@style/tokens";
import { formatDate } from "@utils/time";

interface Props {
  events: StudentEvent[] | undefined;
  isLoading: boolean;
}

const cellBorder = { "& td, & th": { borderBottomColor: BORDER_COLOR } };

const StudentEventsTable = ({ events, isLoading }: Props) => {
  if (isLoading) return <CenterSpinner />;

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ backgroundColor: SURFACE_BG, borderRadius: 2, mt: 3 }}
    >
      <Table>
        <TableHead>
          <TableRow sx={cellBorder}>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Event
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Type
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Start Date
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Location
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
              Attended
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(events ?? []).map((event) => (
            <TableRow
              key={event.id}
              sx={{
                ...cellBorder,
                "&:last-child td": { border: 0 },
                "&:hover": { backgroundColor: PURPLE_ALPHA_04 },
              }}
            >
              <TableCell>
                <Typography variant="body2" fontWeight={600}>
                  {event.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {event.type}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(event.startDate)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: 160,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {event.location}
                </Typography>
              </TableCell>
              <TableCell>
                <Stack direction="row">
                  <AttendedChip attended={event.attended} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentEventsTable;
