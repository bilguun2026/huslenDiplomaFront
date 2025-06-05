// hooks/useProducts.ts
import { useCrud } from "@/hooks/useCrud";
import { Product } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { getList } from "@/services/crudService";

// const { useList, useCreate, useUpdate, useDelete } = useCrud<Product>(
//   "products",
//   "/products"
// );
// export const useCreateProduct = useCreate;
// export const useUpdateProduct = useUpdate;
// export const useDeleteProduct = useDelete;

export const useProducts = (categoryId?: number) =>
  useQuery<Product[]>({
    queryKey: ["products", categoryId],
    queryFn: async () => {
      const response = await getList<Product>(
        "/products",
        categoryId ? { category: categoryId } : undefined
      );
      return response.results;
    },
  });
