import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { getSettings } from "@/lib/settings";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Hubungi Kami | Yayasan Nurul Iman",
  description: "Hubungi Yayasan Nurul Iman untuk pertanyaan seputar DTA, infaq, program kemitraan, atau kunjungan langsung.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  const address = settings.address || "Guro II, Karawang Barat, Karawang, Jawa Barat 41311";
  const phoneNumber = settings.phone_number || "+62 812-3456-7890";
  const emailAddress = settings.email || "kontak@yayasannuruliman.org";
  
  // Format WhatsApp Link
  const rawWhatsApp = settings.whatsapp_number || settings.phone_number || "";
  const cleanWhatsApp = rawWhatsApp.replace(/[^0-9]/g, "");
  const formattedWhatsApp = cleanWhatsApp.startsWith("0") 
    ? "62" + cleanWhatsApp.slice(1) 
    : cleanWhatsApp.startsWith("62") 
      ? cleanWhatsApp 
      : "6281234567890";

  return (
    <main className="pt-20">
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Hubungi Kami</h1>
          <p className="text-white/70 text-lg md:text-xl italic font-arabic mt-4 text-secondary">
            Assalamu'alaikum Warahmatullahi Wabarakatuh
          </p>
          <p className="text-white/70 text-lg md:text-xl">Kami siap mendengar saran, pertanyaan, atau niat baik Anda untuk berkolaborasi memakmurkan masjid dan membina santri.</p>
        </div>
      </section>

      <section className="py-24 px-6 bg-islamic">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold text-primary">Informasi Kontak</h2>
                <p className="text-gray-500">Kunjungi sekretariat kami atau hubungi kami melalui saluran berikut:</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-secondary/10 p-4 rounded-2xl text-secondary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 text-xl font-serif">Alamat Sekretariat</h4>
                    <p className="text-gray-600 font-sans">{address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 text-xl font-serif">Telepon / WhatsApp</h4>
                    <p className="text-gray-600 font-sans">{phoneNumber}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs text-gray-400 italic">Jam Sekretariat: Setiap hari ba'da Maghrib s/d Isya</span>
                      {rawWhatsApp && (
                        <a
                          href={`https://wa.me/${formattedWhatsApp}?text=Assalamu'alaikum%20Yayasan%20Nurul%20Iman`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-bold text-emerald-600 hover:underline"
                        >
                          Chat WhatsApp →
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-secondary/10 p-4 rounded-2xl text-secondary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 text-xl font-serif">Email</h4>
                    <p className="text-gray-600 font-sans">{emailAddress}</p>
                  </div>
                </div>
              </div>

              {/* Map Integration */}
              <div className="space-y-4">
                <div className="h-80 bg-white rounded-3xl border border-secondary/10 overflow-hidden shadow-sm relative z-10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7348366914565!2d107.3064129758652!3d-6.326611093662993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6976347b7c0b49%3A0x31809b5844f365ba!2sMasjid%20Nurul%20Iman!5e0!3m2!1sid!2sid!4v1716719123456!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: "auto" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Masjid Nurul Iman"
                    className="relative z-20"
                  ></iframe>
                </div>
                <a
                  href="https://maps.app.goo.gl/M7BnLk6cvwTGnRT37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-secondary font-bold hover:underline"
                >
                  <MapPin size={18} />
                  <span>Buka di Google Maps</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
