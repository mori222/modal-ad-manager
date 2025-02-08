"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
        <Header />
        <div className="flex w-full">
            <Sidebar />
            <main className="bg-gray-50 flex-1">{children}</main>
        </div>
    </div>
  );
}