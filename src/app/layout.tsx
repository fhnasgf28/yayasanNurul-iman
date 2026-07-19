import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Amiri } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import PWARegistration from "@/components/PWARegistration";
import { defaultOgImage, defaultOgImageAlt, getSiteUrl } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Yayasan Nurul Iman | Masjid & DTA Islami",
    template: "%s | Yayasan Nurul Iman",
  },
  description: "Menerangi Umat, Membentuk Generasi Qur'ani. Yayasan Nurul Iman berdedikasi memakmurkan Masjid Nurul Iman dan membina generasi muda melalui DTA.",
  applicationName: "Yayasan Nurul Iman",
  authors: [{ name: "Yayasan Nurul Iman" }],
  creator: "Yayasan Nurul Iman",
  publisher: "Yayasan Nurul Iman",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Yayasan Nurul Iman | Masjid & DTA Islami",
    description: "Menerangi Umat, Membentuk Generasi Qur'ani. Yayasan Nurul Iman berdedikasi memakmurkan Masjid Nurul Iman dan membina generasi muda melalui DTA.",
    url: "/",
    siteName: "Yayasan Nurul Iman",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: defaultOgImage,
        width: 1600,
        height: 900,
        alt: defaultOgImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yayasan Nurul Iman | Masjid & DTA Islami",
    description: "Menerangi Umat, Membentuk Generasi Qur'ani. Yayasan Nurul Iman berdedikasi memakmurkan Masjid Nurul Iman dan membina generasi muda melalui DTA.",
    images: [
      {
        url: defaultOgImage,
        width: 1600,
        height: 900,
        alt: defaultOgImageAlt,
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nurul Iman",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A4D2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={cn(
          "min-h-screen bg-[#FDFAF4] font-sans antialiased",
          playfair.variable,
          jakarta.variable,
          amiri.variable
        )}
      >
        <PWARegistration />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
