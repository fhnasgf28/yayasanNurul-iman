"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Tag,
  ArrowRight,
  Users,
  CheckCircle2,
  Sparkles,
  Heart,
  BookOpen,
  Landmark,
  HandHeart,
  Layers,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  status: string;
  thumbnail: string | null;
  beneficiary?: number | null;
}

interface ProgramsExplorerProps {
  initialPrograms: ProgramItem[];
  initialCategory?: string;
}

export default function ProgramsExplorer({
  initialPrograms,
  initialCategory = "Semua",
}: ProgramsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "Semua"
  );
  const [search, setSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = ["Semua", "Masjid", "Pendidikan", "Sosial"];

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return initialPrograms.filter((p) => {
      const matchCat =
        selectedCategory === "Semua" ? true : p.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [initialPrograms, selectedCategory, search]);

  // Featured Program (e.g. DTA or first program)
  const featuredProgram = useMemo(() => {
    return (
      initialPrograms.find((p) => p.category === "Pendidikan") ||
      initialPrograms[0]
    );
  }, [initialPrograms]);

  // Total beneficiaries count
  const totalBeneficiaries = useMemo(() => {
    return initialPrograms.reduce((acc, p) => acc + (p.beneficiary || 100), 0);
  }, [initialPrograms]);

  const faqs = [
    {
      q: "Bagaimana cara berpartisipasi dalam program Yayasan Nurul Iman?",
      a: "Masyarakat dan jamaah dapat berpartisipasi sebagai donatur, relawan, pendaftar santri DTA, atau menghadiri kegiatan pengajian dan bakti sosial yang rutin diselenggarakan.",
    },
    {
      q: "Apakah seluruh program yayasan terkoordinasi dan transparan?",
      a: "Ya, seluruh dana infaq, shadaqah, dan zakat yang terkumpul dilaporkan secara terbuka di halaman Laporan Keuangan secara berkala dan diaudit oleh pengurus yayasan.",
    },
    {
      q: "Bagaimana cara mendaftarkan santri baru ke program DTA?",
      a: "Orang tua dapat mengisi formulir pendaftaran siswa secara online di menu Pendaftaran DTA atau datang langsung ke Sekretariat Yayasan Nurul Iman.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* --- STATS & IMPACT OVERVIEW BANNER --- */}
      <section className="-mt-12 relative z-20 max-w-6xl mx-auto px-4">
        <div className="bg-white border border-secondary/20 rounded-3xl p-6 md:p-8 shadow-xl shadow-primary/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-gray-100 last:border-none">
            <div className="text-3xl md:text-4xl font-serif font-bold text-primary flex items-center justify-center gap-1">
              <span>{initialPrograms.length}</span>
              <span className="text-secondary">+</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Program Aktif
            </p>
          </div>

          <div className="space-y-1 border-r border-gray-100 last:border-none">
            <div className="text-3xl md:text-4xl font-serif font-bold text-primary flex items-center justify-center gap-1">
              <span>{totalBeneficiaries.toLocaleString("id-ID")}</span>
              <span className="text-secondary">+</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Penerima Manfaat
            </p>
          </div>

          <div className="space-y-1 border-r border-gray-100 last:border-none">
            <div className="text-3xl md:text-4xl font-serif font-bold text-primary flex items-center justify-center gap-1">
              <span>100</span>
              <span className="text-secondary">%</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Amanah & Transparan
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-serif font-bold text-primary flex items-center justify-center gap-1">
              <span>24/7</span>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Khidmah Umat
            </p>
          </div>
        </div>
      </section>

      {/* --- FEATURED PROGRAM SPOTLIGHT --- */}
      {featuredProgram && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primary via-primary/95 to-emerald-950 rounded-3xl overflow-hidden shadow-2xl text-white relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-8 md:p-12 space-y-6 relative z-10">
                <span className="bg-secondary text-primary font-bold text-xs uppercase px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow">
                  <Sparkles size={14} /> Program Unggulan Yayasan
                </span>

                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                  {featuredProgram.title}
                </h2>

                <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3">
                  {featuredProgram.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-xs text-white/70 font-semibold pt-2">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                    <Tag size={14} className="text-secondary" /> Kategori: {featuredProgram.category}
                  </span>
                  {featuredProgram.beneficiary && (
                    <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                      <Users size={14} className="text-emerald-400" /> {featuredProgram.beneficiary}+ Penerima Manfaat
                    </span>
                  )}
                </div>

                <div className="pt-4 flex items-center gap-4 flex-wrap">
                  <Link
                    href={`/programs/${featuredProgram.slug}`}
                    className="bg-secondary text-primary font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-secondary/90 transition shadow-lg inline-flex items-center gap-2"
                  >
                    Pelajari Selengkapnya <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/donate"
                    className="bg-white/10 border border-white/20 text-white font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-white/20 transition inline-flex items-center gap-2"
                  >
                    <Heart size={16} className="text-rose-400" /> Dukung Program Ini
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 h-72 lg:h-full relative min-h-[300px]">
                <img
                  src={
                    featuredProgram.thumbnail ||
                    "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={featuredProgram.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary via-primary/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- EXPLORE & FILTER PROGRAMS SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Section Title & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-6">
          <div>
            <h3 className="text-3xl font-serif font-bold text-primary flex items-center gap-2">
              <Layers size={28} className="text-secondary" /> Jelajahi Program Khidmah
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Daftar kegiatan dakwah masjid, pendidikan Al-Qur'an santri, dan kepedulian sosial yayasan.
            </p>
          </div>

          {/* Search & Category Pills */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari program..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs border border-gray-200 outline-none focus:border-primary transition bg-white shadow-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 bg-white border border-secondary/20 p-1 rounded-2xl shadow-sm overflow-x-auto scrollbar-none w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow"
                      : "text-gray-600 hover:text-primary hover:bg-secondary/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Program Cards Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-secondary/20 shadow-sm space-y-3">
            <Layers size={48} className="mx-auto text-gray-300" />
            <h4 className="text-lg font-serif font-bold text-gray-700">
              Program Tidak Ditemukan
            </h4>
            <p className="text-xs text-gray-400">
              Tidak ada program aktif yang cocok dengan pencarian kata kunci atau kategori ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-secondary/20 shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={
                        program.thumbnail ||
                        "https://images.unsplash.com/photo-1542714599-423730594498?q=80&w=1200&auto=format&fit=crop"
                      }
                      alt={program.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5 z-20 flex gap-2">
                      <span className="bg-white/95 backdrop-blur-md text-primary text-[10px] uppercase font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                        <Tag size={12} className="text-secondary" />
                        <span>{program.category}</span>
                      </span>
                    </div>

                    {program.beneficiary && (
                      <div className="absolute bottom-4 right-4 z-20">
                        <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
                          <Users size={12} className="text-secondary" /> {program.beneficiary}+ Umat
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Card Info */}
                  <div className="p-7 space-y-3">
                    <h4 className="text-xl font-serif font-bold text-primary group-hover:text-secondary transition-colors duration-300 leading-snug">
                      {program.title}
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm line-clamp-3 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-7 pb-7 pt-2">
                  <Link
                    href={`/programs/${program.slug}`}
                    className="w-full py-3 px-4 rounded-2xl bg-gray-50 group-hover:bg-primary group-hover:text-white text-primary text-xs font-bold transition-all duration-300 flex items-center justify-between border border-gray-100 group-hover:border-primary"
                  >
                    <span>Lihat Rincian Program</span>
                    <ArrowRight size={16} className="text-secondary group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* --- PROGRAM PILLARS / TRI PILAR KHIDMAH --- */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="bg-[#FDFAF4] border border-secondary/20 rounded-3xl p-8 md:p-12 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/15 px-3.5 py-1.5 rounded-full inline-block">
              Pilar Pelayanan Yayasan
            </span>
            <h3 className="text-3xl font-serif font-bold text-primary">
              Tiga Pilar Utama Khidmah Nurul Iman
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              Setiap program yang diselenggarakan yayasan berpusat pada tiga pilar kebaikan untuk mewujudkan kemaslahatan masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-secondary/20 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Landmark size={24} className="text-secondary" />
              </div>
              <h4 className="text-lg font-serif font-bold text-primary">
                1. Kemakmuran Masjid
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Menyelenggarakan shalat berjamaah, kajian fiqih & tafsir rutin, peringatan hari besar Islam, serta menjaga kebersihan dan kenyamana ibadah jamaah.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-secondary/20 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <BookOpen size={24} className="text-secondary" />
              </div>
              <h4 className="text-lg font-serif font-bold text-primary">
                2. Pendidikan DTA & Tahfidz
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Membina santri sejak usia dini dengan metode Iqro, Tahsin, hafalan Juz 30, dan pembentukan akhlakul karimah anak-anak.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-secondary/20 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <HandHeart size={24} className="text-secondary" />
              </div>
              <h4 className="text-lg font-serif font-bold text-primary">
                3. Kepedulian Sosial & Yatim
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Penyaluran santunan rutin anak yatim piatu, bantuan keluarga kurang mampu (dhuafa), dan fasilitas beasiswa pendidikan 100% gratis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-serif font-bold text-primary flex items-center justify-center gap-2">
            <HelpCircle size={22} className="text-secondary" /> Pertanyaan Seputar Program
          </h3>
          <p className="text-xs text-gray-500">
            Hal-hal yang sering ditanyakan mengenai partisipasi dan tata kelola program yayasan.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-secondary/20 rounded-2xl p-5 shadow-sm transition"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4"
                >
                  <span className="font-serif font-bold text-sm md:text-base text-primary">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-primary shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-3 mt-3 border-t border-gray-100 text-xs md:text-sm text-gray-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- BOTTOM CTA DONATION & PARTICIPATION --- */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-primary via-primary/95 to-emerald-950 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-secondary text-primary font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Mari Berkontribusi
            </span>
            <h3 className="text-2xl md:text-4xl font-serif font-bold">
              Salurkan Infaq & Sedekah Terbaik Anda
            </h3>
            <p className="text-white/80 text-xs md:text-sm max-w-xl">
              Dukung keberlangsungan program kemakmuran masjid, beasiswa santri DTA, dan santunan anak yatim Yayasan Nurul Iman.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/donate"
              className="bg-secondary text-primary font-bold text-xs md:text-sm px-6 py-3.5 rounded-2xl hover:bg-secondary/90 transition shadow-lg flex items-center gap-2"
            >
              <Heart size={18} /> Berdonasi Sekarang
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 border border-white/20 text-white font-bold text-xs md:text-sm px-5 py-3.5 rounded-2xl hover:bg-white/20 transition"
            >
              Hubungi Pengurus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
