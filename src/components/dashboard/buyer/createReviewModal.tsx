"use client";
import { useState } from "react";
import { createReview } from "@/services/reviewService";
import { toast } from "react-toastify";
import { Product } from "@/types/types";

export default function ReviewModal({
  productId,
  onClose,
}: {
  productId: number;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      await createReview({
        product: productId,
        rating,
        comment,
      });
      toast.success("Сэтгэгдэл амжилттай илгээгдлээ!");
      onClose();
    } catch (err) {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-blue-900">Сэтгэгдэл үлдээх</h2>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">Үнэлгээ (1-5):</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 w-full rounded"
          />

          <label className="block text-sm font-semibold">Тайлбар:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full rounded resize-none"
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Болих
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded"
          >
            Илгээх
          </button>
        </div>
      </div>
    </div>
  );
}
