import EventsTab from "@components/shared/EventsTab";
import { useStudentEvents } from "@features/admin/students/hooks/useStudentEvents";

interface Props {
  studentId: string;
}

const StudentEventsTab = ({ studentId }: Props) => {
  const { data: events, isLoading, isError } = useStudentEvents(studentId);
  return <EventsTab events={events} isLoading={isLoading} isError={isError} />;
};

export default StudentEventsTab;
