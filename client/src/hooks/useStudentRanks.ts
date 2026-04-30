import { useQuery } from "@tanstack/react-query";
import { studentsApi } from "@api/students";

export const useStudentRanks = (id: string) =>
  useQuery({
    queryKey: ["students", id, "ranks"],
    queryFn: () => studentsApi.fetchStudentRanks(id),
  });
