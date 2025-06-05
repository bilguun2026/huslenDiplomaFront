// app/dashboard/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function DashboardRedirect() {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && user) {
      console.log("User data:", user);
      if (user.is_seller) router.replace("/dashboard/seller");
      else if (user.is_buyer) router.replace("/dashboard/buyer");
    }
  }, [user, isLoading, router]);

  return <p className="text-center p-4">Түр хүлээнэ үү...</p>;
}
