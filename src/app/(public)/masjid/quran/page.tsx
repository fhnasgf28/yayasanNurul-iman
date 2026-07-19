import type { Metadata } from "next";
import { BookOpen, Wifi } from "lucide-react";
import QuranReader from "@/components/public/QuranReader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Al-Qur'an Online",
  description:
    "Baca Al-Qur'an online lengkap dengan teks Arab, transliterasi latin, terjemahan Bahasa Indonesia, dan audio tilawah. Disediakan oleh Yayasan Nurul Iman.",
  path: "/masjid/quran",
});

export default function QuranPage() {
  return (
    <main className="pt-20 min-h-screen bg-[#FDFAF4]">
      {/* Page Header */}
      <section className="bg-primary py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-secondary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            <BookOpen size={12} />
            Yayasan Nurul Iman
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
            Al-Qur&apos;an Online
          </h1>
          <p className="font-arabic text-2xl text-secondary/80 leading-loose">
            اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
          </p>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Bacalah dengan nama Tuhanmu. 114 Surah lengkap dengan teks Arab,
            latin, terjemahan Indonesia, dan audio tilawah.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs pt-2">
            <Wifi size={12} />
            <span>Membutuhkan koneksi internet • Data dari equran.id</span>
          </div>
        </div>
      </section>

      {/* Reader */}
      <section className="py-8 px-4">
        <QuranReader />
      </section>
    </main>
  );
}
