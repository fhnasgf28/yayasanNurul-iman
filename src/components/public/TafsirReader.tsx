"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  BookOpen, Search, ChevronLeft, ChevronRight, Loader2, X,
  AlignJustify, Copy, Check, Share2, Sparkles, BookText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SurahMeta {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
}

interface TafsirAyat {
  ayat: number;
  teks: string;
}

interface TafsirData {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  tafsir: TafsirAyat[];
}

export default function TafsirReader() {
  const [surahList, setSurahList] = useState<SurahMeta[]>([]);
  const [selectedTafsir, setSelectedTafsir] = useState<TafsirData | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingTafsir, setLoadingTafsir] = useState(false);
  const [search, setSearch] = useState("");
  const [currentSurahNum, setCurrentSurahNum] = useState<number>(1);
  const [selectedAyatNum, setSelectedAyatNum] = useState<number | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedAyat, setCopiedAyat] = useState<number | null>(null);

  const topRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Load list of surah
  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((r) => r.json())
      .then((d) => {
        setSurahList(d.data ?? []);
        setLoadingList(false);
      })
      .catch(() => setLoadingList(false));
  }, []);

  // Fetch Tafsir for a surah
  const fetchTafsir = useCallback(async (num: number, targetAyat?: number) => {
    setLoadingTafsir(true);
    setMobileSidebarOpen(false);
    try {
      const r = await fetch(`/api/quran/tafsir/${num}`);
      const d = await r.json();
      setSelectedTafsir(d.data ?? null);
      setCurrentSurahNum(num);
      setSelectedAyatNum(targetAyat ?? null);

      setTimeout(() => {
        if (targetAyat) {
          const el = document.getElementById(`tafsir-ayat-${targetAyat}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
        }
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch {
      // error handling
    } finally {
      setLoadingTafsir(false);
    }
  }, []);

  // Auto load Surah 1 on initial load
  useEffect(() => {
    fetchTafsir(1);
  }, [fetchTafsir]);

  const copyTafsir = async (ayatNum: number, text: string) => {
    if (!selectedTafsir) return;
    const shareText = `Tafsir Kemenag - QS. ${selectedTafsir.namaLatin} : Ayat ${ayatNum}\n\n${text}\n\n— Yayasan Nurul Iman`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedAyat(ayatNum);
      setTimeout(() => setCopiedAyat(null), 2000);
    } catch {}
  };

  const shareTafsir = async (ayatNum: number, text: string) => {
    if (!selectedTafsir) return;
    const shareText = `Tafsir Kemenag - QS. ${selectedTafsir.namaLatin} : Ayat ${ayatNum}\n\n${text}\n\n— Yayasan Nurul Iman`;
    if (navigator.share) {
      await navigator.share({
        title: `Tafsir QS. ${selectedTafsir.namaLatin} Ayat ${ayatNum}`,
        text: shareText,
      });
    } else {
      copyTafsir(ayatNum, text);
    }
  };

  const goToSurah = (dir: "prev" | "next") => {
    const next = dir === "prev" ? currentSurahNum - 1 : currentSurahNum + 1;
    if (next >= 1 && next <= 114) fetchTafsir(next);
  };

  const filteredSurah = surahList.filter(
    (s) =>
      s.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
      s.arti.toLowerCase().includes(search.toLowerCase()) ||
      String(s.nomor).includes(search)
  );

  // Surah List Panel (Mobile Sheet & Desktop Sidebar)
  const SurahListPanel = () => (
    <>
      <div className="bg-primary p-5 rounded-t-3xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-serif font-bold text-lg flex items-center gap-2">
            <BookText size={18} /> Daftar Surah Tafsir
          </h2>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Cari surah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm rounded-xl pl-9 pr-4 py-2 outline-none focus:bg-white/20 transition"
          />
        </div>
      </div>

      <div ref={listRef} className="overflow-y-auto flex-1">
        {loadingList ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={24} />
          </div>
        ) : (
          filteredSurah.map((s) => (
            <button
              key={s.nomor}
              onClick={() => fetchTafsir(s.nomor)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 dark:border-white/5 hover:bg-primary/5 transition-colors text-left group",
                currentSurahNum === s.nomor && "bg-secondary/10 border-l-4 border-l-secondary"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                  currentSurahNum === s.nomor
                    ? "bg-secondary text-primary"
                    : "bg-primary/10 text-primary dark:bg-white/10 dark:text-foreground group-hover:bg-secondary"
                )}
              >
                {s.nomor}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-primary dark:text-foreground text-sm truncate">
                    {s.namaLatin}
                  </span>
                  <span className="font-arabic text-lg text-primary/70 dark:text-secondary leading-none shrink-0">
                    {s.nama}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-gray-400">
                  <span>{s.arti}</span>
                  <span>•</span>
                  <span>{s.jumlahAyat} ayat</span>
                </div>
              </div>
            </button>
          ))
        )}
        <div className="h-16" />
      </div>
    </>
  );

  return (
    <div ref={topRef} className="max-w-7xl mx-auto px-4 py-6">
      {/* Header bar mobile */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <div>
          {selectedTafsir ? (
            <p className="text-sm font-bold text-primary dark:text-foreground">
              Tafsir Surah {selectedTafsir.nomor}. {selectedTafsir.namaLatin}
            </p>
          ) : (
            <p className="text-sm text-gray-400">Pilih surah untuk membaca tafsir</p>
          )}
        </div>
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-2xl text-sm font-bold shadow hover:bg-primary/90 transition"
        >
          <AlignJustify size={16} /> Pilih Surah
        </button>
      </div>

      {/* Mobile Bottom Sheet Drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative bg-white dark:bg-surface rounded-t-3xl flex flex-col max-h-[85vh] shadow-2xl animate-slide-up">
            <SurahListPanel />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-80 shrink-0">
          <div className="rounded-3xl border border-secondary/10 dark:border-white/10 bg-white dark:bg-surface shadow-sm overflow-hidden sticky top-24 flex flex-col max-h-[calc(100vh-7rem)]">
            <SurahListPanel />
          </div>
        </aside>

        {/* Main Tafsir Content */}
        <main className="flex-1 min-w-0">
          {loadingTafsir ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin text-primary" size={32} />
              <p className="text-gray-400 text-sm">Memuat tafsir Kemenag...</p>
            </div>
          ) : selectedTafsir ? (
            <div className="space-y-6">
              {/* Surah Tafsir Header */}
              <div className="bg-primary rounded-3xl p-6 md:p-8 text-center relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 opacity-10 bg-islamic" />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => goToSurah("prev")}
                      disabled={currentSurahNum === 1}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white transition"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div>
                      <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-secondary text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                        <Sparkles size={12} /> Tafsir Kemenag RI
                      </span>
                      <p className="font-arabic text-4xl text-white leading-loose">
                        {selectedTafsir.nama}
                      </p>
                      <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">
                        Tafsir Surah {selectedTafsir.namaLatin}
                      </h1>
                      <p className="text-secondary text-sm">{selectedTafsir.arti}</p>
                    </div>
                    <button
                      onClick={() => goToSurah("next")}
                      disabled={currentSurahNum === 114}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white transition"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Deskripsi Surah */}
                  {selectedTafsir.deskripsi && (
                    <div className="pt-3 border-t border-white/10 max-w-2xl mx-auto">
                      <p
                        className="text-white/70 text-xs md:text-sm leading-relaxed text-left line-clamp-4 hover:line-clamp-none transition-all"
                        dangerouslySetInnerHTML={{ __html: selectedTafsir.deskripsi }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Jump Ayat Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-bold text-gray-400 shrink-0">Pilih Ayat:</span>
                {selectedTafsir.tafsir.map((t) => (
                  <button
                    key={t.ayat}
                    onClick={() => {
                      setSelectedAyatNum(t.ayat);
                      document
                        .getElementById(`tafsir-ayat-${t.ayat}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={cn(
                      "h-8 px-3 rounded-full text-xs font-bold transition shrink-0 border",
                      selectedAyatNum === t.ayat
                        ? "bg-secondary text-primary border-secondary"
                        : "bg-white dark:bg-surface border-secondary/15 text-primary dark:text-foreground hover:bg-secondary/10"
                    )}
                  >
                    Ayat {t.ayat}
                  </button>
                ))}
              </div>

              {/* Tafsir Ayat List */}
              <div className="space-y-4">
                {selectedTafsir.tafsir.map((t) => {
                  const isSelected = selectedAyatNum === t.ayat;
                  return (
                    <div
                      key={t.ayat}
                      id={`tafsir-ayat-${t.ayat}`}
                      className={cn(
                        "rounded-3xl border bg-white dark:bg-surface p-5 md:p-7 shadow-sm transition-all space-y-4",
                        isSelected
                          ? "border-secondary ring-2 ring-secondary/20 shadow-md"
                          : "border-secondary/10 dark:border-white/10 hover:border-secondary/30"
                      )}
                    >
                      {/* Ayat Header */}
                      <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="h-9 w-9 rounded-2xl bg-primary text-secondary flex items-center justify-center font-bold text-sm">
                            {t.ayat}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-primary dark:text-foreground">
                              Ayat {t.ayat}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              Surah {selectedTafsir.namaLatin}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => copyTafsir(t.ayat, t.teks)}
                            className="h-8 w-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-foreground transition active:scale-95"
                            title="Salin tafsir"
                          >
                            {copiedAyat === t.ayat ? (
                              <Check size={15} className="text-green-500" />
                            ) : (
                              <Copy size={15} />
                            )}
                          </button>
                          <button
                            onClick={() => shareTafsir(t.ayat, t.teks)}
                            className="h-8 w-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-foreground transition active:scale-95"
                            title="Bagikan tafsir"
                          >
                            <Share2 size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Content Tafsir */}
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-line font-sans">
                          {t.teks}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Pagination */}
              <div className="flex items-center justify-between pt-4 pb-8">
                <button
                  onClick={() => goToSurah("prev")}
                  disabled={currentSurahNum === 1}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white disabled:opacity-30 transition"
                >
                  <ChevronLeft size={16} /> Surah Sebelumnya
                </button>
                <button
                  onClick={() => goToSurah("next")}
                  disabled={currentSurahNum === 114}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white disabled:opacity-30 transition"
                >
                  Surah Berikutnya <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <BookOpen size={48} className="text-primary/30" />
              <p className="text-gray-400 text-sm">Pilih surah dari daftar untuk membaca tafsir Kemenag.</p>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
      `}</style>
    </div>
  );
}
