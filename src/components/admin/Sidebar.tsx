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
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Kelola Program", href: "/dashboard/programs", icon: BookOpen },
  { name: "Kelola Berita", href: "/dashboard/news", icon: Newspaper },
  { name: "Kelola Galeri", href: "/dashboard/gallery", icon: ImageIcon },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-primary text-white flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        {!isCollapsed && (
          <span className="text-xl font-serif font-bold text-accent">Admin CMS</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white/10 rounded"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg transition-colors",
              pathname === item.href
                ? "bg-accent text-white"
                : "hover:bg-white/5 text-white/70"
            )}
          >
            <item.icon size={20} className="shrink-0" />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/10">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors w-full p-3"
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
