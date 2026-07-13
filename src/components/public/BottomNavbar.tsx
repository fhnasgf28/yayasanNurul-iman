"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Circle,
  Clock3,
  House,
  Landmark,
  Menu,
  Newspaper,
  HandHeart,
  Image as ImageIcon,
  Mail,
  Info,
  UserPlus,
  WalletCards,
  LogIn,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

const primaryItems = [
  {
    label: "Beranda",
    href: "/",
    icon: House,
    isActive: (pathname: string) => pathname === "/",
  },
  {
    label: "Masjid",
    href: "/programs?category=Masjid",
    icon: Landmark,
    isActive: (pathname: string, category: string | null) =>
      pathname === "/programs" && category === "Masjid",
  },
  {
    label: "Berita",
    href: "/news",
    icon: Newspaper,
    isActive: (pathname: string) => pathname.startsWith("/news"),
  },
  {
    label: "Login",
    href: "/login",
    icon: LogIn,
    isActive: (pathname: string) => pathname.startsWith("/login"),
  },
];

const secondaryItems = [
  { label: "Tentang Kami", href: "/about", icon: Info },
  { label: "DTA", href: "/programs?category=Pendidikan", icon: BookOpen },
  { label: "Jadwal Sholat", href: "/jadwal-sholat", icon: Clock3 },
  { label: "Pendaftaran", href: "/pendaftaran-siswa", icon: UserPlus },
  { label: "Galeri", href: "/gallery", icon: ImageIcon },
  { label: "Kontak", href: "/contact", icon: Mail },
  { label: "Donasi", href: "/donate", icon: HandHeart },
  { label: "Laporan Donasi", href: "/donate/laporan-keuangan", icon: WalletCards },
];

export default function BottomNavbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mounted = useHydrated();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // searchParams hanya dibaca di client untuk menghindari hydration mismatch
  const category = mounted ? searchParams.get("category") : null;

  const isMoreRoute =
    ["/gallery", "/contact", "/donate", "/about", "/pendaftaran-siswa", "/jadwal-sholat"].some(
      (route) => pathname.startsWith(route)
    ) ||
    (pathname === "/programs" && category === "Pendidikan");

  return (
    <>
      {/* Sheet overlay "Lainnya" — hanya dirender di client setelah mount */}
      {mounted && (
        <AnimatePresence>
          {isMoreOpen && (
            <>
              <motion.button
                aria-label="Tutup menu lainnya"
                className="fixed inset-0 z-[70] bg-primary/20 backdrop-blur-[2px] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMoreOpen(false)}
              />
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="fixed inset-x-0 bottom-[88px] z-[80] mx-3 rounded-[30px] border border-white/40 bg-white/40 p-4 shadow-[0_24px_60px_rgba(26,77,46,0.18)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/30 md:hidden"
              >
                <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-secondary/30" />
                <div className="grid grid-cols-2 gap-3">
                  {secondaryItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className="flex flex-col items-center gap-2 rounded-2xl border border-white/50 bg-white/55 px-3 py-4 text-center shadow-[0_10px_30px_rgba(26,77,46,0.08)] transition-transform backdrop-blur-md active:scale-95"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/12 text-[#C8963E]">
                          <Icon size={20} />
                        </span>
                        <span className="text-xs font-semibold text-primary">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Bottom nav bar — dirender konsisten di server & client (tidak return null) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/35 bg-white/28 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-3 shadow-[0_-16px_40px_rgba(26,77,46,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/22 md:hidden"
      >
        <div className="flex w-full items-end justify-between gap-1 rounded-[28px] border border-white/35 bg-gradient-to-b from-white/18 to-white/8 px-1 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            // Sebelum mount, semua item non-active (default) agar server & client sama
            const active = mounted ? item.isActive(pathname, category) : false;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[22px] px-2 py-2.5 transition-all active:scale-95",
                  active && "bg-white/45 shadow-[0_8px_20px_rgba(26,77,46,0.08)] backdrop-blur-md"
                )}
              >
                <Circle
                  size={7}
                  className={cn(
                    "transition-colors",
                    active ? "fill-[#C8963E] text-[#C8963E]" : "fill-transparent text-transparent"
                  )}
                />
                <Icon size={20} className={active ? "text-[#C8963E]" : "text-gray-400"} />
                <span className={cn("text-[11px] font-semibold", active ? "text-[#C8963E]" : "text-gray-400")}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Tombol "Lainnya" */}
          <button
            type="button"
            onClick={() => mounted && setIsMoreOpen((prev) => !prev)}
            className={cn(
              "relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[22px] px-2 py-2.5 transition-all active:scale-95",
              mounted &&
                (isMoreOpen || isMoreRoute) &&
                "bg-white/45 shadow-[0_8px_20px_rgba(26,77,46,0.08)] backdrop-blur-md"
            )}
          >
            <Circle
              size={7}
              className={cn(
                "transition-colors",
                mounted && (isMoreOpen || isMoreRoute)
                  ? "fill-[#C8963E] text-[#C8963E]"
                  : "fill-transparent text-transparent"
              )}
            />
            <Menu
              size={20}
              className={
                mounted && (isMoreOpen || isMoreRoute) ? "text-[#C8963E]" : "text-gray-400"
              }
            />
            <span
              className={cn(
                "text-[11px] font-semibold",
                mounted && (isMoreOpen || isMoreRoute) ? "text-[#C8963E]" : "text-gray-400"
              )}
            >
              Lainnya
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
