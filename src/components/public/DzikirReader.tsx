"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Sun,
  Moon,
  Info,
  Check,
  RefreshCw,
  Loader2,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DzikirItem {
  id: number;
  arabic: string;
  latin?: string;
  translation: string;
  source: string;
  read: string; // e.g., "Dibaca 3x" or "Dibaca 1x"
  benefit?: string;
}

export default function DzikirReader() {
  const [mode, setMode] = useState<"pagi" | "sore">("pagi");
  const [data, setData] = useState<DzikirItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Record<number, number>>({});
  const [nightMode, setNightMode] = useState(false);
  const [showLatin, setShowLatin] = useState(true);
  const [expandedInfo, setExpandedInfo] = useState<number | null>(null);
  const [celebrate, setCelebrate] = useState(false);

  // Load preferences
  useEffect(() => {
    try {
      const nm = localStorage.getItem("dzikir-night-mode");
      if (nm) setNightMode(nm === "true");
    } catch {}
  }, []);

  // Save night mode
  useEffect(() => {
    localStorage.setItem("dzikir-night-mode", String(nightMode));
  }, [nightMode]);

  // Fetch data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setCelebrate(false);
    fetch(`https://dzikir.zakiego.com/api/v0/dzikir-${mode}`)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted) {
          setData(json.data || json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [mode]);

  // Load progress
  useEffect(() => {
    if (data.length > 0) {
      try {
        const p = localStorage.getItem(`dzikir-${mode}-progress`);
        if (p) {
          setProgress(JSON.parse(p));
        } else {
          setProgress({});
        }
      } catch {
        setProgress({});
      }
    }
  }, [data, mode]);

  // Save progress
  const saveProgress = useCallback(
    (newProgress: Record<number, number>) => {
      setProgress(newProgress);
      localStorage.setItem(`dzikir-${mode}-progress`, JSON.stringify(newProgress));
    },
    [mode]
  );

  const getTarget = (readStr: string) => {
    const match = readStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  };

  const handleTap = (id: number, target: number) => {
    const current = progress[id] || 0;
    if (current < target) {
      const newProgress = { ...progress, [id]: current + 1 };
      saveProgress(newProgress);
      
      // Check if all completed
      const allDone = data.every(
        (item) => (newProgress[item.id] || 0) >= getTarget(item.read)
      );
      if (allDone) {
        setCelebrate(true);
      }
    }
  };

  const resetProgress = () => {
    if (confirm(`Yakin ingin mereset dzikir ${mode}?`)) {
      saveProgress({});
      setCelebrate(false);
    }
  };

  const completedCount = useMemo(() => {
    return data.filter((item) => (progress[item.id] || 0) >= getTarget(item.read)).length;
  }, [data, progress]);

  const progressPercent = data.length > 0 ? (completedCount / data.length) * 100 : 0;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        nightMode ? "bg-gray-950 text-white" : "bg-[#FDFAF4] text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto pb-24">
        {/* Sticky Header / Progress */}
        <div
          className={`sticky top-0 z-40 px-4 py-4 backdrop-blur-md border-b shadow-sm ${
            nightMode ? "bg-gray-950/80 border-gray-800" : "bg-[#FDFAF4]/90 border-secondary/20"
          }`}
        >
          {/* Top Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex bg-primary/10 rounded-xl p-1">
              <button
                onClick={() => setMode("pagi")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  mode === "pagi"
                    ? "bg-primary text-white shadow"
                    : nightMode
                    ? "text-gray-400 hover:text-white"
                    : "text-primary/70 hover:text-primary"
                }`}
              >
                Pagi
              </button>
              <button
                onClick={() => setMode("sore")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  mode === "sore"
                    ? "bg-primary text-white shadow"
                    : nightMode
                    ? "text-gray-400 hover:text-white"
                    : "text-primary/70 hover:text-primary"
                }`}
              >
                Sore
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLatin(!showLatin)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  showLatin
                    ? "bg-secondary text-primary"
                    : "bg-primary/10 text-primary hover:bg-secondary"
                }`}
              >
                Latin
              </button>
              <button
                onClick={() => setNightMode(!nightMode)}
                className={`p-2 rounded-xl transition-all ${
                  nightMode
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {nightMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className={nightMode ? "text-gray-400" : "text-primary"}>
                Progress: {completedCount} / {data.length}
              </span>
              <button
                onClick={resetProgress}
                className={`flex items-center gap-1 hover:underline ${
                  nightMode ? "text-red-400" : "text-red-600"
                }`}
              >
                <RefreshCw size={12} /> Reset
              </button>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${nightMode ? "bg-gray-800" : "bg-gray-200"}`}>
              <div
                className="h-full bg-secondary transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-primary">
              <Loader2 size={32} className="animate-spin mb-4" />
              <p>Memuat dzikir...</p>
            </div>
          ) : celebrate ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-center p-8 rounded-3xl border ${
                nightMode ? "bg-gray-900 border-gray-700" : "bg-white border-secondary/20 shadow-lg"
              }`}
            >
              <Trophy size={64} className="mx-auto text-secondary mb-4" />
              <h2 className={`text-2xl font-serif font-bold mb-2 ${nightMode ? "text-white" : "text-primary"}`}>
                Alhamdulillah!
              </h2>
              <p className={nightMode ? "text-gray-300" : "text-gray-600"}>
                Anda telah menyelesaikan dzikir {mode} ini. Semoga Allah memberkahi waktu Anda.
              </p>
              <button
                onClick={resetProgress}
                className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                Ulangi Dzikir
              </button>
            </motion.div>
          ) : (
            data.map((item, index) => {
              const target = getTarget(item.read);
              const current = progress[item.id] || 0;
              const isDone = current >= target;

              return (
                <div
                  key={item.id}
                  className={`relative rounded-3xl border p-5 md:p-6 transition-all duration-300 ${
                    isDone
                      ? nightMode
                        ? "bg-gray-900/50 border-gray-800 opacity-60"
                        : "bg-gray-50 border-gray-200 opacity-70"
                      : nightMode
                      ? "bg-gray-900 border-gray-700 shadow-lg"
                      : "bg-white border-secondary/20 shadow-lg"
                  }`}
                >
                  {/* Badge & Source */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                        isDone
                          ? "bg-green-500 text-white"
                          : "bg-primary text-secondary"
                      }`}
                    >
                      {isDone ? <Check size={18} /> : index + 1}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${
                        nightMode
                          ? "bg-gray-800 text-gray-400"
                          : "bg-primary/5 text-primary"
                      }`}
                    >
                      {item.source}
                    </span>
                  </div>

                  {/* Arabic */}
                  <p
                    className={`font-arabic text-right text-3xl md:text-4xl leading-[2.5] mb-6 ${
                      nightMode ? "text-amber-100" : "text-primary"
                    }`}
                  >
                    {item.arabic}
                  </p>

                  {/* Latin */}
                  <AnimatePresence>
                    {showLatin && item.latin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                      >
                        <p
                          className={`text-sm italic leading-relaxed ${
                            nightMode ? "text-amber-400/80" : "text-secondary/90"
                          }`}
                        >
                          {item.latin}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Translation */}
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      nightMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {item.translation}
                  </p>

                  {/* Benefit Toggle */}
                  {item.benefit && (
                    <div className="mb-6">
                      <button
                        onClick={() =>
                          setExpandedInfo(
                            expandedInfo === item.id ? null : item.id
                          )
                        }
                        className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                          nightMode
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        <Info size={14} /> Keutamaan
                      </button>
                      <AnimatePresence>
                        {expandedInfo === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`mt-2 p-3 rounded-xl text-xs leading-relaxed ${
                              nightMode
                                ? "bg-blue-900/20 text-blue-200"
                                : "bg-blue-50 text-blue-800"
                            }`}
                          >
                            {item.benefit}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Counter Button */}
                  <button
                    onClick={() => handleTap(item.id, target)}
                    disabled={isDone}
                    className={`w-full py-4 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 ${
                      isDone
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : nightMode
                        ? "bg-primary/20 hover:bg-primary/30 text-white border border-primary/30"
                        : "bg-primary text-white shadow-xl shadow-primary/20"
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-widest mb-1 opacity-80">
                      {item.read}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{current}</span>
                      <span className="text-lg opacity-60">/ {target}</span>
                    </div>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
