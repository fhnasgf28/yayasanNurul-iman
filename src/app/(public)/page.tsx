import Hero from "@/components/public/Hero";
import StatCounter from "@/components/public/StatCounter";
import ProgramCard from "@/components/public/ProgramCard";
import NewsCard from "@/components/public/NewsCard";
import DonationBanner from "@/components/public/DonationBanner";
import AchievementSlider from "@/components/public/AchievementSlider";
import PrayerTimesSection from "@/components/public/PrayerTimesSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { getPrograms, getNews } from "@/lib/data";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { getPrayerTimes } from "@/lib/prayer-times";

export default async function Home() {
  const [featuredPrograms, latestNews, prestasi, settings] = await Promise.all([
    getPrograms(3),
    getNews(2),
    db.prestasi.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      select: { id: true, title: true, caption: true, imageUrl: true, badge: true },
    }),
    getSettings(),
  ]);
  const prayerTimes = await getPrayerTimes(settings);

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <PrayerTimesSection data={prayerTimes} />
      <StatCounter />
      <AchievementSlider items={prestasi} />

      {/* About Section */}
      <section className="py-24 px-6 bg-white bg-islamic">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=2070&auto=format&fit=crop"
              alt="Yayasan Nurul Iman"
              className="object-cover h-full w-full"
            />
            <div className="absolute inset-0 bg-primary/20" />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Tentang Kami</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                Cahaya Kebaikan di Tengah Masyarakat
              </h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Yayasan Nurul Iman adalah lembaga sosial-keagamaan yang berdedikasi memakmurkan Masjid Nurul Iman sebagai pusat ibadah dan kegiatan umat, serta menyelenggarakan pendidikan agama Islam melalui DTA Nurul Iman untuk anak-anak di lingkungan sekitar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-accent/30 rounded-2xl border border-secondary/20">
                <h4 className="font-serif font-bold text-primary text-xl mb-2">Visi Kami</h4>
                <p className="text-sm text-gray-600">Menjadi yayasan keagamaan yang amanah dalam memakmurkan masjid dan melahirkan generasi Muslim yang berakhlak mulia.</p>
              </div>
              <div className="p-6 bg-accent/30 rounded-2xl border border-secondary/20 space-y-4">
                <div>
                  <h4 className="font-serif font-bold text-primary text-xl mb-2">Misi Kami</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Mengelola Masjid Nurul Iman sebagai pusat ibadah dan menyelenggarakan pendidikan DTA yang berkualitas, terarah, dan berdampak nyata bagi santri.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-white/80 px-4 py-3 border border-secondary/10">
                    <p className="text-sm font-semibold text-primary">Target 1 Tahun Santri DTA</p>
                    <p className="text-sm text-gray-600 mt-1">Murid-murid DTA ditargetkan mampu adzan dengan baik dan hafal Juz 30 dalam jangka 1 tahun pembelajaran.</p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center text-primary font-bold group"
            >
              Selengkapnya Tentang Kami <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform text-secondary" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Program Unggulan</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                Wujudkan Keberkahan Melalui Program Kami
              </h2>
            </div>
            <Link
              href="/programs"
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md"
            >
              Lihat Semua Program
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 px-6 bg-white bg-islamic">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Berita & Artikel</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
              Update Kegiatan Terbaru
            </h2>
            <p className="text-gray-500">Ikuti perkembangan terbaru dari setiap kegiatan dan dakwah yang kami lakukan di lingkungan Masjid Nurul Iman.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>

      <DonationBanner />
    </main>
  );
}
