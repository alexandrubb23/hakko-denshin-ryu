import { useQuery } from "@tanstack/react-query";
import { ranksApi } from "@api/ranks";

export const useRanks = () =>
  useQuery({
    queryKey: ["ranks"],
    queryFn: () => ranksApi.fetchRanks(),
    staleTime: Infinity,
  });
