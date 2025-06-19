import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  getExhibition,
  getExhibitions,
  createExhibition,
  updateExhibition,
  deleteExhibition,
  getExhibitionWorks,
} from "@/api/exhibition";

export function useGetExhibitionsQuery () {
  return useQuery({
    queryKey: ["exhibitions"],
    queryFn: () => {
      return getExhibitions()
    }
  })
}

export function useGetExhibitionQuery (id: string | undefined) {
  return useQuery({
    queryKey: ["exhibition", id],
    queryFn: () => {
      return getExhibition(Number(id))
    },
    enabled: !!id
  });
}

export function useCreateExhibitionMutation () {
  return useMutation({
    mutationKey: ["createExhibition"],
    mutationFn: (payload: Parameters<typeof createExhibition>[0]) => {
      return createExhibition(payload);
    }
  });
}

export function useUpdateExhibitionMutation (id: string | undefined) {
  return useMutation({
    mutationKey: ["updateExhibition", id],
    mutationFn: (payload: Parameters<typeof updateExhibition>[1]) => {
      return updateExhibition(Number(id), payload)
    }
  });
}

export function useDeleteExhibitionMutation (id: string | undefined) {
  return useMutation({
    mutationKey: ["deleteExhibition", id],
    mutationFn: async () => {
      return deleteExhibition(Number(id));
    },
  });
}

export function useGetExhibitionWorksQuery (id: string | undefined) {
  return useQuery({
    queryKey: ["exhibitionWorks", id],
    queryFn: async () => {
      return getExhibitionWorks(Number(id));
    },
    enabled: !!id,
  });
}
