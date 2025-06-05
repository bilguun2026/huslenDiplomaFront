"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const sellerLinks = [
  { label: "📊 Хяналтын самбар", href: "/dashboard/seller" },
  { label: "📦 Бараа", href: "/dashboard/seller/products" },
  { label: "🧾 Захиалга", href: "/dashboard/seller/orders" },
  { label: "👤 Профайл", href: "/dashboard/seller/profile" },
  { label: "📞 Сэтгэгдэл", href: "/dashboard/seller/reviews" },
];

export default function SellerSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    if (confirm("Та гарахдаа итгэлтэй байна уу?")) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#2F3A9A] flex flex-col justify-between sticky top-0">
      {/* Top Section */}
      <div>
        <div className="p-5 text-2xl font-bold text-[#2F3A9A] border-b border-[#2F3A9A]">
          Холбоотон
        </div>

        <nav className="p-4 space-y-2">
          {sellerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-md transition-all duration-200 ${
                pathname === link.href
                  ? "bg-[#2F3A9A] text-white font-semibold shadow-inner"
                  : "hover:bg-[#F0F2FF] text-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
        >
          🚪 Гарах
        </button>
        <div className="text-center text-sm text-gray-400 mt-4 border-t pt-2">
          © {new Date().getFullYear()} Таны Дэлгүүр
        </div>
      </div>
    </aside>
  );
}
