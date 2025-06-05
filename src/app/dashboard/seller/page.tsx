"use client";

import React from "react";
import { useProducts } from "@/hooks/useProducts";
import { useSellerOrders } from "@/hooks/useOrders";
import { useSellerReviews } from "@/hooks/useReview";
import Link from "next/link";
import {
  CubeIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

export default function SellerDashboardPage() {
  const { data: products } = useProducts();
  const { data: orders } = useSellerOrders();
  const { data: reviews } = useSellerReviews();

  return (
    <div className="p-6 space-y-6 text-black animate-fade-in">
      <h1 className="text-3xl font-extrabold text-[#2F3A9A]">
        Худалдагчийн Хяналтын Самбар 🚀
      </h1>

      {/* 🔷 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Бараа"
          value={products?.length ?? 0}
          link="/dashboard/seller/products"
          icon={<CubeIcon className="h-8 w-8 text-indigo-600" />}
          gradient="from-indigo-100 via-indigo-50 to-white"
        />
        <DashboardCard
          title="Захиалга"
          value={orders?.length ?? 0}
          link="/dashboard/seller/orders"
          icon={
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-yellow-600" />
          }
          gradient="from-yellow-100 via-yellow-50 to-white"
        />
        <DashboardCard
          title="Сэтгэгдэл"
          value={reviews?.length ?? 0}
          link="/dashboard/seller/reviews"
          icon={<ChatBubbleLeftRightIcon className="h-8 w-8 text-green-600" />}
          gradient="from-green-100 via-green-50 to-white"
        />
      </div>

      {/* 🧾 Latest Orders */}
      <div className="bg-white border-l-4 border-[#2F3A9A] shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#2F3A9A] mb-4">
          🧾 Сүүлийн захиалгууд
        </h2>
        <ul className="divide-y text-sm">
          {(orders?.slice(0, 5) || []).map((order) => (
            <li key={order.id} className="py-2">
              <div>
                <b>Захиалга #{order.id}</b> — ₮{order.total_price} (
                {order.status})
              </div>
              <div className="text-xs text-gray-500">
                {new Date(order.created_at).toLocaleString()}
              </div>
            </li>
          ))}
          {orders?.length === 0 && (
            <li className="py-2 text-gray-400 italic">
              Захиалга байхгүй байна.
            </li>
          )}
        </ul>
      </div>

      {/* 💬 Latest Reviews */}
      <div className="bg-white border-l-4 border-[#2F3A9A] shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#2F3A9A] mb-4">
          💬 Сүүлийн сэтгэгдлүүд
        </h2>
        <ul className="divide-y text-sm">
          {(reviews?.slice(0, 5) || []).map((review) => (
            <li key={review.id} className="py-2">
              <div className="flex justify-between">
                <b>{review.product.name}</b>
                <span className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {review.comment || "Сэтгэгдэл байхгүй"}
              </div>
            </li>
          ))}
          {reviews?.length === 0 && (
            <li className="py-2 text-gray-400 italic">
              Сэтгэгдэл байхгүй байна.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  value: number;
  link: string;
  icon: React.ReactNode;
  gradient: string;
};

function DashboardCard({
  title,
  value,
  link,
  icon,
  gradient,
}: DashboardCardProps) {
  return (
    <Link href={link}>
      <div
        className={`p-6 rounded-lg border-2 border-[#2F3A9A] bg-gradient-to-br ${gradient} shadow hover:shadow-xl transition-all duration-300 cursor-pointer`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-gray-700 text-lg font-semibold">{title}</div>
          {icon}
        </div>
        <div className="text-3xl font-bold text-[#2F3A9A]">{value}</div>
      </div>
    </Link>
  );
}
