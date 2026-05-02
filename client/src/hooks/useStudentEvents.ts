import { eventsApi } from "@api/events";
import { useQuery } from "@tanstack/react-query";

export const useStudentEvents = (studentId: string) =>
  useQuery({
    queryKey: ["admin", "students", studentId, "events"],
    queryFn: () => eventsApi.fetchStudentEvents(studentId),
  });
