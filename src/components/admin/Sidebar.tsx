"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "Kelola Program", href: "/dashboard/programs", icon: BookOpen },
  { name: "Kelola Berita", href: "/dashboard/news", icon: Newspaper },
  { name: "Kelola Prestasi", href: "/dashboard/prestasi", icon: Award },
  { name: "Kelola Galeri", href: "/dashboard/gallery", icon: ImageIcon },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (item: typeof menuItems[0]) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <aside
      className={cn(
        "bg-primary text-white flex flex-col transition-all duration-300 shrink-0",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-5 flex items-center justify-between border-b border-white/10">
        {!isCollapsed && (
          <div>
            <span className="text-lg font-serif font-bold text-secondary">Nurul Iman</span>
            <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-0.5">Admin Panel</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-6 space-y-1 px-3">
        {menuItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-xl transition-all duration-150",
                active
                  ? "bg-secondary/20 text-secondary border border-secondary/30"
                  : "hover:bg-white/8 text-white/60 hover:text-white border border-transparent"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon size={20} className={cn("shrink-0", active ? "text-secondary" : "")} />
              {!isCollapsed && (
                <span className="text-sm font-semibold">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={cn(
            "flex items-center space-x-3 text-white/50 hover:text-white/90 transition-colors w-full p-3 rounded-xl hover:bg-white/8",
            isCollapsed && "justify-center"
          )}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut size={18} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
