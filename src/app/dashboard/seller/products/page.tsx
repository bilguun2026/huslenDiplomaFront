"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import ProductCard from "@/components//dashboard/productCard";

export default function ProductListPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const { data: products, isLoading } = useProducts(selectedCategory);
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  return (
    <div className="p-6 text-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Бүтээгдэхүүн</h1>
        <button
          onClick={() => router.push("/dashboard/seller/products/create")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          + Шинэ бараа
        </button>
      </div>

      <div className="flex gap-4 mb-6 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory(undefined)}
          className={`px-4 py-2 border rounded ${
            selectedCategory === undefined
              ? "bg-indigo-500 text-white"
              : "bg-white"
          }`}
        >
          Бүгд
        </button>
        {categories?.results.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 border rounded ${
              selectedCategory === cat.id
                ? "bg-indigo-500 text-white"
                : "bg-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div>Түр хүлээнэ үү...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
