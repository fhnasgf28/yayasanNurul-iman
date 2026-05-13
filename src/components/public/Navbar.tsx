"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Masjid", href: "/programs?category=Masjid" },
  { name: "DTA", href: "/programs?category=Pendidikan" },
  { name: "Berita", href: "/news" },
  { name: "Galeri", href: "/gallery" },
  { name: "Kontak", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed left-0 right-0 z-50 hidden transition-all duration-500 ease-in-out md:block",
          scrolled 
            ? "top-4 mx-auto max-w-6xl w-[95%] rounded-full glass shadow-2xl py-2 px-8 border border-white/20" 
            : "top-0 w-full py-5 px-10 bg-transparent"
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-lg"
            >
              🕌
            </motion.div>
            <span className={cn(
              "text-2xl font-serif font-bold transition-colors duration-300",
              scrolled ? "text-primary" : "text-white"
            )}>
              Nurul Iman
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 relative group",
                  scrolled ? "text-primary hover:text-secondary" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
            <div className="ml-4">
              <Link
                href="/donate"
                className="bg-secondary text-primary px-8 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all shadow-lg active:scale-95"
              >
                Donasi
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
