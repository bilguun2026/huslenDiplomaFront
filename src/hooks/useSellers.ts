import axiosInstance from "@/lib/api";
import { getSellers } from "@/services/sellerService";
import { FullProfile, Product } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useSellers = () => {
  return useQuery<FullProfile[]>({
    queryKey: ["sellers"],
    queryFn: getSellers,
  });
};

export const useSellerProducts = (sellerId: number | null) => {
  return useQuery<Product[]>({
    queryKey: ["seller-products", sellerId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/products/?seller=${sellerId}`);
      console.log("Seller products response:", response.data);
      return response.data.results as Product[];
    },
    enabled: !!sellerId,
  });
};
