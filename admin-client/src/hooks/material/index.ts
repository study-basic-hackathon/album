import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  getMaterial,
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialWorks,
} from "@/api/material";

// 材料一覧取得
export function useGetMaterialsQuery() {
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      return getMaterials();
    },
  });
}

// 単一材料取得
export function useGetMaterialQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["material", id],
    queryFn: async () => {
      return getMaterial(Number(id));
    },
    enabled: !!id,
  });
}

// 材料作成
export function useCreateMaterialMutation() {
  return useMutation({
    mutationKey: ["createMaterial"],
    mutationFn: async (payload: Parameters<typeof createMaterial>[0]) => {
      return createMaterial(payload);
    },
  });
}

// 材料更新
export function useUpdateMaterialMutation(id: string | undefined) {
  return useMutation({
    mutationKey: ["updateMaterial", id],
    mutationFn: async (payload: Parameters<typeof updateMaterial>[1]) => {
      return updateMaterial(Number(id), payload);
    },
  });
}

// 材料削除
export function useDeleteMaterialMutation(id: string | undefined) {
  return useMutation({
    mutationKey: ["deleteMaterial", id],
    mutationFn: async () => {
      return deleteMaterial(Number(id));
    },
  });
}

// 材料に紐づく作品取得
export function useGetMaterialWorksQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["materialWorks", id],
    queryFn: async () => {
      return getMaterialWorks(Number(id));
    },
    enabled: !!id,
  });
}
