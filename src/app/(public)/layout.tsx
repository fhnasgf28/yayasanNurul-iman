import { Suspense } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import BottomNavbar from "@/components/public/BottomNavbar";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";
import AdmissionPopupBanner from "@/features/student-registration/AdmissionPopupBanner";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AdmissionPopupBanner settings={settings} />
      <div className="flex-grow pb-20 md:pb-0">{children}</div>
      <FloatingWhatsApp settings={settings} />
      <Suspense fallback={null}>
        <BottomNavbar />
      </Suspense>
      <Footer settings={settings} />
    </div>
  );
}
