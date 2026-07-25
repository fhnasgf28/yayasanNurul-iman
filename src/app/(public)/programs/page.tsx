import type { Metadata } from "next";
import { Layers } from "lucide-react";
import ProgramsExplorer from "@/components/public/ProgramsExplorer";
import { getPrograms } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Program Khidmah & Kegiatan Yayasan Nurul Iman",
  description:
    "Jelajahi program kemakmuran masjid, pendidikan DTA & Tahfidz Al-Qur'an, beasiswa santri yatim/dhuafa, serta kegiatan sosial Yayasan Nurul Iman.",
  path: "/programs",
});

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allPrograms = await getPrograms();

  return (
    <main className="pt-20 min-h-screen bg-[#FDFAF4]">
      {/* Page Header Banner */}
      <section className="bg-primary py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-secondary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            <Layers size={14} />
            Yayasan Nurul Iman
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
            Program Khidmah Umat
          </h1>
          <p className="font-arabic text-2xl md:text-3xl text-secondary/90 leading-loose">
            وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ
          </p>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            &quot;Dan berbuat baiklah, karena sesungguhnya Allah menyukai orang-orang yang berbuat baik.&quot; (QS. Al-Baqarah: 195).
          </p>
        </div>
      </section>

      {/* Interactive Explorer Component */}
      <ProgramsExplorer
        initialPrograms={allPrograms}
        initialCategory={category || "Semua"}
      />
    </main>
  );
}
