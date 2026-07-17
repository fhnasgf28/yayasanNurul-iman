import { getDailyAyah } from "./quran-api";
import { BookOpen, Quote } from "lucide-react";

export default async function DailyVerse() {
  const ayah = await getDailyAyah();

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-islamic opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-xs bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">
            <BookOpen size={14} />
            Ayat Pilihan Hari Ini
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Tadabbur Qur&apos;an Harian</h2>
        </div>

        <div className="relative bg-gradient-to-br from-primary/5 to-transparent border border-secondary/15 rounded-[3rem] p-8 md:p-12 shadow-sm">
          <div className="absolute top-8 left-8 text-secondary/15">
            <Quote size={56} className="rotate-180" />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Arabic script */}
            <p className="text-right text-2xl md:text-3xl font-semibold leading-loose text-primary tracking-wide select-all font-arabic pr-6 md:pr-10">
              {ayah.text}
            </p>

            {/* Divider */}
            <div className="flex justify-center items-center gap-3">
              <div className="h-[1px] w-12 bg-secondary/35" />
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <div className="h-[1px] w-12 bg-secondary/35" />
            </div>

            {/* Translation */}
            <blockquote className="text-center text-sm md:text-lg text-gray-600 italic leading-relaxed max-w-3xl mx-auto font-sans">
              &ldquo;{ayah.translation}&rdquo;
            </blockquote>

            {/* Reference */}
            <div className="text-center">
              <p className="text-xs md:text-sm font-bold text-primary font-serif uppercase tracking-wider">
                QS. {ayah.surah} : {ayah.ayahNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
