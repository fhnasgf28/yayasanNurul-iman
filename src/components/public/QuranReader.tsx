"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search, ChevronLeft, ChevronRight, BookOpen,
  Volume2, VolumeX, Loader2, X, AlignJustify,
  Copy, Check, Share2, Bookmark, BookmarkCheck,
  Plus, Minus, Moon, Sun, Hash, ImageDown,
} from "lucide-react";

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

interface LastRead {
  surahNum: number;
  surahName: string;
  ayatNum: number;
}

// ── Canvas helpers ──────────────────────────────────────
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let curY = y;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + " ";
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[i] + " ";
      curY += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY + lineHeight;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

// ── Font size map ──────────────────────────────────────
const fontSizeMap: Record<number, string> = {
  1: "text-xl md:text-2xl",
  2: "text-2xl md:text-3xl",
  3: "text-3xl md:text-4xl",
  4: "text-4xl md:text-5xl",
  5: "text-5xl md:text-6xl",
};

const lineHeightMap: Record<number, string> = {
  1: "leading-[2]",
  2: "leading-[2.4]",
  3: "leading-[2.8]",
  4: "leading-[3.2]",
  5: "leading-[3.6]",
};

// ═══════════════════════════════════════════════════════
export default function QuranReader() {
  const [surahList, setSurahList] = useState<SurahMeta[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState("");
  const [currentSurahNum, setCurrentSurahNum] = useState<number | null>(null);
  const [playingAyat, setPlayingAyat] = useState<number | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // New features state
  const [copiedAyat, setCopiedAyat] = useState<number | null>(null);
  const [sharingAyat, setSharingAyat] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(3);
  const [nightMode, setNightMode] = useState(false);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [showTasbih, setShowTasbih] = useState(false);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [bookmarkedAyat, setBookmarkedAyat] = useState<Set<string>>(new Set());

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const readerTopRef = useRef<HTMLDivElement | null>(null);

  // Load persisted state
  useEffect(() => {
    try {
      const lr = localStorage.getItem("quran-last-read");
      if (lr) setLastRead(JSON.parse(lr));
      const bm = localStorage.getItem("quran-bookmarks");
      if (bm) setBookmarkedAyat(new Set(JSON.parse(bm)));
      const fs = localStorage.getItem("quran-font-size");
      if (fs) setFontSize(Number(fs));
    } catch {}
  }, []);

  // Fetch surah list
  useEffect(() => {
    fetch("https://equran.id/api/v2/surat")
      .then((r) => r.json())
      .then((d) => { setSurahList(d.data ?? []); setLoadingList(false); })
      .catch(() => setLoadingList(false));
  }, []);

  const fetchSurah = useCallback(async (num: number) => {
    setLoadingSurah(true);
    setMobileSidebarOpen(false);
    try {
      const r = await fetch(`https://equran.id/api/v2/surat/${num}`);
      const d = await r.json();
      setSelectedSurah(d.data);
      setCurrentSurahNum(num);
      setTimeout(() => readerTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {}
    finally { setLoadingSurah(false); }
  }, []);

  // Save last read
  const saveLastRead = useCallback((surah: Surah, ayatNum: number) => {
    const lr: LastRead = { surahNum: surah.nomor, surahName: surah.namaLatin, ayatNum };
    setLastRead(lr);
    localStorage.setItem("quran-last-read", JSON.stringify(lr));
  }, []);

  // Play audio
  const playAudio = (url: string, ayatNum: number) => {
    if (audioRef.current) audioRef.current.pause();
    if (playingAyat === ayatNum) { setPlayingAyat(null); return; }
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingAyat(ayatNum);
    audio.play();
    audio.onended = () => setPlayingAyat(null);
    if (selectedSurah) saveLastRead(selectedSurah, ayatNum);
  };

  // Copy ayat
  const copyAyat = async (ayat: Ayat) => {
    const text = [
      ayat.teksArab,
      "",
      ayat.teksLatin,
      "",
      `${ayat.nomorAyat}. ${ayat.teksIndonesia}`,
      "",
      `— ${selectedSurah?.namaLatin ?? ""} : ${ayat.nomorAyat}`,
      "Yayasan Nurul Iman | yayasannuruliman.clipperyt.online",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAyat(ayat.nomorAyat);
      setTimeout(() => setCopiedAyat(null), 2000);
    } catch {}
  };

  // Share as image (Canvas)
  const shareAsImage = async (ayat: Ayat) => {
    setSharingAyat(ayat.nomorAyat);
    try {
      await document.fonts.ready;

      const W = 1080, H = 1080;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#1a4d2e");
      bg.addColorStop(1, "#0d2e1a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Subtle geometric pattern (dots)
      ctx.fillStyle = "rgba(200,150,62,0.08)";
      for (let r = 0; r < H; r += 60)
        for (let c = 0; c < W; c += 60)
          { ctx.beginPath(); ctx.arc(c, r, 2, 0, Math.PI * 2); ctx.fill(); }

      // Top accent bar
      const accent = ctx.createLinearGradient(0, 0, W, 0);
      accent.addColorStop(0, "#C8963E");
      accent.addColorStop(1, "#e8b86d");
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, W, 8);

      // White card
      ctx.fillStyle = "rgba(255,255,255,0.97)";
      roundRect(ctx, 60, 80, W - 120, H - 200, 48);

      // Surah + ayat badge
      ctx.fillStyle = "#1a4d2e";
      ctx.beginPath();
      ctx.roundRect?.(W / 2 - 140, 108, 280, 48, 24);
      ctx.fill();
      ctx.fillStyle = "#C8963E";
      ctx.font = `bold 22px "Plus Jakarta Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(
        `${selectedSurah?.namaLatin ?? ""} : Ayat ${ayat.nomorAyat}`,
        W / 2, 140
      );

      // Bismillah (except Al-Fatihah & At-Taubah)
      if (selectedSurah && selectedSurah.nomor !== 1 && selectedSurah.nomor !== 9) {
        ctx.fillStyle = "#C8963E";
        ctx.font = `36px "Scheherazade New", serif`;
        ctx.textAlign = "center";
        ctx.direction = "rtl";
        ctx.fillText("بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", W / 2, 210);
        ctx.direction = "ltr";
      }

      // Arabic text
      ctx.fillStyle = "#1a4d2e";
      ctx.font = `56px "Scheherazade New", serif`;
      ctx.textAlign = "center";
      ctx.direction = "rtl";
      const arabicY = selectedSurah && selectedSurah.nomor !== 1 && selectedSurah.nomor !== 9 ? 310 : 260;
      wrapText(ctx, ayat.teksArab, W / 2, arabicY, W - 180, 80);
      ctx.direction = "ltr";

      // Divider
      ctx.strokeStyle = "#C8963E";
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(120, 580);
      ctx.lineTo(W - 120, 580);
      ctx.stroke();
      ctx.setLineDash([]);

      // Latin text
      ctx.fillStyle = "#C8963E";
      ctx.font = `italic 22px "Plus Jakarta Sans", sans-serif`;
      ctx.textAlign = "center";
      wrapText(ctx, ayat.teksLatin, W / 2, 620, W - 200, 34);

      // Translation
      ctx.fillStyle = "#555";
      ctx.font = `26px "Plus Jakarta Sans", sans-serif`;
      wrapText(ctx, `"${ayat.teksIndonesia}"`, W / 2, 710, W - 200, 38);

      // Bottom branding bar
      const brandGrad = ctx.createLinearGradient(0, H - 160, W, H - 160);
      brandGrad.addColorStop(0, "#1a4d2e");
      brandGrad.addColorStop(1, "#0d2e1a");
      ctx.fillStyle = brandGrad;
      ctx.fillRect(0, H - 155, W, 155);

      // Bottom accent
      ctx.fillStyle = accent;
      ctx.fillRect(0, H - 8, W, 8);

      // Yayasan name
      ctx.fillStyle = "#C8963E";
      ctx.font = `bold 30px "Plus Jakarta Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("🕌 Yayasan Nurul Iman", W / 2, H - 100);

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = `20px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText("yayasannuruliman.clipperyt.online", W / 2, H - 60);

      // Share or download
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `ayat-quran-${selectedSurah?.namaLatin}-${ayat.nomorAyat}.png`, { type: "image/png" });
        try {
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
              title: `${selectedSurah?.namaLatin} : ${ayat.nomorAyat}`,
              text: `${ayat.teksArab}\n\n${ayat.teksIndonesia}\n\n— Yayasan Nurul Iman`,
              files: [file],
            });
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = file.name;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }
        } catch {}
        setSharingAyat(null);
      }, "image/png");
    } catch {
      setSharingAyat(null);
    }
  };

  // Bookmark
  const toggleBookmark = (key: string) => {
    setBookmarkedAyat((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      localStorage.setItem("quran-bookmarks", JSON.stringify([...next]));
      return next;
    });
  };

  // Font size
  const changeFontSize = (dir: "up" | "down") => {
    setFontSize((prev) => {
      const next = dir === "up" ? Math.min(5, prev + 1) : Math.max(1, prev - 1);
      localStorage.setItem("quran-font-size", String(next));
      return next;
    });
  };

  const goToSurah = (dir: "prev" | "next") => {
    if (!currentSurahNum) return;
    const next = dir === "prev" ? currentSurahNum - 1 : currentSurahNum + 1;
    if (next >= 1 && next <= 114) fetchSurah(next);
  };

  const filtered = surahList.filter(
    (s) =>
      s.namaLatin.toLowerCase().includes(search.toLowerCase()) ||
      s.arti.toLowerCase().includes(search.toLowerCase()) ||
      String(s.nomor).includes(search)
  );

  // ── Surah List Panel ────────────────────────────────
  const SurahListPanel = () => (
    <>
      <div className="bg-primary p-5 rounded-t-3xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-serif font-bold text-lg flex items-center gap-2">
            <BookOpen size={18} /> Daftar Surah
          </h2>
          <button onClick={() => setMobileSidebarOpen(false)} className="lg:hidden w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            <X size={16} />
          </button>
        </div>

        {/* Last Read */}
        {lastRead && (
          <button
            onClick={() => fetchSurah(lastRead.surahNum)}
            className="w-full mb-3 bg-secondary/20 border border-secondary/30 rounded-xl px-3 py-2 flex items-center gap-2 text-left hover:bg-secondary/30 transition"
          >
            <Bookmark size={14} className="text-secondary shrink-0" />
            <div>
              <p className="text-white text-[10px] font-bold uppercase tracking-wider">Lanjut Baca</p>
              <p className="text-secondary text-xs">{lastRead.surahName} : {lastRead.ayatNum}</p>
            </div>
          </button>
        )}

        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Cari surah atau nomor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm rounded-xl pl-9 pr-4 py-2 outline-none focus:bg-white/20 transition"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {loadingList ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={24} />
          </div>
        ) : (
          filtered.map((s) => (
            <button
              key={s.nomor}
              onClick={() => fetchSurah(s.nomor)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-primary/5 transition-colors text-left group ${
                currentSurahNum === s.nomor ? "bg-secondary/10 border-l-4 border-l-secondary" : ""
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                currentSurahNum === s.nomor ? "bg-secondary text-primary" : "bg-primary/10 text-primary group-hover:bg-secondary"
              }`}>
                {s.nomor}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-primary text-sm truncate">{s.namaLatin}</span>
                  <span className="font-arabic text-lg text-primary/70 leading-none shrink-0">{s.nama}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="text-[10px] text-gray-400">{s.arti}</span>
                  <span className="text-[10px] text-gray-300">•</span>
                  <span className="text-[10px] text-gray-400">{s.jumlahAyat} ayat</span>
                  <span className={`text-[10px] font-semibold ${s.tempatTurun === "mekah" ? "text-green-500" : "text-blue-500"}`}>
                    • {s.tempatTurun === "mekah" ? "Makkiyah" : "Madaniyah"}
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </>
  );

  // ── Render ──────────────────────────────────────────
  return (
    <div
      className={`transition-colors duration-300 ${nightMode ? "bg-gray-950" : "bg-transparent"}`}
      ref={readerTopRef}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* ── Toolbar: Font size, Night mode, Tasbih ── */}
        <div className={`flex items-center justify-between mb-5 px-4 py-3 rounded-2xl border gap-3 flex-wrap ${
          nightMode ? "bg-gray-900 border-gray-700" : "bg-white border-secondary/10 shadow-sm"
        }`}>
          {/* Font size */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${nightMode ? "text-gray-400" : "text-gray-500"}`}>Ukuran Teks Arab:</span>
            <button onClick={() => changeFontSize("down")} disabled={fontSize === 1}
              className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-secondary transition disabled:opacity-30">
              <Minus size={13} />
            </button>
            <span className={`text-sm font-bold w-4 text-center ${nightMode ? "text-white" : "text-primary"}`}>{fontSize}</span>
            <button onClick={() => changeFontSize("up")} disabled={fontSize === 5}
              className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-secondary transition disabled:opacity-30">
              <Plus size={13} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Night mode */}
            <button
              onClick={() => setNightMode(!nightMode)}
              title={nightMode ? "Mode Siang" : "Mode Malam"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                nightMode ? "bg-yellow-400 text-gray-900" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {nightMode ? <Sun size={14} /> : <Moon size={14} />}
              <span className="hidden sm:inline">{nightMode ? "Siang" : "Malam"}</span>
            </button>

            {/* Tasbih */}
            <button
              onClick={() => setShowTasbih(!showTasbih)}
              title="Tasbih"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                showTasbih ? "bg-secondary text-primary" : "bg-primary/10 text-primary hover:bg-secondary"
              }`}
            >
              <Hash size={14} />
              <span className="hidden sm:inline">Tasbih</span>
              {tasbihCount > 0 && <span className="bg-primary text-white rounded-full px-1.5 text-[10px]">{tasbihCount}</span>}
            </button>
          </div>
        </div>

        {/* ── Tasbih Counter Panel ── */}
        {showTasbih && (
          <div className={`mb-5 rounded-3xl p-6 border text-center space-y-4 ${
            nightMode ? "bg-gray-900 border-gray-700" : "bg-primary text-white"
          }`}>
            <p className={`text-sm font-bold uppercase tracking-widest ${nightMode ? "text-gray-400" : "text-secondary"}`}>Tasbih Digital</p>
            <div
              onClick={() => setTasbihCount(c => c + 1)}
              className="w-36 h-36 rounded-full bg-secondary mx-auto flex items-center justify-center cursor-pointer active:scale-95 transition-transform shadow-2xl select-none"
            >
              <span className="text-5xl font-serif font-bold text-primary">{tasbihCount % 100}</span>
            </div>
            <p className={`text-xs ${nightMode ? "text-gray-400" : "text-white/60"}`}>
              Total: {tasbihCount} • Putaran: {Math.floor(tasbihCount / 33)}x33 + {tasbihCount % 33}
            </p>
            <div className="flex justify-center gap-3">
              {["SubhanAllah", "Alhamdulillah", "AllahuAkbar"].map((dz) => (
                <span key={dz} className="text-[10px] bg-white/10 px-2 py-1 rounded-full text-white/70">{dz}</span>
              ))}
            </div>
            <button onClick={() => setTasbihCount(0)} className="text-xs text-white/40 hover:text-white transition underline">Reset</button>
          </div>
        )}

        {/* ── Mobile: Pilih Surah button ── */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <div>
            {selectedSurah ? (
              <p className={`text-sm font-bold ${nightMode ? "text-white" : "text-primary"}`}>
                {selectedSurah.nomor}. {selectedSurah.namaLatin} —{" "}
                <span className="font-arabic text-base">{selectedSurah.nama}</span>
              </p>
            ) : (
              <p className="text-sm text-gray-400">Pilih surah untuk mulai membaca</p>
            )}
          </div>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-2xl text-sm font-bold shadow hover:bg-primary/90 transition"
          >
            <AlignJustify size={16} /> Pilih Surah
          </button>
        </div>

        {/* ── Mobile Bottom Sheet ── */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative bg-white rounded-t-3xl flex flex-col max-h-[85vh] shadow-2xl animate-slide-up">
              <SurahListPanel />
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block lg:w-80 shrink-0">
            <div className={`rounded-3xl border shadow-sm overflow-hidden sticky top-24 flex flex-col max-h-[calc(100vh-7rem)] ${
              nightMode ? "bg-gray-900 border-gray-700" : "bg-white border-secondary/10"
            }`}>
              <SurahListPanel />
            </div>
          </aside>

          {/* ── Main Reader ── */}
          <main className="flex-1 min-w-0">
            {loadingSurah ? (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <Loader2 className="animate-spin text-primary" size={32} />
                <p className="text-gray-400 text-sm">Memuat surah...</p>
              </div>
            ) : selectedSurah ? (
              <div className="space-y-4">
                {/* Surah Header */}
                <div className={`rounded-3xl p-6 md:p-8 text-center relative overflow-hidden ${
                  nightMode ? "bg-gray-900" : "bg-primary"
                }`}>
                  <div className="absolute inset-0 opacity-10 bg-islamic" />
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between">
                      <button onClick={() => goToSurah("prev")} disabled={currentSurahNum === 1}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white transition">
                        <ChevronLeft size={18} />
                      </button>
                      <div className="space-y-1.5">
                        <p className="font-arabic text-4xl md:text-5xl text-white leading-loose">{selectedSurah.nama}</p>
                        <h1 className="text-xl md:text-2xl font-serif font-bold text-white">{selectedSurah.namaLatin}</h1>
                        <p className="text-secondary text-sm font-medium">{selectedSurah.arti}</p>
                        <div className="flex items-center justify-center gap-3 text-white/60 text-xs flex-wrap">
                          <span>Surah ke-{selectedSurah.nomor}</span>
                          <span>•</span>
                          <span>{selectedSurah.jumlahAyat} Ayat</span>
                          <span>•</span>
                          <span className={selectedSurah.tempatTurun === "mekah" ? "text-green-300" : "text-blue-300"}>
                            {selectedSurah.tempatTurun === "mekah" ? "Makkiyah" : "Madaniyah"}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => goToSurah("next")} disabled={currentSurahNum === 114}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center text-white transition">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                    {selectedSurah.nomor !== 1 && selectedSurah.nomor !== 9 && (
                      <p className="font-arabic text-2xl md:text-3xl text-secondary/80 leading-loose pt-2">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                      </p>
                    )}
                  </div>
                </div>

                {/* Ayat list */}
                <div className="space-y-3">
                  {selectedSurah.ayat.map((ayat) => {
                    const bookmarkKey = `${selectedSurah.nomor}:${ayat.nomorAyat}`;
                    const isBookmarked = bookmarkedAyat.has(bookmarkKey);
                    return (
                      <div
                        key={ayat.nomorAyat}
                        className={`rounded-2xl border shadow-sm hover:shadow-md transition-all p-5 md:p-6 space-y-4 ${
                          nightMode
                            ? "bg-gray-900 border-gray-700 hover:border-secondary/40"
                            : "bg-white border-gray-100 hover:border-secondary/20"
                        }`}
                      >
                        {/* Top bar */}
                        <div className="flex items-center justify-between">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-secondary text-xs font-bold shrink-0">
                            {ayat.nomorAyat}
                          </div>
                          {/* Action buttons */}
                          <div className="flex items-center gap-1.5">
                            {/* Audio */}
                            <button
                              onClick={() => playAudio(ayat.audio["01"], ayat.nomorAyat)}
                              title="Putar tilawah"
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                playingAyat === ayat.nomorAyat
                                  ? "bg-secondary text-primary"
                                  : nightMode ? "bg-gray-700 text-gray-300 hover:bg-secondary hover:text-primary" : "bg-primary/5 text-primary hover:bg-secondary"
                              }`}
                            >
                              {playingAyat === ayat.nomorAyat ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>

                            {/* Copy */}
                            <button
                              onClick={() => copyAyat(ayat)}
                              title="Salin ayat"
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                copiedAyat === ayat.nomorAyat
                                  ? "bg-green-500 text-white"
                                  : nightMode ? "bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white" : "bg-primary/5 text-primary hover:bg-green-500 hover:text-white"
                              }`}
                            >
                              {copiedAyat === ayat.nomorAyat ? <Check size={14} /> : <Copy size={14} />}
                            </button>

                            {/* Share as image */}
                            <button
                              onClick={() => shareAsImage(ayat)}
                              disabled={sharingAyat === ayat.nomorAyat}
                              title="Bagikan sebagai gambar"
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                sharingAyat === ayat.nomorAyat
                                  ? "bg-blue-500 text-white animate-pulse"
                                  : nightMode ? "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white" : "bg-primary/5 text-primary hover:bg-blue-500 hover:text-white"
                              }`}
                            >
                              {sharingAyat === ayat.nomorAyat
                                ? <Loader2 size={14} className="animate-spin" />
                                : <ImageDown size={14} />}
                            </button>

                            {/* Bookmark */}
                            <button
                              onClick={() => toggleBookmark(bookmarkKey)}
                              title={isBookmarked ? "Hapus bookmark" : "Tambah bookmark"}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                isBookmarked
                                  ? "bg-secondary text-primary"
                                  : nightMode ? "bg-gray-700 text-gray-300 hover:bg-secondary hover:text-primary" : "bg-primary/5 text-primary hover:bg-secondary"
                              }`}
                            >
                              {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                            </button>
                          </div>
                        </div>

                        {/* Arabic text */}
                        <p className={`font-arabic text-right px-2 ${fontSizeMap[fontSize]} ${lineHeightMap[fontSize]} ${
                          nightMode ? "text-amber-100" : "text-primary"
                        }`}>
                          {ayat.teksArab}
                        </p>

                        {/* Latin */}
                        <p className={`text-xs md:text-sm italic leading-relaxed px-1 ${
                          nightMode ? "text-amber-400/70" : "text-secondary/80"
                        }`}>
                          {ayat.teksLatin}
                        </p>

                        {/* Translation */}
                        <div className={`border-t pt-3 px-1 ${nightMode ? "border-gray-700" : "border-gray-50"}`}>
                          <p className={`text-sm leading-relaxed ${nightMode ? "text-gray-300" : "text-gray-600"}`}>
                            <span className={`font-bold mr-1 ${nightMode ? "text-amber-400" : "text-primary"}`}>{ayat.nomorAyat}.</span>
                            {ayat.teksIndonesia}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation bottom */}
                <div className="flex items-center justify-between pt-2 pb-8">
                  <button onClick={() => goToSurah("prev")} disabled={currentSurahNum === 1}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white disabled:opacity-30 transition-all">
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>
                  <button onClick={() => setMobileSidebarOpen(true)}
                    className="lg:hidden text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-xl">
                    {currentSurahNum} / 114
                  </button>
                  <span className="hidden lg:block text-xs text-gray-400">{currentSurahNum} / 114</span>
                  <button onClick={() => goToSurah("next")} disabled={currentSurahNum === 114}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white disabled:opacity-30 transition-all">
                    <span className="hidden sm:inline">Berikutnya</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              /* Welcome state */
              <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen size={36} className="text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="font-arabic text-4xl text-primary leading-loose">اقْرَأْ بِاسْمِ رَبِّكَ</p>
                  <h2 className="text-xl font-serif font-bold text-primary">Selamat Membaca Al-Qur&apos;an</h2>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Pilih surah dari daftar untuk mulai membaca. Tersedia teks Arab, latin, terjemahan, audio, dan fitur berbagi.
                  </p>
                </div>
                {lastRead && (
                  <button
                    onClick={() => fetchSurah(lastRead.surahNum)}
                    className="flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-2xl font-bold hover:bg-secondary/80 transition shadow-lg"
                  >
                    <Bookmark size={16} />
                    Lanjut: {lastRead.surahName} : {lastRead.ayatNum}
                  </button>
                )}
                <button onClick={() => fetchSurah(1)} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg">
                  Mulai dari Al-Fatihah
                </button>
                <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                  {[{n:1,name:"Al-Fatihah"},{n:2,name:"Al-Baqarah"},{n:36,name:"Ya-Sin"},{n:55,name:"Ar-Rahman"},{n:67,name:"Al-Mulk"},{n:112,name:"Al-Ikhlas"}].map((s) => (
                    <button key={s.n} onClick={() => fetchSurah(s.n)}
                      className="bg-white border border-secondary/20 rounded-2xl p-3 text-xs font-bold text-primary hover:bg-secondary/10 hover:border-secondary transition-all">
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
      `}</style>
    </div>
  );
}
