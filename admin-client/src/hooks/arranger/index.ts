import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  getArranger,
  getArrangers,
  createArranger,
  updateArranger,
  deleteArranger,
  getArrangerWorks,
} from "@/api/arranger";

export function useGetArrangersQuery () {
  return useQuery({
    queryKey: ["arrangers"],
    queryFn: async () => {
      return getArrangers()
    }
  })
}

export function useGetArrangerQuery (id: string | undefined) {
  return useQuery({
    queryKey: ["arranger", id],
    queryFn: async () => {
      return getArranger(Number(id));
    },
    enabled: !!id,
  });
}

export function useCreateArrangerMutation () {
  return useMutation({
    mutationKey: ["createArranger"],
    mutationFn: async (payload: Parameters<typeof createArranger>[0]) => {
      return createArranger(payload);
    },
  });
}

export function useUpdateArrangerMutation (id: string | undefined) {
  return useMutation({
    mutationKey: ["updateArranger", id],
    mutationFn: async (payload: Parameters<typeof updateArranger>[1]) => {
      return updateArranger(Number(id), payload);
    },
  });
}

export function useDeleteArrangerMutation (id: string | undefined) {
  return useMutation({
    mutationKey: ["deleteArranger", id],
    mutationFn: async () => {
      return deleteArranger(Number(id));
    },
  });
}

export function useGetArrangerWorksQuery (id: string | undefined) {
  return useQuery({
    queryKey: ["arrangerWorks", id],
    queryFn: async () => {
      return getArrangerWorks(Number(id));
    },
    enabled: !!id,
  });
}
