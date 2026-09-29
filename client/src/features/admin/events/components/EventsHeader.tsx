import AddIcon from "@mui/icons-material/Add";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useIntl } from "react-intl";

import PageHeader from "@components/shared/PageHeader";

interface EventsHeaderProps {
  count: number | undefined;
  onAdd: () => void;
}

const EventsHeader = ({ count, onAdd }: EventsHeaderProps) => {
  const intl = useIntl();

  return (
    <PageHeader
      icon={<EventNoteIcon fontSize="inherit" />}
      title={intl.formatMessage({ id: "page.events.title" })}
      count={count}
      addIcon={<AddIcon />}
      addLabel={intl.formatMessage({ id: "admin.events.add" })}
      onAdd={onAdd}
    />
  );
};

export default EventsHeader;
