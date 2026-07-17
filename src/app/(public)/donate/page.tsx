import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";
import DonationCalculator from "@/features/donation/DonationCalculator";
import { BadgeCheck, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Donasi & Infaq | Yayasan Nurul Iman",
  description: "Mari bersama memakmurkan masjid dan mencerdaskan santri. Salurkan zakat, infaq, dan sedekah Anda secara transparan.",
};

export default async function DonatePage() {
  const settings = await getSettings();

  return (
    <main className="pt-20 bg-light/30">
      {/* Hero Section */}
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <BadgeCheck size={16} />
            Layanan Infaq & Zakat
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Donasi & Infaq</h1>
          <p className="text-white/90 text-xl md:text-3xl font-arabic mt-4 text-secondary leading-relaxed select-all">
            مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ
          </p>
          <p className="text-white/60 text-xs md:text-sm italic max-w-2xl mx-auto mt-2 leading-relaxed">
            "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji." (QS. Al-Baqarah: 261)
          </p>
        </div>
      </section>

      {/* Calculator Section - Center Stage */}
      <section className="py-16 px-6 bg-islamic">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Hitung & Salurkan</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Yayasan Nurul Iman berkomitmen mengelola dana umat secara amanah dan transparan. Gunakan kalkulator di bawah ini untuk menghitung zakat atau memilih paket infaq sesuai keinginan Anda.
            </p>
          </div>

          <DonationCalculator settings={settings} />
        </div>
      </section>

      {/* Transparency & Hadith Section */}
      <section className="pb-24 px-6 bg-light/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Transparency Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-secondary/10 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl font-serif font-bold text-primary">Laporan Transparansi Keuangan</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Setiap rupiah yang Anda donasikan akan kami pertanggungjawabkan. Kami merilis laporan pemasukan dan pengeluaran donasi secara berkala yang dapat diakses oleh publik secara terbuka.
              </p>
            </div>
            <div>
              <Link 
                href="/donate/laporan-keuangan" 
                className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors group text-sm"
              >
                <span>Lihat Laporan Keuangan Lengkap</span>
                <ArrowUpRight size={18} className="ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Hadith / Quote Card */}
          <div className="relative h-[220px] rounded-[2rem] overflow-hidden shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop"
              alt="Sedekah Jariyah"
              className="h-full w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent flex flex-col justify-end p-8">
              <p className="text-white font-serif text-sm md:text-base italic leading-relaxed">
                &ldquo;Harta tidak akan berkurang karena sedekah. Dan Allah tidak akan menambah kepada seorang hamba yang pemaaf melainkan kemuliaan.&rdquo;
              </p>
              <p className="text-[10px] font-sans text-secondary font-bold uppercase tracking-wider mt-2">
                — HR. Muslim
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
