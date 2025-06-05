"use client";

import React, { useState } from "react";
import { useSellerReviews } from "@/hooks/useReview";
import ReviewDetailModal from "@/components/dashboard/seller/reviewDetailModal";
import { Review } from "@/types/types";

const SellerReviewsPage = () => {
  const { data: reviews, isLoading } = useSellerReviews();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full text-lg text-gray-600">
        Түр хүлээнэ үү...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-[#f8f9fc]">
      <h1 className="text-3xl font-bold mb-6 text-black border-b pb-2 border-[#2F3A9A]">
        Сэтгэгдлүүд
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews?.map((review) => (
          <div
            key={review.id}
            onClick={() => setSelectedReview(review)}
            className="cursor-pointer rounded-lg bg-white border border-[#e0e0e0] p-5 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="font-semibold text-lg text-[#2F3A9A] mb-1">
              {review.product.name}
            </div>
            <div className="text-sm text-gray-700">
              Худалдан авагч:{" "}
              <span className="font-medium text-black">
                {review.buyer?.username}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Үнэлгээ:{" "}
              <span className="text-yellow-500">
                {"⭐".repeat(review.rating)}
              </span>{" "}
              ({review.rating}/5)
            </div>
            {review.comment && (
              <p className="mt-2 text-gray-800 italic line-clamp-2">
                “{review.comment}”
              </p>
            )}
          </div>
        ))}
      </div>

      {selectedReview && (
        <ReviewDetailModal
          review={selectedReview}
          isOpen={!!selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </div>
  );
};

export default SellerReviewsPage;
