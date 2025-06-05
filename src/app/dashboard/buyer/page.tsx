"use client";

import { useBuyerOrders } from "@/hooks/useOrders";
import { useBuyerReviews } from "@/hooks/useReview";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Order } from "@/types/types";
export default function BuyerDashboardPage() {
  const { data: orders, isLoading: loadingOrders } = useBuyerOrders();
  const { data: reviews, isLoading: loadingReviews } = useBuyerReviews();
  const { data: user, isLoading } = useCurrentUser();

  function count(order: Order) {
    return order.id.toString();
  }

  return (
    <div className="p-6 text-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Миний Хяналтын Самбар
      </h1>

      {/* Profile Card */}
      <div className="bg-white border border-[#2F3A9A] rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold text-black mb-2">Профайл</h2>
        {isLoading ? (
          <p className="text-gray-500">Ачааллаж байна...</p>
        ) : (
          <div className="text-sm text-gray-800 space-y-1">
            <div>
              <b>Нэр:</b> {user?.username}
            </div>
            <div>
              <b>И-мэйл:</b> {user?.email}
            </div>
          </div>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <StatCard
          title="Захиалгын тоо"
          value={loadingOrders ? "..." : orders?.length ?? 0}
          color="indigo"
        />
        <StatCard
          title="Сэтгэгдэл бичсэн"
          value={loadingReviews ? "..." : reviews?.length ?? 0}
          color="yellow"
        />
      </div>

      {/* Recent Orders */}
      <OverviewCard
        title="Сүүлийн захиалгууд"
        items={
          loadingOrders
            ? []
            : orders
                ?.slice(0, 5)
                .map((order) => `#${order.id} - ₮${count(order)}`) ?? []
        }
        loading={loadingOrders}
      />

      {/* Recent Reviews */}
      <OverviewCard
        title="Сүүлийн сэтгэгдлүүд"
        items={
          loadingReviews
            ? []
            : reviews
                ?.slice(0, 5)
                .map((r) => `${r.product.name} - ${"⭐".repeat(r.rating)}`) ??
              []
        }
        loading={loadingReviews}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number | string;
  color: "indigo" | "yellow";
}) {
  const borderColors = {
    indigo: "border-[#2F3A9A]",
    yellow: "border-yellow-400",
  };
  const textColors = {
    indigo: "text-[#2F3A9A]",
    yellow: "text-yellow-500",
  };

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow border-t-4 ${borderColors[color]}`}
    >
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className={`text-2xl font-bold mt-2 ${textColors[color]}`}>
        {value}
      </div>
    </div>
  );
}

function OverviewCard({
  title,
  items,
  loading,
}: {
  title: string;
  items: string[];
  loading: boolean;
}) {
  return (
    <div className="bg-white border border-[#2F3A9A] rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold text-black mb-2">{title}</h2>
      {loading ? (
        <p className="text-gray-500 text-sm">Ачааллаж байна...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-sm">Мэдээлэл алга.</p>
      ) : (
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
