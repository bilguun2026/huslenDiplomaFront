// hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { login, LoginData } from "@/services/authService";

export const useAuth = () => {
  return useMutation({
    mutationFn: (credentials: LoginData) => login(credentials),
    onError: (error: any) => {
      console.error("Login failed:", error?.response?.data || error.message);
    },
  });
};
