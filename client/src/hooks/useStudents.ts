import { useQuery } from "@tanstack/react-query";
import { studentsApi } from "@api/students";

export const useStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: () => studentsApi.fetchStudents(),
  });
