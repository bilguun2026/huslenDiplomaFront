"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sellerLinks = [
  { label: "Хяналтын самбар", href: "/dashboard/seller" },
  { label: "Бараа", href: "/dashboard/seller/products" },
  { label: "Захиалга", href: "/dashboard/seller/orders" },
  { label: "Профайл", href: "/dashboard/seller/profile" },
  { label: "Тусламж", href: "/dashboard/seller/help" },
];

export default function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white h-screen shadow-lg sticky top-0 text-gray-700">
      <div className="p-4 text-xl font-bold border-b">Худалдагч</div>
      <nav className="p-4 space-y-2">
        {sellerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded ${
              pathname === link.href
                ? "bg-indigo-200 font-semibold"
                : "hover:bg-indigo-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
        onClick={() => {
          localStorage.removeItem("token"); // Clear token from local storage
          window.location.href = "/login"; // Redirect to home page
        }}
      >
        Гарах
      </button>
      <div className="p-4 mt-auto text-sm text-gray-500 sticky bottom-0 border-t">
        © {new Date().getFullYear()} Таны Дэлгүүр
      </div>
    </aside>
  );
}
