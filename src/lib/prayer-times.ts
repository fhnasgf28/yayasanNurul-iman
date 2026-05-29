const DEFAULT_PRAYER_LOCATION_LABEL = "Telukjambe Timur, Karawang";
const DEFAULT_PRAYER_CITY = "Karawang";
const DEFAULT_PRAYER_COUNTRY = "Indonesia";
const DEFAULT_PRAYER_METHOD = "20";
const DEFAULT_PRAYER_LATITUDE = "-6.3293";
const DEFAULT_PRAYER_LONGITUDE = "107.2892";
const LEGACY_PRAYER_CITY = "Jakarta";
const LEGACY_PRAYER_LOCATION_LABEL = "Jakarta, Indonesia";

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
  imsakTime: string;
  sunriseTime: string;
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

function parseCoordinate(value: string | undefined, min: number, max: number) {
  if (!value) return null;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) return null;

  return String(parsed);
}

function getJakartaDatePath(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date);

  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  return day && month && year ? `${day}-${month}-${year}` : undefined;
}

function normalizeText(value: string | undefined) {
  return value?.toLowerCase().replace(/\s+/g, " ").trim();
}

export function getPrayerConfig(settings: Record<string, string>) {
  const rawCity = settings.prayer_city?.trim();
  const rawCountry = settings.prayer_country?.trim();
  const rawLocationLabel = settings.prayer_location_label?.trim();
  const rawLatitude = settings.prayer_latitude?.trim();
  const rawLongitude = settings.prayer_longitude?.trim();
  const normalizedCity = normalizeText(rawCity);
  const normalizedLocationLabel = normalizeText(rawLocationLabel);
  const usesLegacyJakartaDefaults =
    !rawLatitude &&
    !rawLongitude &&
    normalizedCity === normalizeText(LEGACY_PRAYER_CITY) &&
    (!rawLocationLabel || normalizedLocationLabel === normalizeText(LEGACY_PRAYER_LOCATION_LABEL));
  const usesTelukjambeDefaults =
    !rawLatitude &&
    !rawLongitude &&
    normalizedCity === normalizeText(DEFAULT_PRAYER_CITY) &&
    (!rawLocationLabel || normalizedLocationLabel === normalizeText(DEFAULT_PRAYER_LOCATION_LABEL));
  const hasNoLocationSettings = !rawCity && !rawLocationLabel && !rawLatitude && !rawLongitude;
  const usesDefaultLocation = usesLegacyJakartaDefaults || usesTelukjambeDefaults || hasNoLocationSettings;

  const city = usesLegacyJakartaDefaults ? DEFAULT_PRAYER_CITY : rawCity || DEFAULT_PRAYER_CITY;
  const country = rawCountry || DEFAULT_PRAYER_COUNTRY;
  const method = settings.prayer_method?.trim() || DEFAULT_PRAYER_METHOD;
  const locationLabel = usesDefaultLocation
    ? DEFAULT_PRAYER_LOCATION_LABEL
    : rawLocationLabel || `${city}, ${country}`;
  const latitude = parseCoordinate(usesDefaultLocation ? DEFAULT_PRAYER_LATITUDE : rawLatitude, -90, 90);
  const longitude = parseCoordinate(usesDefaultLocation ? DEFAULT_PRAYER_LONGITUDE : rawLongitude, -180, 180);

  return { city, country, method, locationLabel, latitude, longitude };
}

export async function getPrayerTimes(settings: Record<string, string>): Promise<PrayerTimesData | null> {
  const { city, country, method, locationLabel, latitude, longitude } = getPrayerConfig(settings);
  const hasCoordinates = Boolean(latitude && longitude);
  const datePath = getJakartaDatePath();

  const params = hasCoordinates
    ? new URLSearchParams({
        latitude: latitude as string,
        longitude: longitude as string,
        method,
      })
    : new URLSearchParams({
        city,
        country,
        method,
      });

  const endpoint =
    hasCoordinates && datePath
      ? `https://api.aladhan.com/v1/timings/${datePath}?${params.toString()}`
      : `https://api.aladhan.com/v1/timingsByCity?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
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
      imsakTime: cleanTime(payload.data.timings.Imsak),
      sunriseTime: cleanTime(payload.data.timings.Sunrise),
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
