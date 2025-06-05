"use client";

import { FullProfile } from "@/types/types";
import { useRouter } from "next/navigation";

type Props = {
  seller: FullProfile;
};

export default function SellerCard({ seller }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push(
          `/dashboard/buyer/sellerProducts/${seller.user.id}/products`
        )
      }
      className="flex-shrink-0 w-80 p-6 rounded-lg border border-gray-300 bg-white hover:border-blue-900 hover:shadow-lg transition-all duration-300 text-left"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {seller.user.profile_picture ? (
            <img
              src={seller.user.profile_picture}
              alt={seller.profile?.store_name || seller.user.username}
              className="w-20 h-20 rounded-full object-cover border border-blue-900"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-blue-900">
              {seller.user.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-black">
              {seller.profile?.store_name || seller.user.username}
            </h3>
            <p className="text-sm text-gray-600">@{seller.user.username}</p>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <strong>Имэйл:</strong> {seller.user.email || "—"}
          </p>
          <p>
            <strong>Утас:</strong> {seller.user.phone || "—"}
          </p>
          <p>
            <strong>Хаяг:</strong> {seller.user.address || "—"}
          </p>
          {seller.profile?.description && (
            <p className="pt-1 text-gray-700 text-sm line-clamp-3">
              <strong>Тайлбар:</strong> {seller.profile.description}
            </p>
          )}
          <p>
            <strong>Үнэлгээ:</strong>{" "}
            {seller.user.rating ? `${seller.user.rating}/5` : "—"}
          </p>
          <p>
            <strong>Банк:</strong> {seller.profile?.bank_account || "—"}
          </p>
          <p>
            <strong>Бүртгүүлсэн:</strong>{" "}
            {seller.profile?.created_at
              ? new Date(seller.profile.created_at).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </div>
    </button>
  );
}
