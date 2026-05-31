import type { Metadata } from "next";

const siteName = "Yayasan Nurul Iman";
const defaultDescription =
  "Menerangi Umat, Membentuk Generasi Qur'ani. Yayasan Nurul Iman berdedikasi memakmurkan Masjid Nurul Iman dan membina generasi muda melalui DTA.";

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!rawUrl) {
    return new URL("http://localhost:3000");
  }

  try {
    return new URL(rawUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export function truncateDescription(value: string, maxLength = 155) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const shortened = normalized.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");

  return `${shortened.slice(0, lastSpace > 80 ? lastSpace : shortened.length).trim()}...`;
}

export function buildPageMetadata({
  title,
  description = defaultDescription,
  path,
  image,
  type = "website",
}: {
  title: string;
  description?: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
}): Metadata {
  const seoDescription = truncateDescription(description);
  const images = image ? [{ url: image, alt: title }] : undefined;

  return {
    title,
    description: seoDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description: seoDescription,
      url: path,
      siteName,
      locale: "id_ID",
      type,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description: seoDescription,
      images: image ? [image] : undefined,
    },
  };
}
