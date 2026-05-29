"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like Zoom */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1542714599-423730594498?q=80&w=2070&auto=format&fit=crop"
          alt="Masjid Nurul Iman"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/95" />
      </motion.div>

      {/* Modern Light Patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/30 rounded-full blur-[120px]" />
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 bg-islamic scale-150" />

      {/* Content Container */}
      <div className="relative z-20 text-center px-6 max-w-5xl mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Penerimaan Santri DTA Baru</span>
          </div>
          
          <p className="font-arabic text-3xl md:text-5xl text-secondary mb-4 drop-shadow-sm">
            وَأَنَّ الْمَسَاجِدَ لِلَّهِ
          </p>
          <p className="text-white/60 text-[10px] md:text-xs italic tracking-widest max-w-md mx-auto leading-relaxed">
            "Dan sesungguhnya masjid-masjid itu adalah milik Allah..." (QS. Al-Jin: 18)
          </p>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.1]"
        >
          Cahaya Islam di <br className="hidden md:block" />
          <span className="text-secondary italic">Nurul Iman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-sans"
        >
          Bersama kita memakmurkan baitullah dan membimbing generasi muda menjadi pribadi beradab serta mencintai Al-Qur'an.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/donate"
            className="w-full sm:w-auto bg-secondary text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(201,168,76,0.3)] flex items-center justify-center space-x-2"
          >
            <Heart size={20} className="fill-current" />
            <span>Infaq Sekarang</span>
          </Link>
          <Link
            href="/programs"
            className="w-full sm:w-auto bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center group"
          >
            <span>Jelajahi Program</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Floating Stats or features for Desktop */}
      <div className="hidden lg:block absolute bottom-12 left-12 z-20">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary font-bold text-xl">01</div>
            <div>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Fokus Utama</p>
              <p className="text-white font-bold text-sm">Kemakmuran Masjid</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 border-t border-white/10 pt-4">
            <div className="w-12 h-12 bg-primary/40 rounded-2xl flex items-center justify-center text-white font-bold text-xl">02</div>
            <div>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Pendidikan</p>
              <p className="text-white font-bold text-sm">DTA Berprestasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 translate-y-[1px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-light">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity="0.5" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5V0Z" />
        </svg>
      </div>
    </section>
  );
}
