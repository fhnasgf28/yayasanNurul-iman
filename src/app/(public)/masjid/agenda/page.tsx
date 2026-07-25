import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import AgendaHijri from "@/components/public/AgendaHijri";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kalender Hijriah & Agenda Kegiatan Masjid",
  description:
    "Jadwal agenda kegiatan rutin Masjid Nurul Iman, pengajian, kajian Subuh, santunan anak yatim, serta informasi kalender Hijriah dan puasa sunnah.",
  path: "/masjid/agenda",
});

export default function AgendaPage() {
  return (
    <main className="pt-20 min-h-screen bg-[#FDFAF4]">
      {/* Page Header */}
      <section className="bg-primary py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-secondary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            <Calendar size={12} />
            Yayasan Nurul Iman
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">
            Agenda Masjid & Kalender Hijriah
          </h1>
          <p className="font-arabic text-2xl md:text-3xl text-secondary/90 leading-loose">
            وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
          </p>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            &quot;Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa.&quot; (QS. Al-Ma&apos;idah: 2). Ikuti kegiatan kajian, majlis ta&apos;lim, dan program kebaikan bersama DKM Nurul Iman.
          </p>
        </div>
      </section>

      {/* Agenda & Hijri Calendar Reader */}
      <section>
        <AgendaHijri />
      </section>
    </main>
  );
}
