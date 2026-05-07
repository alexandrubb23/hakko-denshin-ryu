import { useQuery } from "@tanstack/react-query";

import { meApi, type MeUser } from "@api/me";

export type { MeUser };

export const useMe = () =>
  useQuery<MeUser>({
    queryKey: ["me"],
    queryFn: () => meApi.getMe(),
    staleTime: 1000 * 60 * 5,
  });
