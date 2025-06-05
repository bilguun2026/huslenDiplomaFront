// api/productService.ts

import axiosInstance from "@/lib/api";
import { Product } from "@/types/types";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>("products/");
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axiosInstance.get<Product>(`products/${id}/`);
  return response.data;
};

export const createProduct = async (
  productData: Partial<Product>
): Promise<Product> => {
  const response = await axiosInstance.post<Product>("products/", productData);
  return response.data;
};

export const updateProduct = async (
  id: number,
  productData: Partial<Product>
): Promise<Product> => {
  const response = await axiosInstance.put<Product>(
    `products/${id}/`,
    productData
  );
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosInstance.delete(`products/${id}/`);
};

export const fetchProductsByCategory = async (categoryId?: number) => {
  const res = await axiosInstance.get<Product[]>(
    categoryId ? `/products/?category=${categoryId}` : `/products/`
  );
  return res.data;
};
