"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Quote, Sparkles } from "lucide-react";
import type { AyahData } from "./quran-api";

export default function DailyVerseClient({ ayah }: { ayah: AyahData }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={ref}
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-islamic opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Glowing orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center space-y-4 mb-14"
        >
          <span className="inline-flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-xs bg-secondary/10 px-5 py-2.5 rounded-full border border-secondary/20">
            <BookOpen size={13} />
            Ayat Pilihan Hari Ini
            <Sparkles size={13} />
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">
            Tadabbur Qur&apos;an Harian
          </h2>
          <p className="text-sm text-gray-500 font-sans">
            Renungi firman Allah sebagai panduan hidup kita hari ini
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-[3rem] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(26,77,46,0.08) 0%, transparent 50%, rgba(201,168,76,0.06) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {/* Top gradient stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-70" />

          <div className="p-8 md:p-14">
            {/* Quote icon */}
            <div className="absolute top-10 left-10 text-secondary/10">
              <Quote size={72} className="rotate-180" />
            </div>
            <div className="absolute bottom-10 right-10 text-secondary/10">
              <Quote size={72} />
            </div>

            <div className="space-y-10 relative z-10">
              {/* Arabic text */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="text-right text-2xl md:text-4xl font-semibold leading-[2.2] text-primary tracking-wide select-all font-arabic"
              >
                {ayah.text}
              </motion.p>

              {/* Elegant divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex justify-center items-center gap-4"
              >
                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-secondary/40" />
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
                </div>
                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-secondary/40" />
              </motion.div>

              {/* Translation */}
              <motion.blockquote
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="text-center text-base md:text-xl text-gray-600 italic leading-relaxed max-w-3xl mx-auto font-sans"
                style={{ color: "var(--text-muted)" }}
              >
                &ldquo;{ayah.translation}&rdquo;
              </motion.blockquote>

              {/* Reference badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex justify-center"
              >
                <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/10 px-6 py-3 rounded-2xl">
                  <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                    <BookOpen size={12} className="text-white" />
                  </div>
                  <p className="text-sm font-bold text-primary font-serif tracking-wider">
                    QS. {ayah.surah} : {ayah.ayahNumber}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-8 text-xs text-gray-400 font-sans tracking-wider uppercase"
        >
          ✨ Ayat berganti setiap hari — tadabbur & renungkan maknanya
        </motion.p>
      </div>
    </section>
  );
}
