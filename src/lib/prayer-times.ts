const DEFAULT_PRAYER_CITY = "Jakarta";
const DEFAULT_PRAYER_COUNTRY = "Indonesia";
const DEFAULT_PRAYER_METHOD = "20";

export type PrayerName = "Subuh" | "Dzuhur" | "Ashar" | "Maghrib" | "Isya";

export type PrayerTimeEntry = {
  name: PrayerName;
  arabic: string;
  time: string;
};

export type PrayerTimesData = {
  locationLabel: string;
  timezone: string;
  gregorianDate: string;
  hijriDate: string;
  methodName: string;
  entries: PrayerTimeEntry[];
};

type AlAdhanResponse = {
  code: number;
  data?: {
    timings: Record<string, string>;
    date: {
      readable: string;
      hijri: {
        day: string;
        month: { en: string };
        year: string;
      };
    };
    meta: {
      timezone: string;
      method: {
        name: string;
      };
    };
  };
};

function cleanTime(value: string | undefined) {
  const match = value?.match(/\d{2}:\d{2}/);
  return match?.[0] ?? "--:--";
}

function buildHijriDate(data: NonNullable<AlAdhanResponse["data"]>) {
  const { day, month, year } = data.date.hijri;
  return `${day} ${month.en} ${year} H`;
}

export function getPrayerConfig(settings: Record<string, string>) {
  const city = settings.prayer_city?.trim() || DEFAULT_PRAYER_CITY;
  const country = settings.prayer_country?.trim() || DEFAULT_PRAYER_COUNTRY;
  const method = settings.prayer_method?.trim() || DEFAULT_PRAYER_METHOD;
  const locationLabel = settings.prayer_location_label?.trim() || `${city}, ${country}`;

  return { city, country, method, locationLabel };
}

export async function getPrayerTimes(settings: Record<string, string>): Promise<PrayerTimesData | null> {
  const { city, country, method, locationLabel } = getPrayerConfig(settings);

  const params = new URLSearchParams({
    city,
    country,
    method,
  });

  try {
    const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?${params.toString()}`, {
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as AlAdhanResponse;
    if (payload.code !== 200 || !payload.data) {
      return null;
    }

    return {
      locationLabel,
      timezone: payload.data.meta.timezone,
      gregorianDate: payload.data.date.readable,
      hijriDate: buildHijriDate(payload.data),
      methodName: payload.data.meta.method.name,
      entries: [
        { name: "Subuh", arabic: "الفجر", time: cleanTime(payload.data.timings.Fajr) },
        { name: "Dzuhur", arabic: "الظهر", time: cleanTime(payload.data.timings.Dhuhr) },
        { name: "Ashar", arabic: "العصر", time: cleanTime(payload.data.timings.Asr) },
        { name: "Maghrib", arabic: "المغرب", time: cleanTime(payload.data.timings.Maghrib) },
        { name: "Isya", arabic: "العشاء", time: cleanTime(payload.data.timings.Isha) },
      ],
    };
  } catch (error) {
    console.error("getPrayerTimes", error);
    return null;
  }
}
