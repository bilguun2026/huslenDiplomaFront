// hooks/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/api";

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
  is_seller: boolean;
  is_buyer: boolean;
  // add other fields as needed
}

export const useCurrentUser = () =>
  useQuery<CurrentUser>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/me/");
      console.log("Current User Data:", res.data); // Debugging line to check the response
      return res.data;
    },
  });
