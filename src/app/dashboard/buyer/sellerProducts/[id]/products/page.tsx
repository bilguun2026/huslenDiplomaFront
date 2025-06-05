// app/buyer/sellers/[id]/products/page.tsx
"use client";

import {
  ShoppingCartIcon,
  InformationCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useSellerProducts } from "@/hooks/useSellers";
import { Product } from "@/types/types";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import ProductDetailModal from "@/components/dashboard/buyer/ProductDetailModal";
import ReviewModal from "@/components/dashboard/buyer/createReviewModal";

export default function SellerProductsPage() {
  const { id } = useParams();
  const sellerId = Number(id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products, isLoading, isFetching } = useSellerProducts(sellerId);

  return (
    <div className="p-8 bg-neutral-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-8">
        Худалдагчийн бараанууд
      </h1>

      {isLoading || isFetching ? (
        <p className="text-center text-lg">Бараануудыг ачааллаж байна...</p>
      ) : products?.length === 0 ? (
        <p className="text-center text-lg text-red-600">
          Энэ худалдагч одоогоор бараа оруулаагүй байна.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products?.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetail={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
function ProductCard({
  product,
  onDetail,
}: {
  product: Product;
  onDetail: () => void;
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openReview, setOpenReview] = useState(false);

  const isOnSale =
    product.discount_price !== null &&
    product.discount_price !== undefined &&
    product.discount_price < product.price;

  const handleAdd = () => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity);
    } else {
      alert("Буруу тоо оруулсан байна!");
    }
  };

  return (
    <div className="bg-white border-2 border-blue-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
      {/* Image */}
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain bg-white border-b border-blue-100"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100 border-b border-blue-100 text-gray-400">
          Зураг байхгүй
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-lg font-bold text-black mb-2">{product.name}</h4>

        {/* Price + Stock + Quantity */}
        <div className="grid grid-cols-2 gap-4 items-start mb-4">
          {/* Price */}
          <div>
            {isOnSale ? (
              <>
                <p className="text-sm text-gray-500 line-through">
                  ₮{product.price.toLocaleString()}
                </p>
                <p className="text-md font-bold text-green-600">
                  ₮{product.discount_price?.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-md font-semibold text-yellow-500">
                ₮{product.price.toLocaleString()}
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Үлдэгдэл: {product.stock} ширхэг
            </p>
          </div>

          {/* Quantity Selector full width */}
          <div className="col-span-2">
            <div className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-3 py-1 w-full max-w-[160px] mx-auto">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-lg font-bold text-blue-900 px-2"
              >
                −
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                className="text-lg font-bold text-blue-900 px-2"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex justify-around items-center gap-4 py-2 border-t border-gray-100">
          <button
            onClick={handleAdd}
            title="Сагсанд нэмэх"
            aria-label="Сагсанд нэмэх"
            className="p-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
          >
            <ShoppingCartIcon className="w-6 h-6 text-yellow-500" />
          </button>

          <button
            onClick={onDetail}
            title="Дэлгэрэнгүй"
            aria-label="Дэлгэрэнгүй"
            className="p-2 rounded-full hover:bg-gray-300 transition"
          >
            <InformationCircleIcon className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={() => setOpenReview(true)}
            title="Сэтгэгдэл үлдээх"
            aria-label="Сэтгэгдэл үлдээх"
            className="p-2 rounded-full hover:bg-blue-100 transition"
          >
            <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-blue-900" />
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {openReview && (
        <ReviewModal
          productId={product.id}
          onClose={() => setOpenReview(false)}
        />
      )}
    </div>
  );
}
