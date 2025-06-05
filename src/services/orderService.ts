import axiosInstance from "@/lib/api"; // ✅ YOUR secure instance
import { Order } from "@/types/types";

export const getSellerOrders = async (): Promise<Order[]> => {
  const res = await axiosInstance.get<Order[]>("/orders/");
  return res.data;
};
