import Link from "next/link";
import { Wallet, Building2, BookOpen, User } from "lucide-react";

export default function DonatePage() {
  const donationOptions = [
    {
      title: "Operasional Masjid",
      desc: "Listrik, air, kebersihan, dan pemeliharaan fasilitas Masjid Nurul Iman.",
      icon: Building2,
    },
    {
      title: "Pembangunan Masjid",
      desc: "Dana khusus renovasi dan pengembangan infrastruktur Masjid.",
      icon: Wallet,
    },
    {
      title: "Beasiswa Santri DTA",
      desc: "Membantu biaya pendidikan anak-anak dari keluarga kurang mampu.",
      icon: User,
    },
    {
      title: "Program Tahfidz",
      desc: "Mendukung operasional kelas tahfidz Al-Qur'an santri.",
      icon: BookOpen,
    },
  ];

  return (
    <main className="pt-20">
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Donasi & Infaq</h1>
          <p className="text-white/70 text-lg md:text-xl italic font-arabic mt-4 text-secondary">
            مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ
          </p>
          <p className="text-white/70 text-lg md:text-xl">
            Mari bersama memakmurkan masjid dan mencerdaskan santri. Setiap donasi Anda adalah sedekah jariyah yang pahalanya terus mengalir.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-islamic">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Donation Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-primary">Pilihan Donasi</h2>
                <p className="text-gray-600 leading-relaxed">
                  Yayasan Nurul Iman mengelola amanah Anda secara transparan dan tepat sasaran. Silakan pilih program donasi yang ingin Anda dukung:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {donationOptions.map((opt, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-secondary/10 hover:border-secondary transition-all shadow-sm group">
                    <div className="w-12 h-12 bg-light rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-secondary transition-colors">
                      <opt.icon size={24} />
                    </div>
                    <h4 className="font-bold text-primary mb-2 font-serif text-lg">{opt.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-secondary/10 rounded-3xl border border-secondary/20 space-y-6">
                <h3 className="text-xl font-serif font-bold text-primary flex items-center gap-2">
                  <Wallet className="text-primary" /> Informasi Rekening
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-secondary/10">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Bank Transfer</p>
                    <p className="text-lg font-bold text-primary">[Nama Bank]</p>
                    <p className="text-2xl font-serif text-primary tracking-wider">[Nomor Rekening]</p>
                    <p className="text-sm font-medium text-gray-600 mt-1">A/N Yayasan Nurul Iman</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-bold text-primary">Konfirmasi Donasi:</p>
                  <p className="text-sm text-gray-600">WhatsApp ke <span className="font-bold">[Nomor WA]</span> dengan format:</p>
                  <div className="bg-white p-3 rounded-lg border border-dashed border-secondary text-center font-mono text-sm">
                    DONASI_[NAMA]_[NOMINAL]_[TANGGAL]
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Image/Text */}
            <div className="relative">
              <div className="sticky top-24 space-y-8">
                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1200&auto=format&fit=crop"
                    alt="Sedekah Jariyah"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                    <p className="text-white font-serif text-2xl italic">
                      &ldquo;Harta tidak akan berkurang karena sedekah.&rdquo; (HR. Muslim)
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-3xl border border-secondary/10 shadow-sm space-y-4">
                  <h4 className="text-xl font-serif font-bold text-primary">Laporan Transparansi</h4>
                  <p className="text-sm text-gray-600">
                    Setiap rupiah yang Anda donasikan akan kami laporkan secara berkala melalui website dan papan informasi masjid sebagai bentuk pertanggungjawaban amanah kami kepada umat.
                  </p>
                  <Link href="/donate/laporan-keuangan" className="inline-flex text-secondary font-bold text-sm hover:underline">
                    Lihat Laporan Keuangan →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
