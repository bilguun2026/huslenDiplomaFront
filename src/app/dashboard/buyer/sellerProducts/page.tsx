// app/buyer/sellers/page.tsx
"use client";

import { useSellers } from "@/hooks/useSellers";
import SellerCard from "@/components/dashboard/buyer/sellerCard";

export default function BuyerSellersPage() {
  const { data: sellers, isLoading } = useSellers();

  return (
    <div className="p-8 bg-neutral-100 min-h-screen text-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center border-b-4 border-blue-900 pb-4">
        Аж ахуйн нэгжүүд
      </h1>

      {isLoading ? (
        <p className="text-center text-lg">Ачааллаж байна...</p>
      ) : sellers?.length === 0 ? (
        <p className="text-center text-lg text-red-600">Худалдагч олдсонгүй.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {sellers?.map((seller) => (
            <SellerCard key={seller.user.id} seller={seller} />
          ))}
        </div>
      )}
    </div>
  );
}
