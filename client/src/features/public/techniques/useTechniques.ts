import { useQuery } from "@tanstack/react-query";
import { techniquesApi } from "@api/techniques";

export const useTechniques = () =>
  useQuery({
    queryKey: ["techniques"],
    queryFn: () => techniquesApi.fetchTechniques(),
  });
