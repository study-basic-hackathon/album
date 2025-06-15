import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  getSeason,
  getSeasons,
  createSeason,
  updateSeason,
  deleteSeason,
  getSeasonWorks,
} from "@/api/season";

// 材料一覧取得
export function useGetSeasonsQuery() {
  return useQuery({
    queryKey: ["seasons"],
    queryFn: async () => {
      return getSeasons();
    },
  });
}

// 単一材料取得
export function useGetSeasonQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["season", id],
    queryFn: async () => {
      return getSeason(Number(id));
    },
    enabled: !!id,
  });
}

// 材料作成
export function useCreateSeasonMutation() {
  return useMutation({
    mutationKey: ["createSeason"],
    mutationFn: async (payload: Parameters<typeof createSeason>[0]) => {
      return createSeason(payload);
    },
  });
}

// 材料更新
export function useUpdateSeasonMutation(
  id: string | undefined,
  options: UseMutationOptions<void, Error, Parameters<typeof updateSeason>[1]> = {}
) {
  return useMutation({
    mutationKey: ["updateSeason", id],
    mutationFn: async (payload: Parameters<typeof updateSeason>[1]) => {
      return updateSeason(Number(id), payload);
    },
    ...options
  });
}

// 材料削除
export function useDeleteSeasonMutation(id: string | undefined) {
  return useMutation({
    mutationKey: ["deleteSeason", id],
    mutationFn: async () => {
      return deleteSeason(Number(id));
    },
  });
}

// 材料に紐づく作品取得
export function useGetSeasonWorksQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["seasonWorks", id],
    queryFn: async () => {
      return getSeasonWorks(Number(id));
    },
    enabled: !!id,
  });
}
