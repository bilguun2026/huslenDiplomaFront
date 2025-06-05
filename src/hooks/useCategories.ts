// hooks/useCategories.ts
import { useCrud } from "@/hooks/useCrud";
import { Category } from "@/types/types";

export const useCategories = () => {
  const { useList } = useCrud<Category>("categories", "/categories");
  return useList({});
};
