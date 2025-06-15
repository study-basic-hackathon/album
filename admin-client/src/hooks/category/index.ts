import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryWorks,
} from "@/api/category";

// カテゴリ一覧取得
export function useGetCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return getCategories();
    },
  });
}

// 単一カテゴリ取得
export function useGetCategoryQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      return getCategory(Number(id));
    },
    enabled: !!id,
  });
}

// カテゴリ作成
export function useCreateCategoryMutation() {
  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: async (payload: Parameters<typeof createCategory>[0]) => {
      return createCategory(payload);
    },
  });
}

// カテゴリ更新
export function useUpdateCategoryMutation(id: string | undefined) {
  return useMutation({
    mutationKey: ["updateCategory", id],
    mutationFn: async (payload: Parameters<typeof updateCategory>[1]) => {
      return updateCategory(Number(id), payload);
    },
  });
}

// カテゴリ削除
export function useDeleteCategoryMutation(id: string | undefined) {
  return useMutation({
    mutationKey: ["deleteCategory", id],
    mutationFn: async () => {
      return deleteCategory(Number(id));
    },
  });
}

// カテゴリに紐づく作品取得
export function useGetCategoryWorksQuery(id: string | undefined) {
  return useQuery({
    queryKey: ["categoryWorks", id],
    queryFn: async () => {
      return getCategoryWorks(Number(id));
    },
    enabled: !!id,
  });
}
