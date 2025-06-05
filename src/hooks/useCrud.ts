import {
  getList,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  PaginatedResponse,
} from "@/services/crudService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCrud = <T>(key: string, endpoint: string) => {
  return {
    useList: (params?: Record<string, any>) => {
      return useQuery({
        queryKey: [key, params],
        queryFn: () => getList<T>(endpoint, params),
      });
    },

    useOne: (id?: number) => {
      return useQuery({
        queryKey: [key, id],
        queryFn: () => getOne<T>(endpoint, id as number),
        enabled: !!id,
      });
    },

    useDetail: () => {
      return useQuery({
        queryKey: [key],
        queryFn: () => getOne<T>(endpoint, 0), // or just GET /profile/ without ID
      });
    },

    useCreate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (data: Partial<T>) => createOne<T>(endpoint, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
      });
    },

    useUpdate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<T> }) =>
          updateOne<T>(endpoint, id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
      });
    },

    useDelete: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: (id: number) => deleteOne(endpoint, id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
      });
    },
  };
};
