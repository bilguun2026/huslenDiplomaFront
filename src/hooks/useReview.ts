import { useQuery } from "@tanstack/react-query";
import { getBuyerReviews, getSellerReviews } from "@/services/reviewService";
import { Review } from "@/types/types";

export const useSellerReviews = () => {
  return useQuery<Review[]>({
    queryKey: ["seller-reviews"],
    queryFn: getSellerReviews,
  });
};

export const useBuyerReviews = () => {
  return useQuery<Review[]>({
    queryKey: ["buyer-reviews"],
    queryFn: getBuyerReviews,
  });
};
