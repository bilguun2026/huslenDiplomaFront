"use client";
import { Dialog } from "@headlessui/react";
import { Product } from "@/types/types";

type Props = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      {/* Transparent dark overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="bg-white border-4 border-[#2F3A9A] p-6 rounded-xl shadow-2xl max-w-2xl w-full relative animate-fade-in">
          <Dialog.Title className="text-2xl font-bold text-[#2F3A9A] mb-6">
            🛒 Бүтээгдэхүүний дэлгэрэнгүй
          </Dialog.Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
            {/* Optional image preview */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg border p-4">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-56 object-contain rounded"
                />
              ) : (
                <span className="text-gray-400 text-sm">Зураг байхгүй</span>
              )}
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Нэр:</span>{" "}
                {product.name}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Үнэ:</span> ₮
                {product.price}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Үлдэгдэл:</span>{" "}
                {product.stock} ш
              </div>

              <div>
                <span className="font-semibold text-gray-700">Огноо:</span>{" "}
                {new Date(product.created_at).toLocaleString()}
              </div>
              {product.description && (
                <div>
                  <span className="font-semibold text-gray-700">Тайлбар:</span>
                  <p className="text-gray-600 mt-1 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border text-gray-600 border-gray-600 hover:bg-gray-100 transition"
            >
              Хаах
            </button>
            <button
              onClick={() =>
                (window.location.href = `/dashboard/seller/products/${product.id}/edit`)
              }
              className="px-4 py-2 bg-[#2F3A9A] text-white font-medium rounded-md hover:bg-[#1d2678] transition"
            >
              Засах
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
