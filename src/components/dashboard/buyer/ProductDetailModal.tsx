import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/types";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border-4 border-blue-900 text-black flex overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-2xl hover:text-red-500 z-10"
        >
          ✕
        </button>

        {/* Product Image Section */}
        <div className="w-1/2 bg-gray-50 p-6 flex items-center justify-center border-r border-blue-900">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[500px] object-contain rounded-xl border border-gray-300"
            />
          ) : (
            <div className="text-gray-400 text-center">Зураг байхгүй</div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            {product.discount_price ? (
              <div className="mb-2">
                <p className="text-yellow-500 text-xl font-bold">
                  ₮{product.discount_price.toLocaleString()}
                </p>
                <p className="text-gray-400 line-through">
                  ₮{product.price.toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-yellow-500 text-xl font-bold mb-2">
                ₮{product.price.toLocaleString()}
              </p>
            )}
            <p className="text-sm text-gray-600 mb-4">
              Үлдэгдэл: {product.stock} ширхэг
            </p>
            <p className="text-base text-gray-700 mb-6 whitespace-pre-line">
              {product.description}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mb-4">
              <p className="text-sm font-medium">Тоо:</p>
              <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-lg font-bold px-2 text-blue-900"
                >
                  −
                </button>
                <span className="w-6 text-center">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(q + 1, product.stock))
                  }
                  className="text-lg font-bold px-2 text-blue-900"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg w-full font-semibold"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Сагсанд нэмэх
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-lg w-full font-semibold"
            >
              Болих
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
