import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import {
  Chip,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useIntl } from "react-intl";

import type { Event } from "@api/events";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import {
  EVENT_STATUS_LABEL_IDS,
  EVENT_TYPE_LABEL_IDS,
} from "@features/admin/events/utils/eventLabels";
import {
  ERROR_SOFT,
  ERROR_SOFT_ALPHA_12,
  ERROR_SOFT_TEXT,
  ERROR_SOFT_TEXT_ALPHA_12,
  SUCCESS,
  SUCCESS_ALPHA_15,
} from "@style/status.tokens";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_04,
  PURPLE_ALPHA_12,
  SKELETON_SX,
  SURFACE_BG,
} from "@style/tokens";
import { formatDate } from "@utils/time";
import DeleteEventModal from "./DeleteEventModal";
import EditEventModal from "./EditEventModal";
import EventParticipantsModal from "./EventParticipantsModal";

interface EventsTableProps {
  events: Event[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const SKELETON_ROWS = 5;

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  published: { bg: SUCCESS_ALPHA_15, color: SUCCESS },
  draft: { bg: PURPLE_ALPHA_12, color: PURPLE },
  cancelled: { bg: ERROR_SOFT_ALPHA_12, color: ERROR_SOFT },
};

const EventsTable = ({ events, isLoading, isError }: EventsTableProps) => {
  const intl = useIntl();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [participantsEvent, setParticipantsEvent] = useState<Event | null>(
    null,
  );

  if (isError) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        <FormattedMessage id="admin.events.table.error" />
      </Typography>
    );
  }

  if (!isLoading && events?.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{ p: 6, textAlign: "center", backgroundColor: SURFACE_BG }}
      >
        <EventNoteIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
        <Typography sx={{ color: "text.secondary" }}>
          <FormattedMessage id="admin.events.table.empty" />
        </Typography>
      </Paper>
    );
  }

  if (!isLoading && !events) return null;

  const cellBorder = { "& td, & th": { borderBottomColor: BORDER_COLOR } };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ backgroundColor: SURFACE_BG, borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={cellBorder}>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                <FormattedMessage id="admin.events.table.event" />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                <FormattedMessage id="common.type" />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                <FormattedMessage id="common.status" />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                <FormattedMessage id="admin.events.table.startDate" />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                <FormattedMessage id="common.location" />
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, color: "text.secondary" }}
              >
                <FormattedMessage id="common.actions" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
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
                      <Skeleton
                        variant="rounded"
                        width={80}
                        height={22}
                        sx={SKELETON_SX}
                      />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={90} sx={SKELETON_SX} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={120} sx={SKELETON_SX} />
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        sx={{ gap: 0.5, justifyContent: "flex-end" }}
                      >
                        {Array.from({ length: 3 }).map((_, j) => (
                          <Skeleton
                            key={j}
                            variant="circular"
                            width={30}
                            height={30}
                            sx={SKELETON_SX}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              : events!.map((event) => {
                  const statusStyle =
                    STATUS_COLORS[event.status] ?? STATUS_COLORS.draft;
                  return (
                    <TableRow
                      key={event.id}
                      sx={{
                        ...cellBorder,
                        "&:last-child td": { border: 0 },
                        "&:hover": {
                          backgroundColor: PURPLE_ALPHA_04,
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {event.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            textTransform: "capitalize",
                          }}
                        >
                          {EVENT_TYPE_LABEL_IDS[event.type]
                            ? intl.formatMessage({
                                id: EVENT_TYPE_LABEL_IDS[event.type],
                              })
                            : event.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            EVENT_STATUS_LABEL_IDS[event.status]
                              ? intl.formatMessage({
                                  id: EVENT_STATUS_LABEL_IDS[event.status],
                                })
                              : event.status
                          }
                          size="small"
                          sx={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            fontWeight: 600,
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {formatDate(event.startDate, intl.locale)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            maxWidth: 160,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {event.location}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip
                          title={intl.formatMessage({
                            id: "admin.events.table.participants",
                          })}
                        >
                          <IconButton
                            size="small"
                            onClick={() => setParticipantsEvent(event)}
                            sx={{
                              color: PURPLE,
                              "&:hover": {
                                backgroundColor: PURPLE_ALPHA_12,
                              },
                            }}
                          >
                            <GroupIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={intl.formatMessage({
                            id: "admin.events.table.edit",
                          })}
                        >
                          <IconButton
                            size="small"
                            onClick={() => setEditingEvent(event)}
                            sx={{
                              color: PURPLE,
                              "&:hover": {
                                backgroundColor: PURPLE_ALPHA_12,
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={intl.formatMessage({
                            id: "admin.events.table.delete",
                          })}
                        >
                          <IconButton
                            size="small"
                            onClick={() => setDeletingEvent(event)}
                            sx={{
                              color: ERROR_SOFT_TEXT,
                              "&:hover": {
                                backgroundColor: ERROR_SOFT_TEXT_ALPHA_12,
                              },
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>

      {editingEvent && (
        <EditEventModal
          open
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}

      {deletingEvent && (
        <DeleteEventModal
          open
          event={deletingEvent}
          onClose={() => setDeletingEvent(null)}
        />
      )}

      {participantsEvent && (
        <EventParticipantsModal
          open
          event={participantsEvent}
          onClose={() => setParticipantsEvent(null)}
        />
      )}
    </>
  );
};

export default EventsTable;
