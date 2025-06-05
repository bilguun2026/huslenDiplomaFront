// hooks/useCategories.ts
import { useCrud } from "@/hooks/useCrud";
import { Category } from "@/types/types";

const { useList } = useCrud<Category>("categories", "/categories");
export const useCategories = useList;
