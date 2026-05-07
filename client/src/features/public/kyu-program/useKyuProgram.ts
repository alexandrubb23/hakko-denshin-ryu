import { kyuProgramApi } from "@api/kyuProgram";
import { useQuery } from "@tanstack/react-query";

export const useKyuProgram = () =>
  useQuery({
    queryKey: ["kyu-program"],
    queryFn: () => kyuProgramApi.fetchKyuProgram(),
  });
