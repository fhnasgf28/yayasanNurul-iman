"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542714599-423730594498?q=80&w=2070&auto=format&fit=crop"
          alt="Masjid Nurul Iman"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10 bg-islamic" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="font-arabic text-2xl md:text-3xl text-secondary mb-2">
            وَأَنَّ الْمَسَاجِدَ لِلَّهِ فَلَا تَدْعُوا مَعَ اللَّهِ أَحَدًا
          </p>
          <p className="text-white/60 text-xs md:text-sm italic">
            "Dan sesungguhnya masjid-masjid itu adalah milik Allah, maka janganlah kamu menyembah seorang pun di dalamnya selain Allah." (QS. Al-Jin: 18)
          </p>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
        >
          Menerangi Umat, Membentuk <span className="text-secondary">Generasi Qur'ani</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Yayasan Nurul Iman hadir untuk memakmurkan Masjid Nurul Iman dan membina anak-anak menjadi generasi yang cinta Al-Qur'an melalui program DTA (Diniyah Takmiliyah Awaliyah).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/donate"
            className="w-full sm:w-auto bg-secondary text-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
          >
            Dukung Kami
          </Link>
          <Link
            href="/programs"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
          >
            Lihat Program
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest mb-2">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
      </motion.div>
    </section>
  );
}
