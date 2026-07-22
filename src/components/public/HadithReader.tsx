"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
  Shuffle,
  Share2,
  Copy,
  Check,
  Wifi,
  WifiOff,
  BookMarked,
  ChevronDown,
  List,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface HadithItem {
  hadithnumber: number;
  arabicnumber: number;
  text: string;
  grades?: { name: string; grade: string }[];
  reference?: { book: number; hadith: number };
}

interface SectionDetail {
  hadithnumber_first: number;
  hadithnumber_last: number;
}

interface HadithBook {
  id: string;
  label: string;
  arabicName: string;
  totalSections: number;
  color: string;
}

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────
const BOOKS: HadithBook[] = [
  { id: "bukhari",  label: "Shahih Bukhari",   arabicName: "صحيح البخاري", totalSections: 97, color: "#1A4D2E" },
  { id: "muslim",   label: "Shahih Muslim",    arabicName: "صحيح مسلم",   totalSections: 56, color: "#2D6A4F" },
  { id: "abudawud", label: "Sunan Abu Dawud",  arabicName: "سنن أبي داود", totalSections: 43, color: "#40916C" },
  { id: "tirmidhi", label: "Sunan Tirmidzi",   arabicName: "سنن الترمذي",  totalSections: 49, color: "#C9A84C" },
  { id: "nasai",    label: "Sunan An-Nasa'i",  arabicName: "سنن النسائي",  totalSections: 51, color: "#B5835A" },
  { id: "ibnmajah", label: "Sunan Ibnu Majah", arabicName: "سنن ابن ماجه", totalSections: 37, color: "#6B4226" },
  { id: "malik",    label: "Muwatta Malik",    arabicName: "موطأ مالك",    totalSections: 61, color: "#7B5EA7" },
];

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function cleanText(text: string) {
  return text.replace(/\[([^\]]+)\]/g, "$1").replace(/\s+/g, " ").trim();
}

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────
export default function HadithReader() {
  const [selectedBook, setSelectedBook]     = useState<HadithBook>(BOOKS[0]);
  const [section, setSection]               = useState(1);
  const [hadithIndex, setHadithIndex]       = useState(0);
  const [hadiths, setHadiths]               = useState<HadithItem[]>([]);
  const [sectionMeta, setSectionMeta]       = useState<Record<string, SectionDetail>>({});
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [copied, setCopied]                 = useState(false);
  const [isOnline, setIsOnline]             = useState(true);
  const [bookDropdownOpen, setBookDropdownOpen] = useState(false);

  // Daftar bab
  const [sectionsMap, setSectionsMap]         = useState<Record<string, string>>({});
  const [sectionsDetail, setSectionsDetail]   = useState<Record<string, SectionDetail>>({});
  const [sectionsLoading, setSectionsLoading] = useState(false);
  const [sectionsOpen, setSectionsOpen]       = useState(false);
  const [sectionsSearch, setSectionsSearch]   = useState("");

  const dropdownRef  = useRef<HTMLDivElement>(null);
  const sectionsRef  = useRef<HTMLDivElement>(null);

  // Online status
  useEffect(() => {
    const upd = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", upd);
    window.addEventListener("offline", upd);
    upd();
    return () => {
      window.removeEventListener("online", upd);
      window.removeEventListener("offline", upd);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setBookDropdownOpen(false);
      if (sectionsRef.current && !sectionsRef.current.contains(e.target as Node))
        setSectionsOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Fetch daftar bab ──────────────────────
  const fetchSections = useCallback(async (bookId: string) => {
    setSectionsLoading(true);
    setSectionsMap({});
    setSectionsDetail({});
    try {
      const res = await fetch(`/api/hadith/sections?book=${bookId}`);
      if (!res.ok) throw new Error("Gagal memuat daftar bab");
      const data = await res.json();
      setSectionsMap(data.sections ?? {});
      setSectionsDetail(data.section_details ?? {});
    } catch {
      // tidak fatal, section list hanya fitur tambahan
    } finally {
      setSectionsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSections(selectedBook.id);
  }, [selectedBook, fetchSections]);

  // ── Fetch hadits per section ──────────────
  const fetchSection = useCallback(async (bookId: string, sec: number) => {
    setLoading(true);
    setError(null);
    setHadiths([]);
    try {
      const res = await fetch(`/api/hadith?book=${bookId}&section=${sec}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Gagal memuat hadits" }));
        throw new Error(err.error || "Gagal memuat hadits");
      }
      const data = await res.json();
      const items: HadithItem[] = data.hadiths ?? [];
      if (items.length === 0) throw new Error("Tidak ada hadits di bab ini");

      const meta: Record<string, SectionDetail> = data.metadata?.section_detail ?? {};
      if (Object.keys(meta).length > 0) setSectionMeta(meta);

      setHadiths(items);
      setHadithIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat hadits");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSection(selectedBook.id, section);
  }, [selectedBook, section, fetchSection]);

  // ── Navigasi ─────────────────────────────
  const currentHadith = hadiths[hadithIndex] ?? null;

  const prevHadith = () => {
    if (hadithIndex > 0) { setHadithIndex(hadithIndex - 1); return; }
    if (section > 1) setSection(section - 1);
  };

  const nextHadith = () => {
    if (hadithIndex < hadiths.length - 1) { setHadithIndex(hadithIndex + 1); return; }
    if (section < selectedBook.totalSections) setSection(section + 1);
  };

  const goRandom = () => {
    const randSec = Math.floor(Math.random() * selectedBook.totalSections) + 1;
    setSection(randSec);
  };

  const goToSection = (sec: number) => {
    setSection(sec);
    setHadithIndex(0);
    setSectionsOpen(false);
    setSectionsSearch("");
  };

  // ── Copy / Share ──────────────────────────
  const handleCopy = async () => {
    if (!currentHadith) return;
    const text = `${cleanText(currentHadith.text)}\n\n— ${selectedBook.label}, Hadits No. ${currentHadith.hadithnumber}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  const handleShare = async () => {
    if (!currentHadith) return;
    const text = `${cleanText(currentHadith.text)}\n\n— ${selectedBook.label}, Hadits No. ${currentHadith.hadithnumber}`;
    if (navigator.share) await navigator.share({ title: selectedBook.label, text });
    else handleCopy();
  };

  // ── Render helpers ────────────────────────
  const bookColor   = selectedBook.color;
  const hadithNum   = currentHadith?.hadithnumber;
  const sectionInfo = sectionMeta[String(section)];

  // Filter daftar bab
  const filteredSections = Object.entries(sectionsMap).filter(([key, name]) => {
    if (key === "0" || !name) return false; // skip bab 0 (kosong)
    if (!sectionsSearch) return true;
    const q = sectionsSearch.toLowerCase();
    return name.toLowerCase().includes(q) || key.includes(q);
  });

  return (
    <div className="max-w-2xl mx-auto px-4 pb-8 space-y-5">
      {/* Offline banner */}
      {!isOnline && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          <WifiOff size={14} />
          <span>Tidak ada koneksi internet.</span>
        </div>
      )}

      {/* Book Selector */}
      <div ref={dropdownRef} className="relative">
        <button
          id="hadith-book-selector"
          onClick={() => setBookDropdownOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 rounded-2xl border border-secondary/20 dark:border-secondary/15 bg-white dark:bg-surface px-4 py-3.5 shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
          aria-haspopup="listbox"
          aria-expanded={bookDropdownOpen}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: bookColor + "20" }}>
              <BookMarked size={17} style={{ color: bookColor }} />
            </span>
            <div className="text-left min-w-0">
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-none mb-1">Kitab Hadits</p>
              <p className="text-sm font-bold text-primary dark:text-foreground truncate">{selectedBook.label}</p>
            </div>
          </div>
          <ChevronDown size={16} className={cn("text-gray-400 flex-shrink-0 transition-transform duration-200", bookDropdownOpen && "rotate-180")} />
        </button>

        {bookDropdownOpen && (
          <div role="listbox" className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-secondary/15 dark:border-secondary/10 bg-white dark:bg-surface shadow-xl overflow-hidden">
            {BOOKS.map((book) => (
              <button key={book.id} role="option" aria-selected={selectedBook.id === book.id}
                onClick={() => { setSelectedBook(book); setSection(1); setHadithIndex(0); setBookDropdownOpen(false); setSectionsOpen(false); setSectionsSearch(""); }}
                className={cn("w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent dark:hover:bg-surface-muted", selectedBook.id === book.id && "bg-accent dark:bg-surface-muted")}
              >
                <span className="flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: book.color + "18" }}>
                  <BookOpen size={14} style={{ color: book.color }} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-primary dark:text-foreground">{book.label}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-arabic" dir="rtl">{book.arabicName}</p>
                </div>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{book.totalSections} bab</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── DAFTAR BAB PANEL ── */}
      <div ref={sectionsRef} className="relative">
        <button
          id="hadith-sections-toggle"
          onClick={() => setSectionsOpen((v) => !v)}
          className={cn(
            "w-full flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm transition-all active:scale-[0.99]",
            sectionsOpen
              ? "border-current text-white"
              : "border-secondary/20 dark:border-secondary/15 bg-white dark:bg-surface text-primary dark:text-foreground hover:shadow-md"
          )}
          style={sectionsOpen ? { backgroundColor: bookColor, borderColor: bookColor } : {}}
        >
          <span className="flex items-center gap-2">
            <List size={15} />
            Daftar Bab
            {Object.keys(sectionsMap).length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: sectionsOpen ? "rgba(255,255,255,0.2)" : bookColor + "18", color: sectionsOpen ? "white" : bookColor }}>
                {Object.keys(sectionsMap).filter(k => k !== "0" && sectionsMap[k]).length} bab
              </span>
            )}
            {sectionsLoading && <RefreshCw size={12} className="animate-spin opacity-50" />}
          </span>
          <ChevronDown size={15} className={cn("transition-transform duration-200", sectionsOpen && "rotate-180")} />
        </button>

        {sectionsOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-40 rounded-2xl border border-secondary/15 dark:border-secondary/10 bg-white dark:bg-surface shadow-2xl overflow-hidden flex flex-col max-h-[65vh]">
            {/* Search header */}
            <div className="px-4 pt-4 pb-3 border-b border-secondary/10 dark:border-secondary/10 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-primary dark:text-foreground uppercase tracking-widest">Daftar Bab — {selectedBook.label}</p>
                <button onClick={() => { setSectionsOpen(false); setSectionsSearch(""); }} className="h-7 w-7 flex items-center justify-center rounded-full text-gray-400 hover:text-primary dark:hover:text-foreground transition">
                  <X size={14} />
                </button>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="sections-search-input"
                  type="text"
                  value={sectionsSearch}
                  onChange={(e) => setSectionsSearch(e.target.value)}
                  placeholder="Cari nama bab..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-secondary/15 dark:border-secondary/10 bg-accent dark:bg-surface-muted text-sm text-primary dark:text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
                />
              </div>
            </div>

            {/* Sections list */}
            <div className="overflow-y-auto flex-1">
              {sectionsLoading ? (
                <div className="py-8 text-center">
                  <RefreshCw size={20} className="animate-spin text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Memuat daftar bab…</p>
                </div>
              ) : filteredSections.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-400">
                  {sectionsSearch ? "Bab tidak ditemukan" : "Daftar bab tidak tersedia"}
                </div>
              ) : (
                <div className="p-2">
                  {filteredSections.map(([key, name]) => {
                    const secNum = parseInt(key, 10);
                    const det = sectionsDetail[key];
                    const isActive = secNum === section;
                    return (
                      <button
                        key={key}
                        id={`section-item-${key}`}
                        onClick={() => goToSection(secNum)}
                        className={cn(
                          "w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all active:scale-[0.99] mb-0.5",
                          isActive
                            ? "text-white"
                            : "hover:bg-accent dark:hover:bg-surface-muted text-primary dark:text-foreground"
                        )}
                        style={isActive ? { backgroundColor: bookColor } : {}}
                      >
                        {/* Nomor bab */}
                        <span
                          className="flex-shrink-0 h-7 w-7 rounded-lg flex items-center justify-center text-[11px] font-bold mt-0.5"
                          style={isActive
                            ? { backgroundColor: "rgba(255,255,255,0.2)", color: "white" }
                            : { backgroundColor: bookColor + "15", color: bookColor }
                          }
                        >
                          {secNum}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={cn("text-sm font-medium leading-snug", isActive ? "text-white" : "")}>{name}</p>
                          {det && (
                            <p className={cn("text-[10px] mt-0.5", isActive ? "text-white/70" : "text-gray-400")}>
                              Hadits {det.hadithnumber_first}–{det.hadithnumber_last}
                              <span className="ml-1">({det.hadithnumber_last - det.hadithnumber_first + 1} hadits)</span>
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <button id="hadith-prev-btn" onClick={prevHadith} disabled={(section <= 1 && hadithIndex === 0) || loading}
          aria-label="Hadits sebelumnya"
          className="flex-shrink-0 h-11 w-11 rounded-xl border border-secondary/20 dark:border-secondary/15 bg-white dark:bg-surface flex items-center justify-center shadow-sm disabled:opacity-40 transition-all active:scale-95">
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1 text-center">
          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
            Bab {section} / {selectedBook.totalSections}
          </p>
          {sectionsMap[String(section)] && (
            <p className="text-[11px] font-semibold text-primary dark:text-foreground truncate px-2">
              {sectionsMap[String(section)]}
            </p>
          )}
          {sectionInfo && (
            <p className="text-[10px] text-gray-400">
              Hadits {sectionInfo.hadithnumber_first}–{sectionInfo.hadithnumber_last}
            </p>
          )}
          {hadiths.length > 1 && (
            <p className="text-[10px] text-gray-400">{hadithIndex + 1}/{hadiths.length} dalam bab ini</p>
          )}
        </div>

        <button id="hadith-next-btn" onClick={nextHadith} disabled={(section >= selectedBook.totalSections && hadithIndex >= hadiths.length - 1) || loading}
          aria-label="Hadits berikutnya"
          className="flex-shrink-0 h-11 w-11 rounded-xl border border-secondary/20 dark:border-secondary/15 bg-white dark:bg-surface flex items-center justify-center shadow-sm disabled:opacity-40 transition-all active:scale-95">
          <ChevronRight size={18} />
        </button>

        <button id="hadith-random-btn" onClick={goRandom} disabled={loading} aria-label="Bab acak"
          className="flex-shrink-0 h-11 w-11 rounded-xl border border-secondary/20 dark:border-secondary/15 bg-white dark:bg-surface flex items-center justify-center shadow-sm disabled:opacity-40 transition-all active:scale-95">
          <Shuffle size={15} />
        </button>
      </div>

      {/* Hadith Card */}
      <div className="rounded-3xl border bg-white dark:bg-surface shadow-md overflow-hidden" style={{ borderColor: bookColor + "25" }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: bookColor + "0D" }}>
          <div className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: bookColor + "20" }}>
              <BookMarked size={15} style={{ color: bookColor }} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: bookColor }}>{selectedBook.label}</p>
              {hadithNum && <p className="text-[10px] text-gray-500 dark:text-gray-400">Hadits No. {hadithNum}</p>}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button id="hadith-refresh-btn" onClick={() => fetchSection(selectedBook.id, section)} disabled={loading} aria-label="Muat ulang"
              className="h-8 w-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-foreground transition-all active:scale-95 disabled:opacity-40">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
            <button id="hadith-copy-btn" onClick={handleCopy} disabled={!currentHadith} aria-label="Salin hadits"
              className="h-8 w-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-foreground transition-all active:scale-95 disabled:opacity-40">
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
            <button id="hadith-share-btn" onClick={handleShare} disabled={!currentHadith} aria-label="Bagikan hadits"
              className="h-8 w-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary dark:hover:text-foreground transition-all active:scale-95 disabled:opacity-40">
              <Share2 size={14} />
            </button>
          </div>
        </div>

        <div className="px-5 py-6 space-y-5 min-h-[200px]">
          {loading && (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-100 dark:bg-surface-muted rounded-full w-full" />
              <div className="h-4 bg-gray-100 dark:bg-surface-muted rounded-full w-5/6" />
              <div className="h-4 bg-gray-100 dark:bg-surface-muted rounded-full w-4/5" />
              <div className="h-4 bg-gray-100 dark:bg-surface-muted rounded-full w-full" />
              <div className="h-4 bg-gray-100 dark:bg-surface-muted rounded-full w-3/4" />
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-8 space-y-3">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: bookColor + "12" }}>
                <BookOpen size={24} style={{ color: bookColor }} />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
              <button onClick={() => fetchSection(selectedBook.id, section)}
                className="text-xs font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
                style={{ color: bookColor, backgroundColor: bookColor + "12" }}>
                Coba lagi
              </button>
            </div>
          )}

          {currentHadith && !loading && (
            <div className="space-y-5">
              <div>
                <p className="text-[13px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Terjemahan</p>
                <p className="text-gray-800 dark:text-foreground leading-relaxed text-[15px]">{cleanText(currentHadith.text)}</p>
              </div>

              {currentHadith.grades && currentHadith.grades.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentHadith.grades.map((g, i) => {
                    const isShahih = g.grade.toLowerCase().includes("sahih") || g.grade.toLowerCase().includes("shahih");
                    return (
                      <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
                        style={{ color: isShahih ? "#1A4D2E" : "#C9A84C", borderColor: isShahih ? "#1A4D2E30" : "#C9A84C30", backgroundColor: isShahih ? "#1A4D2E0D" : "#C9A84C0D" }}>
                        {g.name}: {g.grade}
                      </span>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t text-[11px] text-gray-400" style={{ borderColor: bookColor + "20" }}>
                <span className="font-arabic text-xs" style={{ color: bookColor }} dir="rtl">{selectedBook.arabicName}</span>
                <span>No. {currentHadith.hadithnumber}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section jump input */}
      <div className="flex items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const v = parseInt((e.currentTarget.elements.namedItem("secNum") as HTMLInputElement).value, 10);
            if (!isNaN(v) && v >= 1 && v <= selectedBook.totalSections) goToSection(v);
          }}
          className="flex flex-1 items-center gap-2"
        >
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input id="hadith-section-input" name="secNum" type="number" min={1} max={selectedBook.totalSections}
              defaultValue={section} key={`${selectedBook.id}-${section}`}
              className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-secondary/20 dark:border-secondary/15 bg-white dark:bg-surface text-sm font-semibold text-center text-primary dark:text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 transition"
              placeholder="No. bab" />
          </div>
          <button type="submit" className="px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95" style={{ backgroundColor: bookColor }}>
            Pergi
          </button>
        </form>
      </div>

      {/* Quick jumps */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Bab Pertama", action: () => goToSection(1) },
          { label: "Bab Acak",    action: goRandom },
          { label: "Bab Terakhir", action: () => goToSection(selectedBook.totalSections) },
        ].map((item) => (
          <button key={item.label} onClick={item.action}
            className="rounded-xl border border-secondary/15 dark:border-secondary/10 bg-white dark:bg-surface py-2.5 px-2 text-[11px] font-semibold text-primary dark:text-foreground shadow-sm hover:shadow-md transition-all active:scale-95 text-center">
            <BookOpen size={12} className="mx-auto mb-1" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Attribution */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
        <Wifi size={11} />
        <span>Data dari fawazahmed0/hadith-api • Terjemahan Bahasa Indonesia</span>
      </div>
    </div>
  );
}
