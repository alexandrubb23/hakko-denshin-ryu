import EventNoteIcon from "@mui/icons-material/EventNote";
import { Paper, Typography } from "@mui/material";

import type { StudentEvent } from "@api/events";
import StudentEventsTable from "@features/admin/students/components/StudentEventsTable";
import { SURFACE_BG } from "@style/tokens";

interface Props {
  events: StudentEvent[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const EventsTab = ({ events, isLoading, isError }: Props) => {
  if (isError) {
    return (
      <Typography color="error" mt={4}>
        Failed to load events. Please try again.
      </Typography>
    );
  }

  if (!isLoading && events?.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{ p: 6, textAlign: "center", backgroundColor: SURFACE_BG, mt: 3 }}
      >
        <EventNoteIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
        <Typography color="text.secondary">No events found.</Typography>
      </Paper>
    );
  }

  return <StudentEventsTable events={events} isLoading={isLoading} />;
};

export default EventsTab;
