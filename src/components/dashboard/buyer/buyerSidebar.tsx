"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  QuestionMarkCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const buyerLinks = [
  {
    label: "Нүүр",
    href: "/dashboard/buyer",
    icon: <HomeIcon className="h-5 w-5 mr-2" />,
  },
  {
    label: "Худалдаа",
    href: "/dashboard/buyer/sellerProducts",
    icon: <ShoppingCartIcon className="h-5 w-5 mr-2" />,
  },
  {
    label: "Захиалгууд",
    href: "/dashboard/buyer/orders",
    icon: <ShoppingBagIcon className="h-5 w-5 mr-2" />,
  },
  {
    label: "Профайл",
    href: "/dashboard/buyer/profile",
    icon: <UserCircleIcon className="h-5 w-5 mr-2" />,
  },
  {
    label: "Сэтгэгдэл",
    href: "/dashboard/buyer/reviews",
    icon: <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 mr-2" />,
  },
];

export default function BuyerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white h-screen shadow-lg sticky top-0 flex flex-col text-gray-700">
      <div className="p-5 text-2xl font-extrabold border-b text-[#2F3A9A]">
        Худалдан авагч
      </div>
      <nav className="p-4 space-y-2 flex-1">
        {buyerLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center px-4 py-2 rounded transition-colors ${
              pathname === link.href
                ? "bg-[#2F3A9A]/20 text-[#2F3A9A] font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-2 border-t">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Гарах
        </button>
        <div className="text-xs text-gray-400 mt-4 text-center">
          © {new Date().getFullYear()} Дэлгүүрчдийн Хөрөнгө
        </div>
      </div>
    </aside>
  );
}
