import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import DTAPortal from "@/components/public/DTAPortal";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Informasi DTA, Kurikulum & Kalender Akademik",
  description:
    "Portal Resmi Diniyah Takmiliyah Awaliyah (DTA) Nurul Iman. Informasi Kurikulum 5 Mata Pelajaran, Target Hafalan Juz 30 Per Kelas, Kalender Akademik 2026/2027, Download Brosur Digital PDF, dan FAQ Orang Tua.",
  path: "/dta",
});

export default function DTAPage() {
  return (
    <main className="pt-20 min-h-screen bg-[#FDFAF4]">
      {/* Page Header */}
      <section className="bg-primary py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-secondary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            <GraduationCap size={14} />
            Diniyah Takmiliyah Awaliyah (DTA)
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
            Pendidikan & Karakter Islami Anak
          </h1>
          <p className="font-arabic text-2xl md:text-3xl text-secondary/90 leading-loose">
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </p>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            &quot;Sebaik-baik kalian adalah orang yang belajar Al-Qur&apos;an dan mengajarkannya.&quot; (HR. Bukhari). Membina santri berakhlak mulia, fasih membaca Al-Qur&apos;an, dan paham dasar ibadah.
          </p>
        </div>
      </section>

      {/* DTA Portal Component */}
      <section>
        <DTAPortal />
      </section>
    </main>
  );
}
