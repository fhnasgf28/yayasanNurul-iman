import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
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
                    <p className="text-gray-600">[Isi alamat lengkap masjid/yayasan]</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 text-xl font-serif">Telepon / WhatsApp</h4>
                    <p className="text-gray-600">[Nomor HP pengurus yang bisa dihubungi]</p>
                    <p className="text-xs text-gray-400 mt-1 italic">Jam Sekretariat: Setiap hari ba'da Maghrib s/d Isya</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-secondary/10 p-4 rounded-2xl text-secondary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1 text-xl font-serif">Email</h4>
                    <p className="text-gray-600">[Email resmi yayasan jika ada]</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-white rounded-3xl border border-secondary/10 flex items-center justify-center text-gray-400 font-medium shadow-sm">
                [ Lokasi Masjid Nurul Iman ]
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-primary/5 border border-secondary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-0" />
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Nama Lengkap Anda"
                      className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Email</label>
                    <input
                      type="email"
                      placeholder="email@anda.com"
                      className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Subjek</label>
                  <input
                    type="text"
                    placeholder="Informasi DTA / Donasi / Lainnya"
                    className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Pesan Anda</label>
                  <textarea
                    rows={6}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary text-primary py-5 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all shadow-lg"
                >
                  <Send size={20} />
                  <span>Kirim Pesan</span>
                </button>
                <p className="text-center text-xs text-gray-400 italic mt-4">
                  Jazakumullahu Khairan. Kami akan segera menghubungi Anda.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
