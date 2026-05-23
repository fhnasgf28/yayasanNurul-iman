import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-arabic",
});

export const metadata: Metadata = {
  title: "Yayasan Nurul Iman | Masjid & DTA Islami",
  description: "Menerangi Umat, Membentuk Generasi Qur'ani. Yayasan Nurul Iman berdedikasi memakmurkan Masjid Nurul Iman dan membina generasi muda melalui DTA.",
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
          dmSans.variable,
          notoArabic.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
