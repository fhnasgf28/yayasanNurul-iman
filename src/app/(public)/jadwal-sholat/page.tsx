import type { Metadata } from "next";
import PrayerTimesPage from "@/components/public/PrayerTimesPage";
import { getPrayerTimes } from "@/lib/prayer-times";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Jadwal Sholat | Yayasan Nurul Iman",
  description:
    "Lihat jadwal sholat harian Yayasan Nurul Iman dengan tampilan mobile-first, countdown waktu berikutnya, dan informasi lokasi yang ringkas.",
};

export default async function PrayerSchedulePage() {
  const settings = await getSettings();
  const prayerTimes = await getPrayerTimes(settings);

  return <PrayerTimesPage data={prayerTimes} />;
}
