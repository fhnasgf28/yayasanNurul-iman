"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlarmClock,
  ArrowLeft,
  ChevronDown,
  Clock3,
  Compass,
  LoaderCircle,
  MapPin,
  MoonStar,
  RefreshCcw,
  Sparkles,
  Sunrise,
  Sunset,
  Sun,
} from "lucide-react";
import type { PrayerTimesData } from "@/lib/prayer-times";

type KemenagPrayerApiItem = {
  cityId: string;
  cityName: string;
  timezone: string;
  gregorianDate: string;
  hijriDate: string;
  schedule: {
    imsak: string;
    subuh: string;
    terbit: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
  };
};

type PrayerSlot = {
  id: "imsak" | "subuh" | "terbit" | "dzuhur" | "ashar" | "maghrib" | "isya";
  label: string;
  arabic?: string;
  time: string;
  icon: LucideIcon;
  tone: string;
};

type ViewModel = {
  locationLabel: string;
  timezone: string;
  gregorianDate: string;
  hijriDate: string;
  sourceLabel: string;
  slots: PrayerSlot[];
};

type CountdownState = {
  nowText: string;
  nextId: PrayerSlot["id"];
  nextLabel: string;
  nextTime: string;
  remaining: string;
};

type Props = {
  data: PrayerTimesData | null;
};

const dummyKemenagData: KemenagPrayerApiItem = {
  cityId: "3171",
  cityName: "Kota Jakarta",
  timezone: "Asia/Jakarta",
  gregorianDate: "23 Mei 2026",
  hijriDate: "06 Dzulhijjah 1447 H",
  schedule: {
    imsak: "04:24",
    subuh: "04:34",
    terbit: "05:50",
    dzuhur: "11:51",
    ashar: "15:13",
    maghrib: "17:45",
    isya: "18:57",
  },
};

const locationOptions = [
  "Kota Jakarta",
  "Kota Bandung",
  "Kota Semarang",
  "Kota Surabaya",
  "Kota Yogyakarta",
];

const slotMeta: Array<Pick<PrayerSlot, "id" | "label" | "arabic" | "icon" | "tone">> = [
  { id: "imsak", label: "Imsak", arabic: "إمساك", icon: AlarmClock, tone: "from-teal-500/18 via-teal-400/8 to-white" },
  { id: "subuh", label: "Subuh", arabic: "الفجر", icon: MoonStar, tone: "from-sky-500/18 via-emerald-400/8 to-white" },
  { id: "terbit", label: "Terbit", arabic: "الشروق", icon: Sunrise, tone: "from-amber-400/20 via-orange-300/10 to-white" },
  { id: "dzuhur", label: "Dzuhur", arabic: "الظهر", icon: Sun, tone: "from-yellow-400/18 via-emerald-300/10 to-white" },
  { id: "ashar", label: "Ashar", arabic: "العصر", icon: Compass, tone: "from-lime-400/16 via-emerald-300/10 to-white" },
  { id: "maghrib", label: "Maghrib", arabic: "المغرب", icon: Sunset, tone: "from-orange-500/22 via-rose-300/10 to-white" },
  { id: "isya", label: "Isya", arabic: "العشاء", icon: Sparkles, tone: "from-slate-500/20 via-emerald-400/8 to-white" },
];

function createDateWithTime(dateText: string, timeText: string) {
  return new Date(`${dateText}T${timeText}:00`);
}

function getTimeZoneParts(timeZone: string, referenceDate: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const partMap = formatter.formatToParts(referenceDate).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== "literal") {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});

  return {
    year: partMap.year,
    month: partMap.month,
    day: partMap.day,
    hour: partMap.hour,
    minute: partMap.minute,
    second: partMap.second,
  };
}

