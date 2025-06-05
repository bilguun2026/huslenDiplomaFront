import axiosInstance from "@/lib/api";
import { Review, ReviewPost } from "@/types/types";
export const getSellerReviews = async (): Promise<Review[]> => {
  const res = await axiosInstance.get<{ results: Review[] }>("/reviews/");
  return res.data.results;
};

export const getBuyerReviews = async (): Promise<Review[]> => {
  const res = await axiosInstance.get<{ results: Review[] }>("/reviews/");
  return res.data.results;
};

export const createReview = async (review: Omit<ReviewPost, "id">) => {
  const res = await axiosInstance.post<ReviewPost>("/reviews/", review);
  return res.data;
};
