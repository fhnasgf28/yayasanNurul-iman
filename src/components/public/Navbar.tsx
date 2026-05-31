"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Beranda", href: "/" },
  {
    name: "Tentang Kami",
    href: "/about",
    dropdown: [
      { name: "Profil", href: "/about" },
      { name: "Galeri", href: "/gallery" },
      { name: "Kontak", href: "/contact" },
    ],
  },
  {
    name: "Masjid",
    href: "/programs?category=Masjid",
    dropdown: [
      { name: "Kemakmuran Masjid", href: "/programs?category=Masjid" },
      { name: "Jadwal Sholat", href: "/jadwal-sholat" },
      { name: "Donasi Masjid", href: "/donate" },
    ],
  },
  {
    name: "DTA",
    href: "/programs?category=Pendidikan",
    dropdown: [
      { name: "Program DTA", href: "/programs?category=Pendidikan" },
      { name: "Pendaftaran Siswa", href: "/pendaftaran-siswa" },
    ],
  },
  { name: "Berita", href: "/news" },
  {
    name: "Donasi",
    href: "/donate",
    dropdown: [
      { name: "Donasi & Infaq", href: "/donate" },
      { name: "Laporan Keuangan", href: "/donate/laporan-keuangan" },
    ],
  },
];

export default function Navbar() {
  const mounted = useHydrated();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const frame = requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const isHome = pathname === "/";
  
  // Gaya default untuk Server-Side Rendering & Initial Hydration
  const navStyle = !mounted ? "solid" : (scrolled ? "pill" : (isHome ? "transparent" : "solid"));

  // Render sederhana untuk menyeimbangkan Hydration
  // Kita pastikan strukturnya identik dengan versi interaktif
  return (
    <motion.nav
      initial={false}
      animate={{ y: 0 }}
      className={cn(
        "fixed left-0 right-0 z-50 hidden transition-all duration-500 ease-in-out md:block",
        navStyle === "pill" &&
          "top-4 mx-auto max-w-6xl w-[95%] rounded-full glass shadow-2xl py-2 px-8 border border-white/20",
        navStyle === "solid" &&
          "top-0 w-full py-4 px-10 bg-white/95 shadow-md border-b border-gray-100 backdrop-blur-sm",
        navStyle === "transparent" && "top-0 w-full py-5 px-10 bg-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-lg transition-transform duration-200 hover:rotate-12 hover:scale-110">
            🕌
          </div>
          <span
            className={cn(
              "text-2xl font-serif font-bold transition-colors duration-300",
              navStyle === "transparent" ? "text-white" : "text-primary"
            )}
          >
            Yayasan Nurul Iman
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => mounted && link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => mounted && setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <button
                  type="button"
                  className={cn(
                    "flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 group",
                    navStyle === "transparent"
                      ? "text-white/90 hover:text-white"
                      : "text-primary hover:text-secondary"
                  )}
                >
                  <span>{link.name}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      mounted && activeDropdown === link.name && "rotate-180"
                    )}
                  />
                  <span className="absolute bottom-1 left-4 right-8 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 relative group block",
                    navStyle === "transparent"
                      ? "text-white/90 hover:text-white"
                      : "text-primary hover:text-secondary"
                  )}
                >
                  {link.name}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              )}

              {/* Dropdown Menu - Hanya dirender setelah mounted untuk keamanan hydration */}
              <AnimatePresence>
                {mounted && link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "absolute top-full left-0 mt-2 w-48 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md overflow-hidden",
                      navStyle === "transparent" ? "bg-primary/90" : "bg-white/95"
                    )}
                  >
                    <div className="py-2">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block px-5 py-2.5 text-sm transition-colors",
                            navStyle === "transparent"
                              ? "text-white/90 hover:bg-white/10 hover:text-white"
                              : "text-primary hover:bg-secondary/10 hover:text-secondary"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