function buildCountdown(slots: PrayerSlot[], timezone: string, nowMs: number): CountdownState {
  const nowParts = getTimeZoneParts(timezone, new Date(nowMs));
  const today = `${nowParts.year}-${nowParts.month}-${nowParts.day}`;
  const tomorrow = new Date(`${today}T00:00:00`);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const schedule = slots.map((slot) => ({
    ...slot,
    at: createDateWithTime(today, slot.time),
  }));

  const now = createDateWithTime(today, `${nowParts.hour}:${nowParts.minute}:${nowParts.second}`);
  let target = schedule.find((slot) => slot.at.getTime() > now.getTime());

  if (!target) {
    target = {
      ...slots[0],
      at: createDateWithTime(tomorrow.toISOString().slice(0, 10), slots[0].time),
    };
  }

  const diffMs = Math.max(0, target.at.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return {
    nowText: `${nowParts.hour}:${nowParts.minute}:${nowParts.second}`,
    nextId: target.id,
    nextLabel: target.label,
    nextTime: target.time,
    remaining: `${hours}:${minutes}:${seconds}`,
  };
}

function buildViewModel(data: PrayerTimesData | null): ViewModel {
  if (!data) {
    return {
      locationLabel: dummyKemenagData.cityName,
      timezone: dummyKemenagData.timezone,
      gregorianDate: dummyKemenagData.gregorianDate,
      hijriDate: dummyKemenagData.hijriDate,
      sourceLabel: "Mock Data Kemenag",
      slots: slotMeta.map((meta) => ({
        ...meta,
        time: dummyKemenagData.schedule[meta.id],
      })),
    };
  }

  const mappedTimes: Record<PrayerSlot["id"], string> = {
    imsak: data.entries[0]?.time ?? dummyKemenagData.schedule.imsak,
    subuh: data.entries.find((entry) => entry.name === "Subuh")?.time ?? dummyKemenagData.schedule.subuh,
    terbit: dummyKemenagData.schedule.terbit,
    dzuhur: data.entries.find((entry) => entry.name === "Dzuhur")?.time ?? dummyKemenagData.schedule.dzuhur,
    ashar: data.entries.find((entry) => entry.name === "Ashar")?.time ?? dummyKemenagData.schedule.ashar,
    maghrib: data.entries.find((entry) => entry.name === "Maghrib")?.time ?? dummyKemenagData.schedule.maghrib,
    isya: data.entries.find((entry) => entry.name === "Isya")?.time ?? dummyKemenagData.schedule.isya,
  };

  return {
    locationLabel: data.locationLabel,
    timezone: data.timezone,
    gregorianDate: data.gregorianDate,
    hijriDate: data.hijriDate,
    sourceLabel: data.methodName,
    slots: slotMeta.map((meta) => ({
      ...meta,
      time: mappedTimes[meta.id],
    })),
  };
}

function PrayerScheduleSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-emerald-950/5 bg-white/80 p-5 shadow-[0_20px_50px_rgba(7,54,46,0.08)]">
          <div className="h-3 w-32 animate-pulse rounded-full bg-emerald-100" />
          <div className="mt-5 h-12 w-52 animate-pulse rounded-2xl bg-emerald-100" />
          <div className="mt-4 h-24 animate-pulse rounded-[1.8rem] bg-emerald-50" />
        </div>
        <div className="rounded-[2rem] border border-emerald-950/5 bg-white/80 p-5 shadow-[0_20px_50px_rgba(7,54,46,0.08)]">
          <div className="h-3 w-28 animate-pulse rounded-full bg-emerald-100" />
          <div className="mt-5 h-10 w-36 animate-pulse rounded-2xl bg-emerald-100" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="h-16 animate-pulse rounded-2xl bg-emerald-50" />
            <div className="h-16 animate-pulse rounded-2xl bg-emerald-50" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-[1.8rem] bg-white/75 shadow-[0_18px_40px_rgba(7,54,46,0.05)]" />
        ))}
      </div>
    </div>
  );
}

