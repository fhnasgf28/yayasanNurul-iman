import type { Metadata } from "next";
import { BookText, Wifi } from "lucide-react";
import TafsirReader from "@/components/public/TafsirReader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tafsir Al-Qur'an Kemenag RI",
  description:
    "Baca Tafsir Al-Qur'an lengkap dari Kementerian Agama Republik Indonesia (Kemenag RI) per ayat. Disediakan oleh Yayasan Nurul Iman.",
  path: "/masjid/tafsir",
});

export default function TafsirPage() {
  return (
    <main className="pt-20 min-h-screen bg-[#FDFAF4]">
      {/* Page Header */}
      <section className="bg-primary py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-secondary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            <BookText size={12} />
            Yayasan Nurul Iman
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
            Tafsir Al-Qur&apos;an
          </h1>
          <p className="font-arabic text-2xl text-secondary/80 leading-loose">
            كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ
          </p>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Penjelasan dan kandungan makna ayat-ayat Al-Qur&apos;an berdasarkan Tafsir Kementerian Agama Republik Indonesia.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs pt-2">
            <Wifi size={12} />
            <span>Membutuhkan koneksi internet • Data dari Tafsir Kemenag RI</span>
          </div>
        </div>
      </section>

      {/* Reader */}
      <section className="py-8 px-4">
        <TafsirReader />
      </section>
    </main>
  );
}
