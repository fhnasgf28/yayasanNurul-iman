import type { Metadata } from "next";
import { BookMarked, Wifi } from "lucide-react";
import HadithReader from "@/components/public/HadithReader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hadits Shahih",
  description:
    "Baca Hadits Shahih dari kitab Bukhari, Muslim, Abu Dawud, Tirmidzi, Nasai, Ibnu Majah, dan Muwatta Malik dalam Bahasa Indonesia. Disediakan oleh Yayasan Nurul Iman.",
  path: "/masjid/hadits",
});

export default function HaditsPage() {
  return (
    <main className="pt-20 min-h-screen bg-[#FDFAF4]">
      {/* Page Header */}
      <section className="bg-primary py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-secondary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            <BookMarked size={12} />
            Yayasan Nurul Iman
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
            Hadits Shahih
          </h1>
          <p className="font-arabic text-2xl text-secondary/80 leading-loose">
            إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
          </p>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Baca dan renungi hadits Nabi ﷺ dari 7 kitab hadits utama dengan
            terjemahan Bahasa Indonesia. Jadikan hadits sebagai panduan hidup
            sehari-hari.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs pt-2">
            <Wifi size={12} />
            <span>Membutuhkan koneksi internet • Data dari fawazahmed0/hadith-api</span>
          </div>
        </div>
      </section>

      {/* Reader */}
      <section className="py-8 px-4">
        <HadithReader />
      </section>
    </main>
  );
}
