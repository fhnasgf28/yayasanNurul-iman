"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, ChevronLeft, ChevronRight, BookOpen, Volume2, VolumeX, Loader2, ArrowLeft, List } from "lucide-react";

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: { "01": string };
}

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: { "01": string };
  ayat: Ayat[];
}

interface SurahMeta {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
}

export default function QuranReader() {
  const [surahList, setSurahList] = useState<SurahMeta[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState("");
  const [currentSurahNum, setCurrentSurahNum] = useState<number | null>(null);
  const [playingAyat, setPlayingAyat] = useState<number | null>(null);
  const [showSurahList, setShowSurahList] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch surah list on mount
  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((r) => r.json())
      .then((d) => {
        setSurahList(d.data ?? []);
        setLoadingList(false);
      })
      .catch(() => setLoadingList(false));
  }, []);

  const fetchSurah = useCallback(async (num: number) => {
    setLoadingSurah(true);
    setShowSurahList(false);
    try {
      const r = await fetch(`https://equran.id/api/v2/surat/${num}`);
      const d = await r.json();
      setSelectedSurah(d.data);
      setCurrentSurahNum(num);
    } catch {
      /* ignore */
    } finally {
      setLoadingSurah(false);
    }
  }, []);

  const playAudio = (url: string, ayatNum: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (playingAyat === ayatNum) {
      setPlayingAyat(null);
      return;
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingAyat(ayatNum);
    audio.play();
    audio.onended = () => setPlayingAyat(null);
  };

  const filtered = surahList.filter(
    (s) =>
      s.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
      s.arti.toLowerCase().includes(search.toLowerCase()) ||
      String(s.nomor).includes(search)
  );

  const goToSurah = (dir: "prev" | "next") => {
    if (!currentSurahNum) return;
    const next = dir === "prev" ? currentSurahNum - 1 : currentSurahNum + 1;
    if (next >= 1 && next <= 114) fetchSurah(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Sidebar: Surah List ── */}
        <aside
          className={`lg:w-80 shrink-0 ${showSurahList ? "block" : "hidden lg:block"}`}
        >
          <div className="bg-white rounded-3xl border border-secondary/10 shadow-sm overflow-hidden sticky top-24">
            {/* Sidebar header */}
            <div className="bg-primary p-5">
              <h2 className="text-white font-serif font-bold text-lg flex items-center gap-2">
                <BookOpen size={18} /> Daftar Surah
              </h2>
              {/* Search */}
              <div className="mt-3 relative">
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

            {/* List */}
            <div className="overflow-y-auto max-h-[70vh]">
              {loadingList ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="animate-spin text-primary" size={24} />
                </div>
              ) : (
                filtered.map((s) => (
                  <button
                    key={s.nomor}
                    onClick={() => fetchSurah(s.nomor)}
                    className={`w-full flex items-center gap-4 px-4 py-3 border-b border-gray-50 hover:bg-primary/5 transition-colors text-left group ${
                      currentSurahNum === s.nomor ? "bg-primary/8 border-l-4 border-l-secondary" : ""
                    }`}
                  >
                    {/* Number */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      currentSurahNum === s.nomor
                        ? "bg-secondary text-primary"
                        : "bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-primary"
                    }`}>
                      {s.nomor}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary text-sm">{s.namaLatin}</span>
                        <span className="font-arabic text-base text-primary/70 leading-none">{s.nama}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400">{s.arti}</span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="text-[10px] text-gray-400">{s.jumlahAyat} ayat</span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className={`text-[10px] font-medium ${s.tempatTurun === "mekah" ? "text-green-500" : "text-blue-500"}`}>
                          {s.tempatTurun === "mekah" ? "Makkiyah" : "Madaniyah"}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* ── Main: Surah Reader ── */}
        <main className="flex-1 min-w-0">
          {/* Mobile: back to list */}
          {!showSurahList && (
            <button
              onClick={() => setShowSurahList(true)}
              className="lg:hidden flex items-center gap-2 text-primary font-bold text-sm mb-4 hover:text-secondary transition-colors"
            >
              <List size={16} /> Daftar Surah
            </button>
          )}

          {loadingSurah ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin text-primary" size={32} />
              <p className="text-gray-400 text-sm">Memuat surah...</p>
            </div>
          ) : selectedSurah ? (
            <div className="space-y-6">
              {/* Surah Header */}
              <div className="bg-primary rounded-3xl p-8 text-center relative overflow-hidden">
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
                    <div className="space-y-2">
                      <p className="font-arabic text-4xl text-white leading-loose">
                        {selectedSurah.nama}
                      </p>
                      <h1 className="text-2xl font-serif font-bold text-white">
                        {selectedSurah.namaLatin}
                      </h1>
                      <p className="text-secondary text-sm font-medium">{selectedSurah.arti}</p>
                      <div className="flex items-center justify-center gap-3 text-white/60 text-xs">
                        <span>Surah ke-{selectedSurah.nomor}</span>
                        <span>•</span>
                        <span>{selectedSurah.jumlahAyat} Ayat</span>
                        <span>•</span>
                        <span className={selectedSurah.tempatTurun === "mekah" ? "text-green-300" : "text-blue-300"}>
                          {selectedSurah.tempatTurun === "mekah" ? "Makkiyah" : "Madaniyah"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => goToSurah("next")}
                      disabled={currentSurahNum === 114}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white transition"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Bismillah (except Al-Fatihah and At-Taubah) */}
                  {selectedSurah.nomor !== 1 && selectedSurah.nomor !== 9 && (
                    <p className="font-arabic text-2xl text-secondary/80 leading-loose pt-2">
                      بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </p>
                  )}
                </div>
              </div>

              {/* Ayat list */}
              <div className="space-y-4">
                {selectedSurah.ayat.map((ayat) => (
                  <div
                    key={ayat.nomorAyat}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all p-6 space-y-4 group"
                  >
                    {/* Ayat number + audio */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-secondary text-xs font-bold shrink-0">
                        {ayat.nomorAyat}
                      </div>
                      <button
                        onClick={() => playAudio(ayat.audio["01"], ayat.nomorAyat)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                          playingAyat === ayat.nomorAyat
                            ? "bg-secondary text-primary"
                            : "bg-primary/5 text-primary hover:bg-secondary hover:text-primary"
                        }`}
                        title={playingAyat === ayat.nomorAyat ? "Hentikan" : "Putar audio"}
                      >
                        {playingAyat === ayat.nomorAyat ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      </button>
                    </div>

                    {/* Arabic text */}
                    <p className="font-arabic text-3xl text-right text-primary leading-[2.5] px-2">
                      {ayat.teksArab}
                    </p>

                    {/* Latin */}
                    <p className="text-sm text-secondary/80 italic leading-relaxed px-2">
                      {ayat.teksLatin}
                    </p>

                    {/* Terjemahan */}
                    <div className="border-t border-gray-50 pt-3 px-2">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-bold text-primary">{ayat.nomorAyat}.</span>{" "}
                        {ayat.teksIndonesia}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation bottom */}
              <div className="flex items-center justify-between pt-4 pb-8">
                <button
                  onClick={() => goToSurah("prev")}
                  disabled={currentSurahNum === 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                  Surah Sebelumnya
                </button>
                <span className="text-xs text-gray-400">
                  {currentSurahNum} / 114
                </span>
                <button
                  onClick={() => goToSurah("next")}
                  disabled={currentSurahNum === 114}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Surah Berikutnya
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* Welcome state */
            <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen size={40} className="text-primary" />
              </div>
              <div className="space-y-2">
                <p className="font-arabic text-3xl text-primary leading-loose">
                  اقْرَأْ بِاسْمِ رَبِّكَ
                </p>
                <h2 className="text-2xl font-serif font-bold text-primary">Selamat Membaca Al-Qur&apos;an</h2>
                <p className="text-gray-400 text-sm max-w-sm">
                  Pilih surah dari daftar di sebelah kiri untuk mulai membaca. Tersedia teks Arab, latin, terjemahan, dan audio tilawah.
                </p>
              </div>
              <button
                onClick={() => fetchSurah(1)}
                className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg"
              >
                Mulai dari Al-Fatihah
              </button>
              <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                {[{ n: 1, name: "Al-Fatihah" }, { n: 2, name: "Al-Baqarah" }, { n: 36, name: "Ya-Sin" }, { n: 55, name: "Ar-Rahman" }, { n: 67, name: "Al-Mulk" }, { n: 112, name: "Al-Ikhlas" }].map((s) => (
                  <button
                    key={s.n}
                    onClick={() => fetchSurah(s.n)}
                    className="bg-white border border-secondary/20 rounded-2xl p-3 text-xs font-bold text-primary hover:bg-secondary/10 hover:border-secondary transition-all text-center"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
