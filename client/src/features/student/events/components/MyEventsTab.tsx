import EventsTab from "@components/shared/EventsTab";
import { useMyEvents } from "@features/student/events/hooks/useMyEvents";

const MyEventsTab = () => {
  const { data: events, isLoading, isError } = useMyEvents();
  return <EventsTab events={events} isLoading={isLoading} isError={isError} />;
};

export default MyEventsTab;
