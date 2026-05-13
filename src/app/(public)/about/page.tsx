import { CheckCircle2, Target, Heart, ShieldCheck, BookOpen, Users, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Page Header */}
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Tentang Kami</h1>
          <p className="text-white/70 text-lg md:text-xl italic font-arabic mt-4 text-secondary">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="text-white/70 text-lg md:text-xl">Mengenal lebih dekat visi, misi, dan perjalanan Yayasan Nurul Iman dalam memakmurkan masjid dan membina generasi Qur'ani.</p>
        </div>
      </section>

      {/* History & Vision */}
      <section className="py-24 px-6 bg-islamic">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Perjalanan Kami</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-tight">
                Cahaya Kebaikan di Tengah Masyarakat
              </h2>
            </div>
            <div className="prose prose-lg text-gray-600 space-y-6">
              <p>
                Yayasan Nurul Iman didirikan dengan semangat untuk menjaga dan memakmurkan Masjid Nurul Iman sebagai rumah ibadah umat Islam di lingkungan ini.
              </p>
              <p>
                Seiring waktu, yayasan berkembang dengan menambahkan program pendidikan agama berupa DTA (Diniyah Takmiliyah Awaliyah) untuk membina anak-anak agar mengenal dan mencintai Al-Qur'an sejak dini.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-xl">Visi</h4>
                  <p className="text-sm text-gray-600">Menjadi yayasan keagamaan yang amanah dalam memakmurkan masjid dan melahirkan generasi Muslim yang berakhlak mulia, cinta Al-Qur'an, dan bermanfaat bagi umat.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-xl">Misi</h4>
                  <div className="text-sm text-gray-600 space-y-2 mt-2">
                    <p>1. Mengelola dan memakmurkan Masjid Nurul Iman sebagai pusat ibadah.</p>
                    <p>2. Menyelenggarakan pendidikan agama Islam (DTA) yang berkualitas.</p>
                    <p>3. Membina generasi muda agar fasih memahami Al-Qur'an.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl z-10 border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=2070&auto=format&fit=crop"
                alt="Sejarah Nurul Iman"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-accent/30">
        <div className="max-w-7xl mx-auto space-y-16 text-center">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Nilai-Nilai Kami</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Prinsip Amanah dalam Berkhidmat</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { title: "Amanah", desc: "Mengelola kepercayaan umat dengan penuh tanggung jawab", icon: ShieldCheck },
              { title: "Ikhlas", desc: "Bergerak semata-mata karena Allah SWT", icon: Heart },
              { title: "Ilmu", desc: "Menjadikan pendidikan agama sebagai prioritas", icon: BookOpen },
              { title: "Ukhuwah", desc: "Mempererat persaudaraan antar sesama Muslim", icon: Users },
              { title: "Istiqomah", desc: "Konsisten dalam menjalankan misi kebaikan", icon: Star },
            ].map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-secondary/10 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-light rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors mx-auto">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Visual */}
      <section className="py-24 px-6 bg-islamic">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Timeline</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Perjalanan Yayasan</h2>
          </div>
          <div className="space-y-12">
            {[
              { year: "Tahun 1", event: "Pendirian Yayasan Nurul Iman & pengelolaan Masjid Nurul Iman" },
              { year: "Tahun 2", event: "Pembukaan DTA Nurul Iman angkatan pertama" },
              { year: "Tahun 3", event: "Penambahan program tahsin & tahfidz untuk santri" },
              { year: "Tahun 4", event: "Pengembangan fasilitas masjid dan ruang kelas DTA" },
              { year: "Tahun 5", event: "Program beasiswa bagi santri kurang mampu" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
                <div className="w-24 h-24 shrink-0 rounded-full bg-primary flex items-center justify-center text-secondary font-bold text-sm font-serif border-4 border-secondary text-center px-2">
                  {item.year}
                </div>
                <div className="bg-white p-8 rounded-2xl flex-1 border border-secondary/10 group-hover:border-secondary transition-colors shadow-sm">
                  <p className="text-lg text-primary font-medium">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
