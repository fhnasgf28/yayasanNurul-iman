"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Award,
  UserPlus,
  HandCoins,
  X,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "Kelola Program", href: "/dashboard/programs", icon: BookOpen },
  { name: "Kelola Berita", href: "/dashboard/news", icon: Newspaper },
  { name: "Kelola Prestasi", href: "/dashboard/prestasi", icon: Award },
  { name: "Kelola Galeri", href: "/dashboard/gallery", icon: ImageIcon },
  { name: "Pendaftaran Siswa", href: "/dashboard/registrations", icon: UserPlus },
  { name: "Laporan Donasi", href: "/dashboard/donation-reports", icon: HandCoins },
  { name: "Pesan Masuk", href: "/dashboard/messages", icon: Mail },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

type SidebarProps = {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
};

export default function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (item: typeof menuItems[0]) =>
    item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <>
      <button
        type="button"
        aria-label="Tutup menu admin"
        onClick={onMobileClose}
        className={cn(
          "fixed inset-0 z-[60] bg-primary/45 backdrop-blur-sm transition-opacity md:hidden",
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[70] flex w-[min(84vw,20rem)] shrink-0 flex-col bg-primary text-white shadow-2xl transition-all duration-300 md:sticky md:top-0 md:z-auto md:h-dvh md:translate-x-0 md:shadow-none",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "md:w-20" : "md:w-64"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          {!isCollapsed && (
            <div className="min-w-0">
              <span className="block truncate text-lg font-serif font-bold text-secondary">Nurul Iman</span>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40">Admin Panel</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto hidden rounded-xl p-2 transition-colors hover:bg-white/10 md:block"
            aria-label={isCollapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            type="button"
            onClick={onMobileClose}
            className="ml-auto rounded-xl p-2 transition-colors hover:bg-white/10 md:hidden"
            aria-label="Tutup menu admin"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {menuItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center space-x-3 rounded-2xl border p-3 transition-all duration-150",
                  active
                    ? "border-secondary/30 bg-secondary/20 text-secondary"
                    : "border-transparent text-white/62 hover:bg-white/8 hover:text-white"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon size={20} className={cn("shrink-0", active ? "text-secondary" : "")} />
                <span className={cn("text-sm font-semibold md:inline", isCollapsed && "md:hidden")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={cn(
              "flex w-full items-center space-x-3 rounded-2xl p-3 text-white/55 transition-colors hover:bg-white/8 hover:text-white/90",
              isCollapsed && "md:justify-center"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            <span className={cn("text-sm font-semibold md:inline", isCollapsed && "md:hidden")}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
