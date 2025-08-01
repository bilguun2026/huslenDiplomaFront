import { useQuery } from "@tanstack/react-query";
import { getBuyerOrders, getSellerOrders } from "@/services/orderService";
import { Order } from "@/types/types";

export const useSellerOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["seller-orders"],
    queryFn: getSellerOrders,
  });
};
export const useBuyerOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["buyer-orders"],
    queryFn: getBuyerOrders,
  });
};
