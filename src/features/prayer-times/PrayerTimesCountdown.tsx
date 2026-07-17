"use client";

import { useEffect, useMemo, useState } from "react";
import type { PrayerName, PrayerTimeEntry } from "@/features/prayer-times/prayer-times";

type Props = {
  entries: PrayerTimeEntry[];
  timezone: string;
};

type CountdownState = {
  currentTime: string;
  nextPrayer: PrayerName;
  nextPrayerTime: string;
  remaining: string;
};

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

function createPseudoDate(dateText: string, timeText: string) {
  return new Date(`${dateText}T${timeText}:00`);
}

function buildCountdown(entries: PrayerTimeEntry[], timezone: string, referenceMs: number): CountdownState {
  const nowParts = getTimeZoneParts(timezone, new Date(referenceMs));
  const today = `${nowParts.year}-${nowParts.month}-${nowParts.day}`;
  const tomorrowDate = new Date(`${today}T00:00:00`);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  const schedule = entries.map((entry) => ({
    ...entry,
    at: createPseudoDate(today, entry.time),
  }));

  const now = createPseudoDate(today, `${nowParts.hour}:${nowParts.minute}:${nowParts.second}`);
  let target = schedule.find((entry) => entry.at.getTime() > now.getTime());

  if (!target) {
    target = {
      ...entries[0],
      at: createPseudoDate(tomorrowDate.toISOString().slice(0, 10), entries[0].time),
    };
  }

  const diffMs = Math.max(0, target.at.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return {
    currentTime: `${nowParts.hour}:${nowParts.minute}:${nowParts.second}`,
    nextPrayer: target.name,
    nextPrayerTime: target.time,
    remaining: `${hours}:${minutes}:${seconds}`,
  };
}

export default function PrayerTimesCountdown({ entries, timezone }: Props) {
  const [now, setNow] = useState(() => Date.now());
  const state = useMemo(() => buildCountdown(entries, timezone, now), [entries, now, timezone]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
      <div className="rounded-[1.75rem] border border-black/5 bg-white/92 p-4 sm:p-5 shadow-[0_18px_40px_rgba(26,77,46,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/45">Waktu Saat Ini</p>
        <p className="mt-4 text-[2rem] sm:text-4xl font-serif font-bold text-primary">{state.currentTime}</p>
        <p className="mt-2 text-sm text-gray-500">Jam lokal sesuai zona waktu lokasi masjid.</p>
      </div>
      <div className="rounded-[1.75rem] border border-secondary/20 bg-gradient-to-br from-primary to-primary/90 p-4 sm:p-5 shadow-[0_22px_50px_rgba(26,77,46,0.24)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary/80">Sholat Berikutnya</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[2rem] sm:text-3xl font-serif font-bold text-white">{state.nextPrayer}</p>
            <p className="mt-2 text-sm text-white/70">Masuk pukul {state.nextPrayerTime}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] sm:text-right">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">Countdown</p>
            <p className="mt-2 text-[1.7rem] sm:text-2xl font-serif font-bold text-secondary">{state.remaining}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
