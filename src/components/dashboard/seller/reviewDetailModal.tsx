"use client";

import { Dialog } from "@headlessui/react";
import { Review } from "@/types/types";

type Props = {
  review: Review;
  isOpen: boolean;
  onClose: () => void;
};

const ReviewDetailModal = ({ review, isOpen, onClose }: Props) => {
  if (!review) return null;

  const createdDate = new Date(review.created_at).toLocaleString();

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      {/* Transparent blur background */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg bg-white border-2 border-[#2F3A9A] p-6 rounded-xl shadow-xl text-black">
          <Dialog.Title className="text-xl font-bold mb-4">
            Сэтгэгдлийн дэлгэрэнгүй
          </Dialog.Title>

          <div className="space-y-3 text-sm">
            <div>
              <b>Бүтээгдэхүүн:</b> {review.product.name}
            </div>
            <div>
              <b>Худалдан авагч:</b> {review.buyer?.username} (
              {review.buyer?.email})
            </div>
            <div>
              <b>Үнэлгээ:</b> {"⭐".repeat(review.rating)} ({review.rating}/5)
            </div>
            {review.comment && (
              <div>
                <b>Сэтгэгдэл:</b> {review.comment}
              </div>
            )}
            <div>
              <b>Огноо:</b> {createdDate}
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#2F3A9A] text-white rounded hover:bg-[#1d2678]"
            >
              Хаах
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewDetailModal;
