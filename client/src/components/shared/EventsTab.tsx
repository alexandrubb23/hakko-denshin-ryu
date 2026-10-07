import EventNoteIcon from "@mui/icons-material/EventNote";
import { Paper, Typography } from "@mui/material";

import type { StudentEvent } from "@api/events";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
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
      <Typography color="error" sx={{ mt: 4 }}>
        <FormattedMessage id="shared.events.error" />
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
        <Typography sx={{ color: "text.secondary" }}>
          <FormattedMessage id="shared.events.empty" />
        </Typography>
      </Paper>
    );
  }

  return <StudentEventsTable events={events} isLoading={isLoading} />;
};

export default EventsTab;
