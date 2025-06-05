"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import { Order } from "@/types/types";
import { XMarkIcon } from "@heroicons/react/24/solid";

type Props = {
  order: Order;
  onClose: () => void;
  isOpen: boolean;
};

const OrderDetailModal = ({ order, onClose, isOpen }: Props) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      {/* Frosted transparent background */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-lg transition-opacity duration-300" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-3xl bg-white border-4 border-[#2F3A9A] p-8 rounded-2xl shadow-2xl relative">
          {/* Close icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#2F3A9A] hover:text-[#1d2678] transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <Dialog.Title className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
            🧾 Захиалгын дэлгэрэнгүй
          </Dialog.Title>

          {/* Buyer & order info */}
          <div className="text-md space-y-2 text-black mb-6 bg-[#F9FAFB] p-4 rounded-lg border border-gray-200">
            <div>
              <b>👤 Захиалагч:</b> {order.buyer.username} ({order.buyer.email})
            </div>
            <div>
              <b>📦 Хаяг:</b> {order.shipping_address}
            </div>
            <div>
              <b>💰 Нийт үнэ:</b> ₮{order.total_price}
            </div>
            <div>
              <b>📌 Захиалгын төлөв:</b>{" "}
              <span className="capitalize">{order.status}</span>
            </div>
            <div>
              <b>💳 Төлбөрийн төлөв:</b>{" "}
              <span className="capitalize">{order.payment_status}</span>
            </div>
            <div>
              <b>🗓 Огноо:</b> {new Date(order.created_at).toLocaleString()}
            </div>
          </div>

          {/* Product list */}
          <div>
            <h3 className="font-semibold text-black text-lg mb-3">
              🛍 Захиалсан бүтээгдэхүүнүүд:
            </h3>
            <ul className="grid grid-cols-1 gap-4 text-sm text-black">
              {order.order_items.map((item) => (
                <li
                  key={item.id}
                  className="bg-[#F0F2FF] rounded-lg p-4 shadow-sm border border-[#2F3A9A]/40"
                >
                  <div className="font-medium text-base mb-1">
                    {item.product.name}
                  </div>
                  <div className="text-sm">Үнэ: ₮{item.product.price}</div>
                  <div className="text-sm">Тоо ширхэг: {item.quantity}</div>
                  <div className="text-sm font-semibold">
                    Нийт дүн: ₮{item.subtotal}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Close button */}
          <div className="mt-8 text-right">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#2F3A9A] text-white font-medium rounded-lg hover:bg-[#1d2678] transition"
            >
              Хаах
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderDetailModal;
