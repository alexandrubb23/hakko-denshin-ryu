import { useQuery } from "@tanstack/react-query";

import { meApi } from "@api/me";

export const useMyRanks = () =>
  useQuery({
    queryKey: ["me", "ranks"],
    queryFn: () => meApi.getMyRanks(),
  });
