import Link from "next/link";
import { ArrowRight, Clock3, MapPin, MoonStar } from "lucide-react";
import type { PrayerTimesData } from "@/features/prayer-times/prayer-times";

type Props = {
  data: PrayerTimesData | null;
};

export default function PrayerTimesSection({ data }: Props) {
  if (!data) {
    return (
      <section className="px-6 -mt-20 relative z-30">
        <div className="max-w-7xl mx-auto rounded-[2rem] border border-secondary/15 bg-white/95 p-6 md:p-8 shadow-[0_30px_80px_rgba(26,77,46,0.15)] backdrop-blur-sm">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
              <Clock3 size={14} />
              Jadwal Sholat
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">Jadwal Belum Tersedia</h2>
            <p className="max-w-2xl text-gray-600">
              Data jadwal sholat belum dapat dimuat saat ini. Silakan cek kembali beberapa saat lagi atau atur lokasi sholat dari dashboard admin.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 -mt-24 relative z-30">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-x-10 -top-3 h-16 rounded-full bg-primary/8 blur-3xl" />
          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-black/5 bg-white/96 p-6 md:p-7 shadow-[0_26px_60px_rgba(26,77,46,0.14),inset_0_1px_0_rgba(255,255,255,0.96)] backdrop-blur-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">
                    <MapPin size={14} />
                    Lokasi Sholat
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary leading-tight">
                      {data.locationLabel}
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-600">
                      Jadwal sholat harian untuk lokasi ini, dengan tampilan ringkas di beranda dan halaman khusus untuk pengalaman yang lebih lengkap di mobile.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-accent px-4 py-2 text-sm text-primary shadow-[0_10px_20px_rgba(26,77,46,0.06)]">
                    <Clock3 size={14} className="text-secondary" />
                    {data.gregorianDate}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/8 bg-accent px-4 py-2 text-sm text-primary shadow-[0_10px_20px_rgba(26,77,46,0.06)]">
                    <MoonStar size={14} className="text-secondary" />
                    {data.hijriDate}
                  </span>
                  {/* Hidden: jadwal-sholat page
                  <Link
                    href="/jadwal-sholat"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(26,77,46,0.18)] transition-transform hover:-translate-y-0.5"
                  >
                    Lihat Detail
                    <ArrowRight size={15} className="text-secondary" />
                  </Link>
                  */}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {data.entries.map((entry) => (
                <div
                  key={entry.name}
                  className="relative overflow-hidden rounded-[1.8rem] border border-black/5 bg-white/96 p-5 shadow-[0_22px_48px_rgba(26,77,46,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
                >
                  <div className="absolute inset-x-5 top-0 h-16 rounded-b-[1.4rem] bg-gradient-to-b from-secondary/18 to-transparent" />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-primary/45">{entry.arabic}</p>
                      <h3 className="mt-3 text-2xl font-serif font-bold text-primary">{entry.name}</h3>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]" />
                  </div>
                  <p className="mt-8 text-4xl md:text-[2.6rem] font-serif font-bold text-secondary">{entry.time}</p>
                  <div className="mt-5 h-1.5 w-16 rounded-full bg-primary/8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
