import axiosInstance from "@/lib/api";
import { FullProfile } from "@/types/types";
export const getSellers = async (): Promise<FullProfile[]> => {
  const res = await axiosInstance.get<{ results: FullProfile[] }>("sellers/");
  return res.data.results;
};
