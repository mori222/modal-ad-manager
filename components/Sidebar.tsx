"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, BarChart3 } from "lucide-react";

const menuItems = [
  { name: "サイト管理", href: "/dashboard/sites", icon: <Home size={18} /> },
  { name: "バナー管理", href: "/dashboard/banners", icon: <LayoutDashboard size={18} /> },
  { name: "レポート", href: "/dashboard/reports", icon: <BarChart3 size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-200 w-64 min-h-screen py-12">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className={`flex items-center py-4 px-6 gap-2 text-gray-700 font-bold hover:bg-gray-200 transition hover:bg-emerald-600 hover:text-white ${
              pathname.startsWith(item.href) ? "bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white" : ""
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
