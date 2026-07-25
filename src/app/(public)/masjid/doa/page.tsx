import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import DoaReader from "@/components/public/DoaReader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kumpulan Doa Harian & Setelah Shalat",
  description:
    "Kumpulan doa harian, doa setelah shalat fardhu, doa selamat, doa orang tua, dan doa perjalanan lengkap dengan teks Arab, latin, terjemahan, serta audio dari Yayasan Nurul Iman.",
  path: "/masjid/doa",
});

export default function DoaPage() {
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
            Kumpulan Doa Harian & Shalat
          </h1>
          <p className="font-arabic text-2xl md:text-3xl text-secondary/90 leading-loose">
            وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ
          </p>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            &quot;Dan Rabbmu berfirman: Berdoalah kepada-Ku, niscaya akan Kuperkenankan bagimu.&quot; (QS. Ghafir: 60). Lengkapi amalan harian Anda dengan kumpulan doa-doa maqbul.
          </p>
        </div>
      </section>

      {/* Reader Component */}
      <section>
        <DoaReader />
      </section>
    </main>
  );
}
