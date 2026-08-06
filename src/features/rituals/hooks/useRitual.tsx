import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ritualService } from "../services";
import type { RitualFliterParams } from "../types";

export const useRituals = (params?: RitualFliterParams) => {
  const query = useQuery({
    queryKey: ["rituals", params],
    queryFn: () => ritualService.getAll(params),
    placeholderData: keepPreviousData,
  });

  return {
    rituals: query.data?.data ?? [],
    pagination: query.data?.meta,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
};

