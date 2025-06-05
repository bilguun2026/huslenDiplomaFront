import { useQuery } from "@tanstack/react-query";
import { getSellerOrders } from "@/services/orderService";
import { Order } from "@/types/types";

export const useSellerOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["seller-orders"],
    queryFn: getSellerOrders,
  });
};
