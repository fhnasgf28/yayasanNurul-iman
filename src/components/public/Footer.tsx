import Link from "next/link";
import { Mail, MapPin, Phone, Camera, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Foundation Info */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
              🕌
            </div>
            <h3 className="text-2xl font-serif font-bold text-secondary">
              Nurul Iman
            </h3>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            "Menerangi Umat, Membentuk Generasi Qur'ani" - Yayasan Nurul Iman berdedikasi untuk memakmurkan masjid dan mendidik generasi muda yang cinta Al-Qur'an.
          </p>
          <div className="flex space-x-4 pt-2">
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
              <Camera size={20} />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
              <Send size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-serif font-semibold mb-6 text-secondary">Tautan Langsung</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li><Link href="/" className="hover:text-secondary transition-colors">Beranda</Link></li>
            <li><Link href="/about" className="hover:text-secondary transition-colors">Tentang Kami</Link></li>
            <li><Link href="/news" className="hover:text-secondary transition-colors">Berita & Kegiatan</Link></li>
            <li><Link href="/gallery" className="hover:text-secondary transition-colors">Galeri Foto</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors">Kontak</Link></li>
            <li><Link href="/donate" className="hover:text-secondary transition-colors">Donasi</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-serif font-semibold mb-6 text-secondary">Program Utama</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li><Link href="/programs?category=Masjid" className="hover:text-secondary transition-colors">Kemakmuran Masjid</Link></li>
            <li><Link href="/programs?category=Pendidikan" className="hover:text-secondary transition-colors">DTA Nurul Iman</Link></li>
            <li><Link href="/programs?category=Pendidikan" className="hover:text-secondary transition-colors">Tahfidz Al-Qur'an</Link></li>
            <li><Link href="/programs?category=Sosial" className="hover:text-secondary transition-colors">Beasiswa Santri</Link></li>
            <li><Link href="/programs?category=Masjid" className="hover:text-secondary transition-colors">Kajian Rutin</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-serif font-semibold mb-6 text-secondary">Hubungi Kami</h4>
          <ul className="space-y-4 text-sm opacity-80">
            <li className="flex items-start space-x-3">
              <MapPin size={20} className="text-secondary shrink-0" />
              <span>[Alamat Lengkap Masjid/Yayasan]</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={20} className="text-secondary shrink-0" />
              <span>[Nomor HP/WA Pengurus]</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={20} className="text-secondary shrink-0" />
              <span>[Email Resmi Yayasan]</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center space-y-6">
        <div className="space-y-2">
          <p className="font-arabic text-xl text-secondary">وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى</p>
          <p className="text-xs opacity-60 italic">"Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa." (QS. Al-Ma'idah: 2)</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-40 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Yayasan Nurul Iman. Semoga Allah meridhai setiap langkah kebaikan kita.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-secondary">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-secondary">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
