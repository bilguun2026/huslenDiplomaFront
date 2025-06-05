import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/types";
import { deleteOne } from "@/services/crudService";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteOne("products", product.id);
      setShowModal(false);
      router.refresh(); // Refresh the page after delete
    } catch (error) {
      console.error("Алдаа:", error);
      alert("Устгах үед алдаа гарлаа.");
    }
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded"
          />
        ) : (
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded text-gray-400">
            No Image
          </div>
        )}

        <h3 className="mt-3 font-bold text-lg text-black">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-2">
          {product.discount_price ? (
            <div className="flex gap-2 items-center">
              <span className="text-gray-500 line-through">
                {product.price}₮
              </span>
              <span className="text-indigo-600 font-semibold">
                {product.discount_price}₮
              </span>
            </div>
          ) : (
            <span className="text-indigo-600 font-semibold">
              {product.price}₮
            </span>
          )}
        </div>

        {/* Edit button */}
        <button
          onClick={() =>
            router.push(`/dashboard/seller/products/${product.id}/edit`)
          }
          className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-500 text-black text-xs px-3 py-1 rounded"
        >
          Засах
        </button>

        {/* Delete button */}
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
        >
          Устгах
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-4">
              Устгахдаа итгэлтэй байна уу?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Үгүй
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Тийм
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
