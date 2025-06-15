import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  getWork,
  createWork,
  updateWork,
  deleteWork,
} from "@/api/work";

// 単一作品の取得
export function useGetWorkQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["work", id],
    queryFn: async () => {
      return getWork(Number(id));
    },
    enabled: !!id,
  });
}

// 作品作成
export function useCreateWorkMutation(options?: UseMutationOptions<number | null, Error, Parameters<typeof createWork>[0]> = {}) {
  return useMutation({
    mutationKey: ["createWork"],
    mutationFn: async (payload: Parameters<typeof createWork>[0]) => {
      return createWork(payload);
    },
    ...options
  });
}

// 作品更新
export function useUpdateWorkMutation(id: string | undefined) {
  return useMutation({
    mutationKey: ["updateWork", id],
    mutationFn: async (payload: Parameters<typeof updateWork>[1]) => {
      return updateWork(Number(id), payload);
    },
  });
}

// 作品削除
export function useDeleteWorkMutation(id: string | undefined) {
  return useMutation({
    mutationKey: ["deleteWork", id],
    mutationFn: async () => {
      return deleteWork(Number(id));
    },
  });
}
