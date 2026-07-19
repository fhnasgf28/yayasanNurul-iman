import { CheckCircle2, Target, Heart, ShieldCheck, BookOpen, Users, Star } from "lucide-react";
import FAQ from "@/components/public/FAQ";

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
          <p className="text-white/70 text-lg md:text-xl">Mengenal lebih dekat visi, misi, dan perjalanan Yayasan Nurul Iman dalam memakmurkan masjid dan membina generasi Qur&apos;ani.</p>
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
                Yayasan Nurul Iman didirikan atas semangat kolektif masyarakat untuk menjaga, merawat, dan memakmurkan Masjid Nurul Iman sebagai pusat ibadah, pendidikan, dan peradaban Islam di lingkungan Karawang.
              </p>
              <p>
                Berangkat dari keyakinan bahwa generasi yang kuat dimulai dari pendidikan yang baik, yayasan kemudian mendirikan <strong>DTA (Diniyah Takmiliyah Awaliyah) Nurul Iman</strong> — sebuah madrasah petang yang membina anak-anak agar mencintai Al-Qur&apos;an, memahami ilmu agama, dan tumbuh dengan akhlak mulia.
              </p>
              <p>
                Kini, Yayasan Nurul Iman hadir sebagai rumah bagi ratusan santri dan jamaah — sebuah oasis iman di tengah dinamika zaman.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-xl">Visi</h4>
                  <p className="text-sm text-gray-600">Menjadi yayasan keagamaan yang amanah dalam memakmurkan masjid dan melahirkan generasi Muslim yang berakhlak mulia, cinta Al-Qur&apos;an, dan bermanfaat bagi umat.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-xl">Misi</h4>
                  <div className="text-sm text-gray-600 space-y-3 mt-3">
                    <div className="rounded-2xl bg-white p-4 border border-secondary/10 shadow-sm">
                      <p>1. Mengelola dan memakmurkan Masjid Nurul Iman sebagai pusat ibadah.</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 border border-secondary/10 shadow-sm">
                      <p>2. Menyelenggarakan pendidikan agama Islam (DTA) yang berkualitas.</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 border border-secondary/10 shadow-sm">
                      <p>3. Membina generasi muda agar fasih memahami Al-Qur&apos;an.</p>
                    </div>
                    <div className="rounded-2xl bg-secondary/10 p-4 border border-secondary/20 shadow-sm">
                      <p className="font-semibold text-primary">4. Menargetkan murid-murid DTA dalam jangka 1 tahun mampu adzan dengan baik dan hafal Juz 30.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl z-10 border-8 border-white">
              <img
                src="/masjid-exterior.jpg"
                alt="Masjid Nurul Iman"
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
      <section className="py-24 px-6 bg-islamic pb-32">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Timeline</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Perjalanan Yayasan</h2>
          </div>
          <div className="space-y-12">
            {[
              { year: "2012", label: "Awal Berdiri", event: "Pendirian Yayasan Nurul Iman dan pembentukan takmir Masjid Nurul Iman sebagai pusat ibadah jamaah.", highlight: false },
              { year: "2014", label: "Pendidikan", event: "Pembukaan DTA Nurul Iman angkatan pertama dengan 20 santri perdana di bawah bimbingan Ustadz H. Syarifuddin.", highlight: false },
              { year: "2016", label: "Pengembangan", event: "Penambahan program Tahsin & Tahfidz Juz 30 untuk seluruh santri, target hafal sebelum lulus.", highlight: false },
              { year: "2019", label: "Fasilitas", event: "Renovasi dan perluasan ruang kelas DTA, penambahan perpustakaan mini, serta pengadaan peralatan audio masjid.", highlight: false },
              { year: "2022", label: "Sosial", event: "Peluncuran program beasiswa bagi santri kurang mampu dan bantuan kebutuhan pokok jamaah dhuafa.", highlight: true },
              { year: "Kini", label: "Berkembang", event: "Lebih dari 200 santri aktif, program pendaftaran siswa baru, laporan keuangan transparan, dan website resmi yayasan.", highlight: true },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-center md:items-start group">
                <div className={`w-24 h-24 shrink-0 rounded-full flex flex-col items-center justify-center font-bold text-sm font-serif border-4 text-center px-2 transition-all ${
                  item.highlight 
                    ? "bg-secondary text-primary border-secondary shadow-lg shadow-secondary/30" 
                    : "bg-primary text-secondary border-secondary"
                }`}>
                  <span className="text-lg">{item.year}</span>
                  <span className="text-[9px] font-sans uppercase tracking-wider opacity-80">{item.label}</span>
                </div>
                <div className={`p-8 rounded-2xl flex-1 border transition-colors shadow-sm ${
                  item.highlight 
                    ? "bg-primary text-white border-primary group-hover:shadow-lg" 
                    : "bg-white border-secondary/10 group-hover:border-secondary"
                }`}>
                  <p className={`text-lg font-medium leading-relaxed ${item.highlight ? "text-white" : "text-primary"}`}>
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dewan Pengajar & Pengurus */}
      <section className="py-24 px-6 bg-light bg-islamic">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Amanah Pendidikan</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Pengurus & Dewan Pengajar</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Didukung oleh para ustadz dan ustadzah yang berdedikasi, berpengalaman, dan memiliki visi yang sama dalam mencetak generasi Qur'ani yang berakhlak mulia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ustadz H. M. Syarifuddin, Lc.",
                role: "Pembina Yayasan & Dewan Syariah",
                spec: "Spesialis Tafsir Al-Qur'an & Fikih",
                desc: "Lulusan Universitas Al-Azhar Kairo, membimbing kurikulum keislaman yayasan.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
              },
              {
                name: "Ustadz Abu Bakar Shidiq, S.Pd.I.",
                role: "Kepala Madrasah DTA Nurul Iman",
                spec: "Spesialis Akhlak & Bahasa Arab",
                desc: "Berpengalaman lebih dari 8 tahun mendidik santri usia dasar di Karawang.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
              },
              {
                name: "Ustadz Ahmad Fauzi",
                role: "Kepala Bidang Tahfidz Al-Qur'an",
                spec: "Hafizh 30 Juz & Spesialis Tajwid",
                desc: "Membimbing santri dalam program intensif hafalan Al-Qur'an juz 30 dan seterusnya.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
              },
              {
                name: "Ustadzah Siti Aminah, S.Ag.",
                role: "Pengajar DTA Kelas Dasar",
                spec: "Pakar Baca Tulis Al-Qur'an (BTQ)",
                desc: "Menggunakan metode Iqra interaktif untuk melatih kefasihan membaca huruf hijaiyah sejak dini.",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
              },
            ].map((member, i) => (
              <div 
                key={i} 
                className="bg-white rounded-[2.5rem] border border-secondary/10 overflow-hidden shadow-sm hover:shadow-2xl hover:border-secondary/25 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-wider bg-white/95 px-3 py-1 rounded-full shadow">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-primary text-lg leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen size={12} />
                      <span>{member.spec}</span>
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans mt-2">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Quotes / Landasan Section */}
      <section className="py-24 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-6xl mx-auto relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm">Landasan Kami</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Berpijak pada Al-Qur&apos;an &amp; Sunnah</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
              Setiap langkah Yayasan Nurul Iman didasarkan pada petunjuk Allah SWT dan tuntunan Rasulullah SAW.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ayat 1 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 space-y-4 hover:bg-white/10 transition-colors">
              <div className="text-secondary text-xs font-bold uppercase tracking-widest">QS. At-Taubah: 18</div>
              <p className="font-arabic text-2xl text-right text-white leading-loose">
                إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ
              </p>
              <p className="text-white/60 text-xs leading-relaxed italic">
                &ldquo;Sesungguhnya yang memakmurkan masjid-masjid Allah hanyalah orang yang beriman kepada Allah dan hari akhir.&rdquo;
              </p>
            </div>

            {/* Hadits */}
            <div className="bg-secondary/20 backdrop-blur border border-secondary/30 rounded-3xl p-8 space-y-4 hover:bg-secondary/30 transition-colors">
              <div className="text-secondary text-xs font-bold uppercase tracking-widest">HR. Muslim</div>
              <p className="font-arabic text-2xl text-right text-white leading-loose">
                مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ
              </p>
              <p className="text-white/60 text-xs leading-relaxed italic">
                &ldquo;Barangsiapa menempuh jalan untuk mencari ilmu, Allah akan mudahkan baginya jalan menuju surga.&rdquo;
              </p>
            </div>

            {/* Ayat 2 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 space-y-4 hover:bg-white/10 transition-colors">
              <div className="text-secondary text-xs font-bold uppercase tracking-widest">QS. Al-&apos;Alaq: 1</div>
              <p className="font-arabic text-2xl text-right text-white leading-loose">
                اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
              </p>
              <p className="text-white/60 text-xs leading-relaxed italic">
                &ldquo;Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan.&rdquo; — Wahyu pertama yang diturunkan, menunjukkan betapa pentingnya ilmu dan membaca.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "200+", label: "Santri Aktif", sub: "DTA & Tahfidz" },
              { num: "10+", label: "Tahun Berkhidmat", sub: "Sejak 2012" },
              { num: "5", label: "Ustadz & Ustadzah", sub: "Berpengalaman" },
              { num: "1000+", label: "Jamaah Masjid", sub: "Setiap Jumat" },
            ].map((s, i) => (
              <div key={i} className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-serif font-bold text-secondary">{s.num}</p>
                <p className="text-white font-bold text-sm">{s.label}</p>
                <p className="text-white/40 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </main>
  );
}
