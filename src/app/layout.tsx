import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { getSiteUrl } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
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
  },
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
          notoArabic.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
