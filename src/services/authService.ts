// api/authService.ts

import axiosInstance from "@/lib/api";

export interface LoginData {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  is_seller: boolean;
  is_buyer: boolean;
}

export const signup = async (data: SignupData): Promise<void> => {
  await axiosInstance.post("/register/", data); // Adjust endpoint to match your Django view
};

export const login = async (credentials: LoginData): Promise<void> => {
  const response = await axiosInstance.post("/token/", credentials);
  const { access, refresh } = response.data;
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};