export default function PrayerTimesPage({ data }: Props) {
  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0]);
  const [isLoadingMock, setIsLoadingMock] = useState(false);
  const [clockMs, setClockMs] = useState(() => Date.now());

  const viewModel = useMemo(() => buildViewModel(data), [data]);
  const countdown = useMemo(
    () => buildCountdown(viewModel.slots, viewModel.timezone, clockMs),
    [clockMs, viewModel.slots, viewModel.timezone]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClockMs(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  function handleRefreshMock() {
    setIsLoadingMock(true);
    window.setTimeout(() => {
      setIsLoadingMock(false);
    }, 900);
  }

  const hasLiveData = Boolean(data);
  const nextPrayerCard = viewModel.slots.find((slot) => slot.id === countdown.nextId);
  const showErrorState = !hasLiveData;

  return (
    <main className="relative overflow-hidden bg-[#f6f8f6] pt-16 text-slate-900 md:pt-20">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(45,130,116,0.18),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(14,116,144,0.12),_transparent_32%),linear-gradient(180deg,_#0f3d36_0%,_#15554c_36%,_#f6f8f6_100%)]" />
      <div className="absolute left-[-40px] top-36 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute right-[-56px] top-28 h-48 w-48 rounded-full bg-cyan-200/30 blur-3xl" />

      <section className="relative px-4 pb-6 pt-7 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-5">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/92 backdrop-blur-md transition-colors hover:bg-white/15"
            >
              <ArrowLeft size={16} />
              Kembali
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-100">
              <Sparkles size={14} />
              Daily Prayer
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 text-white shadow-[0_24px_70px_rgba(7,54,46,0.24)] backdrop-blur-xl sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white/82">
                    <MapPin size={14} className="text-emerald-200" />
                    {viewModel.locationLabel}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white/82">
                    <MoonStar size={14} className="text-emerald-200" />
                    {viewModel.hijriDate}
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/10 bg-white/12 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-emerald-100/80">Jadwal Sholat</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <h1 className="text-2xl font-serif font-bold leading-tight text-white sm:text-3xl">
                      {viewModel.locationLabel}
                    </h1>
                    <p className="text-sm font-medium text-white/70">{viewModel.gregorianDate}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.8rem] border border-white/10 bg-black/10 p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">Jam Saat Ini</p>
                    <p className="mt-3 text-[2.4rem] font-serif font-bold tracking-tight text-white">{countdown.nowText}</p>
                    <p className="mt-2 text-sm text-white/60">{viewModel.gregorianDate}</p>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/12 via-white/8 to-transparent p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-100/75">Waktu Berikutnya</p>
                    <div className="mt-3 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[2rem] font-serif font-bold text-white">{countdown.nextLabel}</p>
                        <p className="mt-1 text-sm text-white/65">Masuk pukul {countdown.nextTime}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-right">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Countdown</p>
                        <p className="mt-2 text-[1.65rem] font-serif font-bold text-emerald-200">{countdown.remaining}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-950/5 bg-white/82 p-5 shadow-[0_24px_70px_rgba(7,54,46,0.10)] backdrop-blur-sm sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Lokasi & Sumber</p>
                  <h2 className="mt-2 text-2xl font-serif font-bold text-slate-900">Atur titik acuan jadwal sholat</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Clock3 size={18} />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <label className="block text-sm font-medium text-slate-700" htmlFor="mock-location">
                  Lokasi pengguna
                </label>
                <div className="relative">
                  <select
                    id="mock-location"
                    value={selectedLocation}
                    onChange={(event) => setSelectedLocation(event.target.value)}
                    className="h-13 w-full appearance-none rounded-2xl border border-emerald-950/8 bg-white px-4 pr-11 text-sm font-medium text-slate-800 outline-none transition-colors focus:border-emerald-500"
                  >
                    {locationOptions.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <p className="text-sm leading-6 text-slate-500">
                  Saat ini dropdown masih mockup UI. Nanti bisa langsung dihubungkan ke pencarian kota dari API Kemenag tanpa mengubah struktur komponen utama.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-emerald-950/6 bg-emerald-50/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Zona Waktu</p>
                  <p className="mt-2 font-semibold text-slate-900">{viewModel.timezone}</p>
                </div>
                <div className="rounded-2xl border border-emerald-950/6 bg-emerald-50/70 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Sumber</p>
                  <p className="mt-2 font-semibold text-slate-900">{viewModel.sourceLabel}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleRefreshMock}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
                >
                  {isLoadingMock ? <LoaderCircle size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
                  Refresh Mock
                </button>
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-950/8 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-emerald-50"
                >
                  Buka Pengaturan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-4">
          {isLoadingMock ? (
            <PrayerScheduleSkeleton />
          ) : showErrorState ? (
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-amber-200/60 bg-white/88 p-6 shadow-[0_20px_54px_rgba(15,23,42,0.06)]">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-700">
                  <Clock3 size={14} />
                  Empty / Error State
                </span>
                <h2 className="mt-4 text-3xl font-serif font-bold text-slate-900">Data live belum tersedia, tetapi UI tetap bisa ditinjau.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Komponen ini sekarang menampilkan dummy data terstruktur agar proses desain, review, dan integrasi API Kemenag bisa berjalan paralel. Saat fungsi fetch siap, view model tinggal diganti sumber datanya.
                </p>
              </div>
              <div className="rounded-[2rem] border border-emerald-950/5 bg-white/88 p-6 shadow-[0_20px_54px_rgba(15,23,42,0.06)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Interface Mock</p>
                <pre className="mt-4 overflow-x-auto rounded-[1.5rem] bg-slate-950 px-4 py-4 text-xs leading-6 text-emerald-100">
{`type KemenagPrayerApiItem = {
  cityId: string;
  cityName: string;
  timezone: string;
  gregorianDate: string;
  hijriDate: string;
  schedule: {
    imsak: string;
    subuh: string;
    terbit: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
  };
};`}
                </pre>
              </div>
            </div>
          ) : null}

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Jadwal Hari Ini</p>
              <h2 className="mt-2 text-2xl font-serif font-bold text-slate-900 sm:text-3xl">Enam waktu utama ditambah imsak dan terbit, disusun untuk cek cepat.</h2>
            </div>
          </div>

          <div className="grid gap-3 xl:grid-cols-2">
            {viewModel.slots.map((slot) => {
              const Icon = slot.icon;
              const isNext = slot.id === countdown.nextId;
              const isCurrentCard = nextPrayerCard?.id === slot.id;

              return (
                <article
                  key={slot.id}
                  className={`relative overflow-hidden rounded-[1.8rem] border p-4 shadow-[0_18px_44px_rgba(15,23,42,0.06)] transition-transform sm:p-5 ${
                    isNext
                      ? "border-emerald-400/60 bg-[#f8fffd] shadow-[0_24px_60px_rgba(16,185,129,0.12)]"
                      : "border-emerald-950/5 bg-white/90"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${slot.tone} ${isNext ? "opacity-100" : "opacity-70"}`} />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.35rem] ${
                          isNext ? "bg-emerald-600 text-white shadow-[0_14px_28px_rgba(16,185,129,0.24)]" : "bg-white text-emerald-700"
                        }`}
                      >
                        <Icon size={22} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-serif font-bold text-slate-900">{slot.label}</h3>
                          {isCurrentCard ? (
                            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                              Berikutnya
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{slot.arabic ?? ""}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Waktu</p>
                      <p className={`mt-2 text-[2rem] font-serif font-bold tracking-tight ${isNext ? "text-emerald-700" : "text-slate-900"}`}>
                        {slot.time}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
