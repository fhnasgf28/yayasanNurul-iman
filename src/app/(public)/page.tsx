import Hero from "@/components/public/Hero";
import ProgramCard from "@/components/public/ProgramCard";
import NewsCard from "@/components/public/NewsCard";
import DonationBanner from "@/components/public/DonationBanner";
import AchievementSlider from "@/components/public/AchievementSlider";
import PrayerTimesSection from "@/components/public/PrayerTimesSection";
import { ArrowRight, CheckCircle2, ShieldCheck, Target } from "lucide-react";
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
    <main className="flex flex-col min-h-screen bg-light relative overflow-x-hidden">
      {/* Global Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <Hero />
      
      {/* About Section - Redesigned */}
      <section className="py-32 px-6 relative overflow-hidden bg-white/50 backdrop-blur-[2px]">
        <div className="absolute top-0 left-0 w-full h-full bg-islamic opacity-[0.04] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="relative group">
            {/* Image Stack Decoration */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-3xl -z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-3xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            
            <div className="relative h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 rotate-1 group-hover:rotate-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=2070&auto=format&fit=crop"
                alt="Yayasan Nurul Iman"
                className="object-cover h-full w-full scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white p-6 rounded-3xl shadow-xl border border-secondary/10 flex items-center space-x-4 min-w-[280px]">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-primary font-bold text-xl">10+</div>
              <div>
                <p className="text-primary font-bold text-sm">Tahun Berkhidmat</p>
                <p className="text-gray-400 text-xs">Membangun Ummat Beradab</p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-secondary font-bold tracking-widest uppercase text-xs bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">
                <span>Kenali Kami Lebih Dekat</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
                Menebar Kebaikan <br /> 
                <span className="text-secondary italic">Menjaga Amanah</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed font-sans max-w-xl">
                Yayasan Nurul Iman adalah wadah perjuangan dakwah dan pendidikan di Karawang. Kami percaya bahwa memakmurkan masjid dan mendidik santri adalah kunci masa depan umat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-[2rem] border border-secondary/5 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all group">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-serif font-bold text-primary text-xl mb-3">Visi Kami</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Menjadi lembaga yang mandiri dan terpercaya dalam melahirkan generasi Qur'ani yang berakhlak mulia.</p>
              </div>
              
              <div className="p-8 bg-white rounded-[2rem] border border-secondary/5 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all group">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <Target size={24} />
                </div>
                <h4 className="font-serif font-bold text-primary text-xl mb-3">Misi Kami</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Menyelenggarakan pendidikan DTA berkualitas dan memakmurkan masjid sebagai pusat peradaban.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-8">
              <Link
                href="/about"
                className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg text-center"
              >
                Selengkapnya
              </Link>
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-accent overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Santri" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-medium">Bergabung bersama 200+ Santri aktif</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section - Redesigned */}
      <section className="py-32 px-6 bg-primary/5 relative">
        <div className="absolute inset-0 bg-islamic opacity-[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-primary font-bold tracking-widest uppercase text-xs bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                <span>Program Khidmah</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                Program Unggulan <br /> Yayasan <span className="text-secondary italic">Nurul Iman</span>
              </h2>
            </div>
            <Link
              href="/programs"
              className="group inline-flex items-center text-primary font-bold bg-white px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-all border border-secondary/10"
            >
              Lihat Semua Program <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform text-secondary" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      <AchievementSlider items={prestasi} />

      {/* News Section - Redesigned */}
      <section className="py-32 px-6 relative overflow-hidden bg-white/50 backdrop-blur-[2px]">
        <div className="absolute top-0 left-0 w-full h-full bg-islamic opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
npm          <div className="text-center space-y-6 max-w-3xl mx-auto">
             <div className="inline-flex items-center space-x-2 text-secondary font-bold tracking-widest uppercase text-xs bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">
                <span>Update Terkini</span>
              </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
              Kabar Dakwah & <br /><span className="text-secondary italic">Kegiatan Terbaru</span>
            </h2>
            <p className="text-gray-500 text-lg font-sans">Tetap terhubung dengan setiap langkah kami dalam menebar manfaat bagi masyarakat.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          <div className="text-center pt-10">
            <Link
              href="/news"
              className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors group"
            >
              Lihat Semua Berita <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <DonationBanner />
    </main>
  );
}
