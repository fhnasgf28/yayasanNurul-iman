"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Bagaimana cara mendaftarkan santri baru di DTA Nurul Iman?",
    answer: "Pendaftaran santri baru dapat dilakukan dengan dua cara: Pertama, secara online langsung melalui website ini di menu 'Pendaftaran'. Kedua, dengan datang langsung ke sekretariat yayasan pada jam operasional (ba'da Maghrib) untuk mengisi formulir fisik dan menyerahkan berkas seperti fotokopi KK dan Akta Kelahiran."
  },
  {
    question: "Apa saja program unggulan yang ada di Yayasan Nurul Iman?",
    answer: "Program unggulan kami meliputi pembinaan DTA (Diniyah Takmiliyah Awaliyah) dengan target hafalan Juz 30 dan kemampuan adzan dalam 1 tahun, pengelolaan Masjid Nurul Iman sebagai pusat ibadah, serta berbagai kegiatan sosial masyarakat."
  },
  {
    question: "Bagaimana transparansi penyaluran donasi di yayasan ini?",
    answer: "Kami berkomitmen menjaga amanah donatur. Laporan keuangan dan dokumentasi penyaluran donasi dicatat secara rutin dan dapat ditanyakan langsung kepada pengurus di sekretariat. Kami juga menampilkan update kegiatan terbaru di halaman Berita website ini."
  },
  {
    question: "Di mana lokasi tepatnya Yayasan Nurul Iman?",
    answer: "Yayasan kami berlokasi di Karawang Barat, tepatnya di area Guro II. Anda dapat melihat peta lokasi interaktif dan petunjuk arah langsung di halaman Kontak website kami."
  },
  {
    question: "Apakah ada program khusus untuk anak yatim atau dhuafa?",
    answer: "Ya, kami memiliki program kepedulian bagi santri yatim dan dhuafa. Yayasan berupaya memberikan kemudahan akses pendidikan agama bagi mereka melalui dukungan dari para donatur."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 text-secondary font-bold tracking-widest uppercase text-xs bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">
            <HelpCircle size={14} />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Pertanyaan Sering Diajukan</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Temukan jawaban cepat untuk beberapa pertanyaan umum mengenai program, pendaftaran, dan kegiatan di Yayasan Nurul Iman.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={cn(
                  "border rounded-[2rem] transition-all duration-300",
                  isOpen 
                    ? "border-secondary/30 bg-accent/10 shadow-lg shadow-primary/5" 
                    : "border-secondary/10 bg-white hover:border-secondary/20"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                >
                  <span className={cn(
                    "text-lg md:text-xl font-bold transition-colors duration-300",
                    isOpen ? "text-primary" : "text-gray-700"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isOpen ? "bg-secondary text-primary rotate-180" : "bg-accent text-primary/50"
                  )}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 text-gray-500 leading-relaxed font-sans border-t border-secondary/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-6">Punya pertanyaan lain yang belum terjawab?</p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg"
          >
            Hubungi Kami Langsung
          </a>
        </div>
      </div>
    </section>
  );
}
