Buat komponen BottomNavbar.tsx yang hanya muncul di mobile (< 768px).
Navbar atas tetap ada di desktop, tapi di mobile sembunyikan navbar atas
dan tampilkan bottom navigation bar di bagian bawah layar.

Spesifikasi bottom navbar:
- Fixed di bawah layar (position: fixed, bottom: 0)
- Background: putih hangat (#FFFDF8) dengan border-top tipis emas
- Backdrop blur subtle
- 5 menu icon + label kecil:
  [ 🏠 Beranda ] [ 🕌 Masjid ] [ 📚 DTA ] [ 📰 Berita ] [ ☰ Lainnya ]
- Icon dari Lucide React
- Active state: icon & label berwarna emas (#C8963E), ada dot indicator kecil di atas
- Non-active: abu-abu #9CA3AF
- Tap "Lainnya" → slide-up sheet berisi link Galeri, Kontak, Donasi
- Animasi: slide-up dari bawah saat halaman pertama load
- Tambahkan padding-bottom pada <main> sebesar 80px di mobile
  agar konten tidak tertutup bottom navbar