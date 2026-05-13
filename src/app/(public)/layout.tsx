import dynamic from "next/dynamic";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const BottomNavbar = dynamic(() => import("@/components/public/BottomNavbar"), {
  ssr: false,
});

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pb-20 md:pb-0">{children}</div>
      <BottomNavbar />
      <Footer />
    </div>
  );
}
