import { useQuery } from "@tanstack/react-query";
import { studentsApi } from "@api/students";

export const useStudent = (id: string) =>
  useQuery({
    queryKey: ["students", id],
    queryFn: () => studentsApi.fetchStudent(id),
  });
