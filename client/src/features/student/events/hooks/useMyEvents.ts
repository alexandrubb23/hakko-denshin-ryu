import { useQuery } from "@tanstack/react-query";

import { meApi } from "@api/me";

export const useMyEvents = () =>
  useQuery({
    queryKey: ["me", "events"],
    queryFn: () => meApi.getMyEvents(),
  });
