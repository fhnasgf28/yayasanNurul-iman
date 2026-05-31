import type { Metadata } from "next";
import PrayerTimesPage from "@/components/public/PrayerTimesPage";
import { getPrayerTimes } from "@/lib/prayer-times";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Jadwal Sholat",
  description:
    "Lihat jadwal sholat harian Yayasan Nurul Iman untuk Telukjambe Timur, Karawang dengan tampilan mobile-first dan countdown waktu berikutnya.",
};

export default async function PrayerSchedulePage() {
  const settings = await getSettings();
  const prayerTimes = await getPrayerTimes(settings);

  return <PrayerTimesPage data={prayerTimes} />;
}
