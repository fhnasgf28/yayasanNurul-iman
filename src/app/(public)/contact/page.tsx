"use client";

import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Gagal mengirim pesan");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

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
                    <p className="text-gray-600">Guro II, Karawang Barat, Karawang, Jawa Barat 41311</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 text-xl font-serif">Telepon / WhatsApp</h4>
                    <p className="text-gray-600">+62 812-3456-7890</p>
                    <p className="text-xs text-gray-400 mt-1 italic">Jam Sekretariat: Setiap hari ba'da Maghrib s/d Isya</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-secondary/10 p-4 rounded-2xl text-secondary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 text-xl font-serif">Email</h4>
                    <p className="text-gray-600">kontak@yayasannuruliman.org</p>
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
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-primary/5 border border-secondary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-0" />
              
              {success ? (
                <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-primary">Pesan Terkirim!</h3>
                    <p className="text-gray-500">Jazakumullahu Khairan. Kami telah menerima pesan Anda dan akan segera menghubungi kembali.</p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-secondary font-bold hover:underline"
                  >
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">Nama Lengkap</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Nama Lengkap Anda"
                        className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="email@anda.com"
                        className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Subjek</label>
                    <input
                      name="subject"
                      type="text"
                      required
                      placeholder="Informasi DTA / Donasi / Lainnya"
                      className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Pesan Anda</label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      placeholder="Tulis pesan Anda di sini..."
                      className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors resize-none"
                    ></textarea>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-100">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary text-primary py-5 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Send size={20} />
                    )}
                    <span>{loading ? "Mengirim..." : "Kirim Pesan"}</span>
                  </button>
                  <p className="text-center text-xs text-gray-400 italic mt-4">
                    Jazakumullahu Khairan. Kami akan segera menghubungi Anda.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
