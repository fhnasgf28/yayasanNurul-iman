import { Suspense } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import BottomNavbar from "@/components/public/BottomNavbar";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pb-20 md:pb-0">{children}</div>
      <FloatingWhatsApp />
      <Suspense fallback={null}>
        <BottomNavbar />
      </Suspense>
      <Footer />
    </div>
  );
}
