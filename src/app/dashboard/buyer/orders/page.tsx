"use client";
import { useBuyerOrders } from "@/hooks/useOrders";
import { useCart } from "@/hooks/useCart";
import { createOrder } from "@/services/orderService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export default function BuyerOrdersPage() {
  const { data: orders, isLoading, refetch } = useBuyerOrders();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Сагс хоосон байна.");
      return;
    }

    try {
      await createOrder(
        cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        }))
      );
      toast.success("Захиалга амжилттай хийгдлээ!");
      clearCart();
      refetch();
    } catch (err) {
      toast.error("Захиалга хийхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="p-6 text-black max-w-5xl mx-auto space-y-12">
      <section>
        <h1 className="text-3xl font-bold mb-6 border-b pb-2 border-blue-900 text-blue-900">
          🧾 Миний Захиалгууд
        </h1>

        {isLoading ? (
          <div className="text-gray-500">Ачааллаж байна...</div>
        ) : orders?.length === 0 ? (
          <div className="text-gray-500">
            Та одоогоор ямар ч захиалга хийгээгүй байна.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-blue-900 rounded-2xl p-5 shadow-lg transition hover:shadow-xl"
              >
                <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                  <span>📦 Захиалга #{order.id}</span>
                  <span>🕒 {new Date(order.created_at).toLocaleString()}</span>
                </div>
                <div className="text-sm mb-3 font-medium">
                  🏷️ Төлөв:{" "}
                  <span className="text-blue-900">{order.status}</span>
                </div>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1 mb-3">
                  {order.order_items.map((item) => (
                    <li key={item.id}>
                      {item.product.name} — {item.quantity} ширхэг — ₮
                      {item.product.price}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-right text-lg font-semibold text-yellow-500">
                    Нийт: ₮{order.total_price}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setShowModal(true);
                    }}
                    className="mt-3 bg-blue-900 text-white text-sm px-4 py-2 rounded hover:bg-blue-800 transition"
                  >
                    💳 Төлбөр төлөх
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-blue-900 text-blue-900">
          🛒 Миний Сагс
        </h2>

        {cart.length === 0 ? (
          <div className="text-gray-500">Сагс хоосон байна.</div>
        ) : (
          <>
            <ul className="space-y-3 mb-6">
              {cart.map((item) => (
                <li
                  key={item.product.id}
                  className="bg-white border border-blue-900 rounded-xl p-4 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="font-semibold">{item.product.name}</div>
                    <div className="text-sm text-gray-600">
                      ширхэгийн үнэ: ₮{item.product.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.quantity} ширхэг
                    </div>
                    <div className="font-semibold text-yellow-600">
                      нийт: ₮{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={handlePlaceOrder}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow transition duration-300"
            >
              ✅ Захиалга хийх
            </button>
          </>
        )}
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">💳 Төлбөр төлөх</h2>
            <p className="text-gray-600">Тун удахгүй...</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded"
            >
              Хаах
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
