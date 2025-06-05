import axiosInstance from "@/lib/api";
import { CartItem, Order } from "@/types/types";

export const getSellerOrders = async (): Promise<Order[]> => {
  const res = await axiosInstance.get<{ results: Order[] }>("/orders/");
  return res.data.results;
};

export const getBuyerOrders = async (): Promise<Order[]> => {
  const res = await axiosInstance.get<{ results: Order[] }>("/orders/");
  return res.data.results;
};

export const createOrder = async (cart: CartItem[]) => {
  const items = cart.map((item) => ({
    product: item.productId,
    quantity: item.quantity,
  }));

  const res = await axiosInstance.post("/orders/", { items });
  return res.data;
};
