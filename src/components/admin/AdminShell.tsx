"use client";

import { useState } from "react";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";

type AdminShellProps = {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
};

export default function AdminShell({ children, user }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-[#f6f7f3] md:flex">
      <Sidebar isMobileOpen={isSidebarOpen} onMobileClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <Header user={user} onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 pb-8 pt-4 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
