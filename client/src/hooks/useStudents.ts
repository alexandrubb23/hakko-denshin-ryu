import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "@api/students";

export const useStudents = () =>
  useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });
