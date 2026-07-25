"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  BookOpen,
  Copy,
  Check,
  Share2,
  Bookmark,
  BookmarkCheck,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA_DOA, DoaItem } from "@/lib/doa-data";

export default function DoaReader() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [nightMode, setNightMode] = useState(false);
  const [showLatin, setShowLatin] = useState(true);
  const [fontSize, setFontSize] = useState<number>(3); // 1 to 5 scale
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const nm = localStorage.getItem("doa-night-mode");
      if (nm) setNightMode(nm === "true");

      const bm = localStorage.getItem("doa-bookmarks");
      if (bm) setBookmarks(JSON.parse(bm));
    } catch {}
  }, []);

  // Save night mode
  useEffect(() => {
    try {
      localStorage.setItem("doa-night-mode", String(nightMode));
    } catch {}
  }, [nightMode]);

  // Save bookmarks
  const toggleBookmark = (id: number) => {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter((b) => b !== id)
      : [...bookmarks, id];
    setBookmarks(updated);
    try {
      localStorage.setItem("doa-bookmarks", JSON.stringify(updated));
    } catch {}
  };

  // Copy handler
  const handleCopy = (item: DoaItem) => {
    const textToCopy = `🤲 *${item.judul}*\n\n${item.teksArab}\n\n*Latin:*\n${item.teksLatin}\n\n*Artinya:*\n"${item.teksIndonesia}"\n\n📌 *Sumber:* ${item.sumber}\n\n✨ _Dikutip dari Yayasan Nurul Iman_\nhttps://yayasannuruliman.clipperyt.online/masjid/doa`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Share handler
  const handleShare = async (item: DoaItem) => {
    const shareData = {
      title: item.judul,
      text: `${item.judul}\n\n${item.teksArab}\n\n"${item.teksIndonesia}"\n\n- Yayasan Nurul Iman`,
      url: "https://yayasannuruliman.clipperyt.online/masjid/doa",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      handleCopy(item);
    }
  };

  // Text-To-Speech audio player (using Web Speech API or fallback)
  const handlePlayAudio = (item: DoaItem) => {
    if (playingId === item.id) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingId(null);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.teksIndonesia);
      utterance.lang = "id-ID";
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      setPlayingId(item.id);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Fitur audio otomatis tidak didukung di browser ini.");
    }
  };

  // Filtered Doa List
  const filteredDoa = useMemo(() => {
    return DATA_DOA.filter((item) => {
      const matchesCategory =
        category === "all"
          ? true
          : category === "bookmark"
          ? bookmarks.includes(item.id)
          : item.kategori === category;

      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.judul.toLowerCase().includes(q) ||
        item.teksLatin.toLowerCase().includes(q) ||
        item.teksIndonesia.toLowerCase().includes(q) ||
        item.sumber.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [search, category, bookmarks]);

  // Font size classes for Arabic text
  const fontSizes = [
    "text-2xl leading-[2.2]",
    "text-3xl leading-[2.4]",
    "text-4xl leading-[2.6]",
    "text-5xl leading-[2.8]",
    "text-6xl leading-[3.0]",
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        nightMode ? "bg-gray-950 text-white" : "bg-[#FDFAF4] text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-8 pb-28 space-y-6">
        {/* --- Control Toolbar --- */}
        <div
          className={`sticky top-0 z-40 p-4 rounded-2xl border shadow-sm backdrop-blur-md transition-all ${
            nightMode
              ? "bg-gray-900/90 border-gray-800"
              : "bg-white/95 border-secondary/20"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                size={16}
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  nightMode ? "text-gray-400" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari doa, latin, atau kata kunci..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition ${
                  nightMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-secondary"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"
                } border`}
              />
            </div>

            {/* View Toggles */}
            <div className="flex items-center justify-between w-full md:w-auto gap-2 flex-wrap">
              {/* Font Size A- / A+ */}
              <div
                className={`flex items-center gap-1 rounded-xl p-1 border text-xs font-bold ${
                  nightMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-100 border-gray-200 text-primary"
                }`}
              >
                <button
                  onClick={() => setFontSize(Math.max(0, fontSize - 1))}
                  disabled={fontSize === 0}
                  className="px-2 py-1 hover:bg-white/10 rounded disabled:opacity-40"
                  title="Kecilkan Teks Arab"
                >
                  A-
                </button>
                <span className="px-1">{fontSize + 1}</span>
                <button
                  onClick={() => setFontSize(Math.min(4, fontSize + 1))}
                  disabled={fontSize === 4}
                  className="px-2 py-1 hover:bg-white/10 rounded disabled:opacity-40"
                  title="Besarkan Teks Arab"
                >
                  A+
                </button>
              </div>

              {/* Latin Toggle */}
              <button
                onClick={() => setShowLatin(!showLatin)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                  showLatin
                    ? "bg-secondary text-primary shadow-sm"
                    : nightMode
                    ? "bg-gray-800 text-gray-400"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Latin
              </button>

              {/* Night Mode Toggle */}
              <button
                onClick={() => setNightMode(!nightMode)}
                className={`p-2 rounded-xl transition ${
                  nightMode
                    ? "bg-amber-400 text-gray-950"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                }`}
                title="Toggle Mode Malam"
              >
                {nightMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            {[
              { id: "all", label: "Semua Doa" },
              { id: "sholat", label: "Setelah Shalat" },
              { id: "selamat", label: "Doa Selamat" },
              { id: "keluarga", label: "Keluarga & Orang Tua" },
              { id: "harian", label: "Harian" },
              { id: "khusus", label: "Khusus & Perlindungan" },
              { id: "bookmark", label: `Tersimpan (${bookmarks.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  category === tab.id
                    ? "bg-primary text-white shadow-md font-bold"
                    : nightMode
                    ? "bg-gray-800/80 text-gray-400 hover:text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-secondary/20 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- Doa List Cards --- */}
        {filteredDoa.length === 0 ? (
          <div
            className={`text-center py-16 px-4 rounded-3xl border ${
              nightMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-secondary/20 shadow-sm"
            }`}
          >
            <BookOpen
              size={48}
              className={`mx-auto mb-3 ${
                nightMode ? "text-gray-600" : "text-gray-300"
              }`}
            />
            <p
              className={`text-base font-bold mb-1 ${
                nightMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Doa tidak ditemukan
            </p>
            <p className="text-xs text-gray-400">
              Coba kata kunci pencarian lain atau pilih kategori lain.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredDoa.map((item, idx) => {
              const isBookmarked = bookmarks.includes(item.id);
              const isCopied = copiedId === item.id;
              const isPlaying = playingId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className={`rounded-3xl border p-5 md:p-7 transition-all duration-300 relative overflow-hidden ${
                    nightMode
                      ? "bg-gray-900 border-gray-800 shadow-xl"
                      : "bg-white border-secondary/20 shadow-lg hover:shadow-xl shadow-primary/5"
                  }`}
                >
                  {/* Card Header: Category & Actions */}
                  <div className="flex items-center justify-between gap-3 mb-5 border-b border-gray-100 dark:border-gray-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                        {item.id}
                      </span>
                      <div>
                        <h3
                          className={`font-serif font-bold text-base md:text-lg ${
                            nightMode ? "text-amber-300" : "text-primary"
                          }`}
                        >
                          {item.judul}
                        </h3>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            nightMode
                              ? "bg-gray-800 text-gray-400"
                              : "bg-secondary/15 text-primary"
                          }`}
                        >
                          {item.kategoriLabel}
                        </span>
                      </div>
                    </div>

                    {/* Quick Action Icons */}
                    <div className="flex items-center gap-1">
                      {/* Audio Button */}
                      <button
                        onClick={() => handlePlayAudio(item)}
                        className={`p-2 rounded-xl text-xs font-semibold transition ${
                          isPlaying
                            ? "bg-amber-500 text-white animate-pulse"
                            : nightMode
                            ? "bg-gray-800 text-gray-400 hover:text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                        }`}
                        title={
                          isPlaying
                            ? "Hentikan Suara"
                            : "Dengarkan Terjemahan"
                        }
                      >
                        {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(item)}
                        className={`p-2 rounded-xl transition ${
                          isCopied
                            ? "bg-emerald-500 text-white"
                            : nightMode
                            ? "bg-gray-800 text-gray-400 hover:text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                        }`}
                        title="Salin Teks Doa"
                      >
                        {isCopied ? <Check size={16} /> : <Copy size={16} />}
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={() => handleShare(item)}
                        className={`p-2 rounded-xl transition ${
                          nightMode
                            ? "bg-gray-800 text-gray-400 hover:text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                        }`}
                        title="Bagikan Doa"
                      >
                        <Share2 size={16} />
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`p-2 rounded-xl transition ${
                          isBookmarked
                            ? "bg-amber-500 text-white shadow"
                            : nightMode
                            ? "bg-gray-800 text-gray-400 hover:text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-amber-500 hover:text-white"
                        }`}
                        title={
                          isBookmarked ? "Hapus Simpanan" : "Simpan Doa Ini"
                        }
                      >
                        {isBookmarked ? (
                          <BookmarkCheck size={16} />
                        ) : (
                          <Bookmark size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <p
                    className={`font-arabic text-right mb-6 select-all ${
                      fontSizes[fontSize]
                    } ${nightMode ? "text-amber-100" : "text-primary"}`}
                  >
                    {item.teksArab}
                  </p>

                  {/* Latin Text */}
                  <AnimatePresence>
                    {showLatin && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`text-sm italic leading-relaxed mb-4 p-3 rounded-2xl ${
                          nightMode
                            ? "bg-gray-800/60 text-amber-300/80"
                            : "bg-amber-50/70 text-secondary/90 border border-amber-100"
                        }`}
                      >
                        {item.teksLatin}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Translation */}
                  <p
                    className={`text-sm md:text-base leading-relaxed mb-4 ${
                      nightMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span className="font-semibold text-xs uppercase tracking-wider block mb-1 text-gray-400">
                      Artinya:
                    </span>
                    &quot;{item.teksIndonesia}&quot;
                  </p>

                  {/* Sumber & Keutamaan */}
                  <div
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t text-xs ${
                      nightMode
                        ? "border-gray-800 text-gray-400"
                        : "border-gray-100 text-gray-500"
                    }`}
                  >
                    <span className="font-semibold flex items-center gap-1">
                      <Sparkles size={12} className="text-secondary" />
                      Sumber: {item.sumber}
                    </span>
                    {item.keutamaan && (
                      <span className="italic text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                        💡 {item.keutamaan}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
