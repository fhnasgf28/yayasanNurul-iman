"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DonationBanner() {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-primary py-16 px-8 md:px-16 text-center"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0 bg-islamic" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="font-arabic text-2xl md:text-3xl text-secondary mb-2">
              مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ
            </p>
            <p className="text-white/50 text-xs md:text-sm italic">
              "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai." (QS. Al-Baqarah: 261)
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Mari Bersama Memakmurkan Masjid & <span className="text-secondary">Mencerdaskan Santri</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Setiap donasi Anda adalah sedekah jariyah yang pahalanya terus mengalir. Yayasan Nurul Iman mengelola amanah Anda secara transparan dan tepat sasaran.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/donate"
              className="w-full sm:w-auto bg-secondary text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
            >
              Dukung Sekarang
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
