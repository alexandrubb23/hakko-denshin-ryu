import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";

import PageHeader from "../PageHeader";

interface EventsHeaderProps {
  count: number | undefined;
  onAdd: () => void;
}

const EventsHeader = ({ count, onAdd }: EventsHeaderProps) => (
  <PageHeader
    icon={<EventNoteIcon fontSize="inherit" />}
    title="Events"
    count={count}
    addIcon={<AddIcon />}
    addLabel="Add Event"
    onAdd={onAdd}
  />
);

export default EventsHeader;
