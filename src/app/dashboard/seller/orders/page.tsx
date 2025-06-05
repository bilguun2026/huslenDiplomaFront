"use client";

import React, { useState } from "react";
import { useSellerOrders } from "@/hooks/useOrders";
import OrderDetailModal from "@/components/dashboard/seller/OrderDetailModal";
import { Order } from "@/types/types";

const SellerOrdersPage = () => {
  const { data: orders, isLoading, error } = useSellerOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (isLoading) return <div>Уншиж байна...</div>;
  if (error) return <div>Алдаа гарлаа.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Ирсэн захиалгууд</h1>
      <table className="w-full border">
        <thead className="bg-[#2F3A9A] text-white">
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Захиалагч</th>
            <th className="py-2 px-4">Үнэ</th>
            <th className="py-2 px-4">Огноо</th>
            <th className="py-2 px-4">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id} className="text-black border-b">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.buyer.username}</td>
              <td className="py-2 px-4">₮{order.total_price}</td>
              <td className="py-2 px-4">
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-[#2F3A9A] border border-[#2F3A9A] px-3 py-1 rounded hover:bg-[#2F3A9A] hover:text-white transition"
                >
                  Дэлгэрэнгүй
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default SellerOrdersPage;
