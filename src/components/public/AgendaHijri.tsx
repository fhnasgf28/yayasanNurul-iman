"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Share2,
  CalendarPlus,
  Moon,
  Sun,
  Sparkles,
  CheckCircle2,
  Users,
  Bell,
  HeartHandshake,
  BookOpen,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AGENDA_LIST, ISLAMIC_EVENTS, AgendaItem, IslamicEvent } from "@/lib/agenda-data";

export default function AgendaHijri() {
  const [activeTab, setActiveTab] = useState<"agenda" | "kalender">("agenda");
  const [category, setCategory] = useState<string>("all");
  const [nightMode, setNightMode] = useState(false);

  // Live Gregorian & Hijri Date calculation
  const currentDateInfo = useMemo(() => {
    const now = new Date();

    // Format Gregorian
    const optionsGregorian: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const gregorianStr = now.toLocaleDateString("id-ID", optionsGregorian);

    // Format Hijri using Intl
    let hijriStr = "";
    try {
      const optionsHijri: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formatter = new Intl.DateTimeFormat(
        "id-ID-u-ca-islamic-umalqura",
        optionsHijri
      );
      hijriStr = formatter.format(now) + " H";
    } catch {
      hijriStr = "1447 / 1448 H";
    }

    return { gregorianStr, hijriStr };
  }, []);

  // Filtered Agenda List
  const filteredAgenda = useMemo(() => {
    return AGENDA_LIST.filter((item) => {
      if (category === "all") return true;
      return item.kategori === category;
    });
  }, [category]);

  // Google Calendar Link Generator
  const getGoogleCalendarUrl = (item: AgendaItem) => {
    const title = encodeURIComponent(`${item.judul} - Masjid Nurul Iman`);
    const details = encodeURIComponent(
      `${item.deskripsi}\n\nPenceramah: ${item.penceramah || '-'}\nLokasi: ${item.lokasi}\nTarget: ${item.peserta}\n\nYayasan Nurul Iman`
    );
    const location = encodeURIComponent(item.lokasi);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Share handler
  const handleShare = async (item: AgendaItem) => {
    const text = `📌 *${item.judul}*\n🗓️ ${item.waktu}\n⏰ ${item.jam}\n📍 ${item.lokasi}\n👤 ${item.penceramah || '-'}\n\n${item.deskripsi}\n\nMari hadir memakmurkan masjid! 🤲\n- Yayasan Nurul Iman`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.judul,
          text,
          url: "https://yayasannuruliman.clipperyt.online/masjid/agenda",
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(text);
      alert("Detail agenda telah disalin ke clipboard!");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        nightMode ? "bg-gray-950 text-white" : "bg-[#FDFAF4] text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8 pb-28 space-y-8">
        {/* --- Top Date Banner & Control Card --- */}
        <div
          className={`rounded-3xl p-6 md:p-8 border shadow-lg relative overflow-hidden transition-all ${
            nightMode
              ? "bg-gray-900 border-gray-800 text-white"
              : "bg-gradient-to-r from-primary via-primary/95 to-emerald-900 text-white border-primary/30"
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-secondary">
                <Sparkles size={14} />
                Penanggalan Hari Ini
              </div>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide">
                {currentDateInfo.hijriStr}
              </h2>
              <p className="text-white/80 text-sm md:text-base font-medium flex items-center gap-2">
                <CalendarIcon size={16} className="text-secondary" />
                {currentDateInfo.gregorianStr}
              </p>
            </div>

            {/* Quick Actions & Night Mode */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20 flex gap-1 text-xs font-bold">
                <button
                  onClick={() => setActiveTab("agenda")}
                  className={`px-4 py-2.5 rounded-xl transition-all ${
                    activeTab === "agenda"
                      ? "bg-secondary text-primary shadow-md font-bold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon size={14} /> Agenda Kegiatan
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("kalender")}
                  className={`px-4 py-2.5 rounded-xl transition-all ${
                    activeTab === "kalender"
                      ? "bg-secondary text-primary shadow-md font-bold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Moon size={14} /> Hari Besar & Puasa
                  </span>
                </button>
              </div>

              <button
                onClick={() => setNightMode(!nightMode)}
                className={`p-3 rounded-2xl border transition ${
                  nightMode
                    ? "bg-amber-400 text-gray-950 border-amber-300"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
                title="Toggle Mode Malam"
              >
                {nightMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- TAB 1: AGENDA KEGIATAN MASJID --- */}
        {activeTab === "agenda" && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
              <span className="text-gray-400 flex items-center gap-1 shrink-0 mr-1">
                <Filter size={14} /> Filter:
              </span>
              {[
                { id: "all", label: "Semua Agenda" },
                { id: "kajian", label: "Kajian & Majlis" },
                { id: "dta", label: "Pendidikan DTA" },
                { id: "sosial", label: "Sosial & Yatim" },
                { id: "phbi", label: "Hari Besar Islam (PHBI)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategory(tab.id)}
                  className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                    category === tab.id
                      ? "bg-primary text-white shadow-md font-bold"
                      : nightMode
                      ? "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
                      : "bg-white border border-secondary/20 text-gray-600 hover:bg-secondary/20 hover:text-primary shadow-sm"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Agenda Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAgenda.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className={`rounded-3xl border p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                    nightMode
                      ? "bg-gray-900 border-gray-800 shadow-xl text-white"
                      : "bg-white border-secondary/20 shadow-lg shadow-primary/5 text-gray-900"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badge Header */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-xl">
                        {item.kategoriLabel}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                          item.status === "akan_datang"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {item.status === "akan_datang" ? "Akan Datang" : "Agenda Rutin"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-serif font-bold ${
                        nightMode ? "text-amber-300" : "text-primary"
                      }`}
                    >
                      {item.judul}
                    </h3>

                    {/* Metadata Details */}
                    <div className="space-y-2 text-xs md:text-sm">
                      <div className="flex items-center gap-2 text-secondary font-semibold">
                        <Clock size={16} className="shrink-0" />
                        <span>{item.waktu} ({item.jam})</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <MapPin size={16} className="shrink-0 text-primary" />
                        <span>{item.lokasi}</span>
                      </div>
                      {item.penceramah && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium">
                          <User size={16} className="shrink-0 text-secondary" />
                          <span>Penceramah / Pengisi: <strong className="text-primary dark:text-amber-300">{item.penceramah}</strong></span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Users size={16} className="shrink-0 text-emerald-600" />
                        <span>Peserta: {item.peserta}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-xs md:text-sm leading-relaxed border-t pt-3 ${
                        nightMode ? "border-gray-800 text-gray-300" : "border-gray-100 text-gray-600"
                      }`}
                    >
                      {item.deskripsi}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-5 mt-4 border-t border-gray-100 dark:border-gray-800">
                    <a
                      href={getGoogleCalendarUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary/90 transition shadow-sm"
                    >
                      <CalendarPlus size={14} /> Pengingat Google
                    </a>

                    <button
                      onClick={() => handleShare(item)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center ${
                        nightMode
                          ? "bg-gray-800 border-gray-700 text-gray-300 hover:text-white"
                          : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-secondary/20 hover:text-primary"
                      }`}
                      title="Bagikan Agenda"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 2: KALENDER HIJRIAH & HARI BESAR --- */}
        {activeTab === "kalender" && (
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-xs md:text-sm text-amber-800 dark:text-amber-300">
              <Sparkles size={20} className="shrink-0 text-amber-500" />
              <span>
                <strong>Panduan Ibadah Sunnah & Hari Besar:</strong> Penentuan tanggal pasti hijriah dapat disesuaikan dengan ru'yatul hilal resmi Kementerian Agama RI.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ISLAMIC_EVENTS.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                    nightMode
                      ? "bg-gray-900 border-gray-800 shadow-xl"
                      : "bg-white border-secondary/20 shadow-lg shadow-primary/5"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-secondary bg-secondary/15 px-3 py-1 rounded-xl">
                        {event.hijriDate}
                      </span>
                      {event.isSunnahFasting && (
                        <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 border border-emerald-500/20">
                          <CheckCircle2 size={12} /> Puasa Sunnah
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg font-serif font-bold ${
                        nightMode ? "text-amber-300" : "text-primary"
                      }`}
                    >
                      {event.title}
                    </h3>

                    <p className="text-xs font-medium text-gray-400">
                      Perkiraan Masehi: <span className="text-gray-700 dark:text-gray-200 font-semibold">{event.gregorianEstimate}</span>
                    </p>

                    <p
                      className={`text-xs md:text-sm leading-relaxed ${
                        nightMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
