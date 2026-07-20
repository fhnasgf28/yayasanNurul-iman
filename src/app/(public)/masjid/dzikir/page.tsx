import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import DzikirReader from "@/components/public/DzikirReader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Dzikir Pagi & Sore",
  description:
    "Bacaan Dzikir Pagi dan Sore sesuai sunnah, dilengkapi dengan teks Arab, latin, terjemahan, dan counter hitungan. Disediakan oleh Yayasan Nurul Iman.",
  path: "/masjid/dzikir",
});

export default function DzikirPage() {
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
            Dzikir Pagi & Sore
          </h1>
          <p className="font-arabic text-2xl text-secondary/80 leading-loose">
            فَاذْكُرُونِي أَذْكُرْكُمْ
          </p>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            &quot;Maka ingatlah kepada-Ku, Aku pun akan ingat kepadamu.&quot; (QS. Al-Baqarah: 152). Rutinkan dzikir pagi dan sore untuk ketenangan hati.
          </p>
        </div>
      </section>

      {/* Reader */}
      <section>
        <DzikirReader />
      </section>
    </main>
  );
}
