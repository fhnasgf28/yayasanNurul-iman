Bertindaklah sebagai Expert Frontend Engineer dan UI/UX Designer. Buatkan saya komponen antarmuka (UI) untuk aplikasi Jadwal Sholat harian yang datanya akan diintegrasikan dengan API Kementerian Agama (Kemenag) RI.

Lucide React untuk ikon.

Tujuan Desain:
Saya menginginkan tampilan visual yang "nyaman", profesional, modern, dan bersih (clean minimalist). Hindari desain kaligrafi atau ornamen Islami yang terlalu ramai; gunakan sentuhan Islami yang subtil, elegan, dan menenangkan (misalnya penggunaan warna soft emerald green, teal, putih bersih, dan efek glassmorphism atau soft shadow).

Fitur & Struktur Komponen yang Dibutuhkan:
1. Header / Hero Section:
   - Menampilkan lokasi pengguna (contoh: "Kota Jakarta", bisa diubah via dropdown/search).
   - Menampilkan tanggal hari ini (Masehi dan Hijriah).
   - Jam digital real-time (berjalan).
   - Highlight / Fokus Utama: Menampilkan "Waktu sholat berikutnya" beserta waktu hitung mundur (countdown) yang mencolok namun tetap elegan.

2. Grid Jadwal Sholat (Card Layout):
   - Tampilkan 6 waktu utama berurutan: Imsak, Subuh, Terbit/Dhuha, Dzuhur, Ashar, Maghrib, Isya.
   - Buat dalam bentuk Card atau List yang responsif (Grid di desktop, List vertikal di mobile).
   - Berikan visual feedback (highlight warna yang berbeda atau efek glow yang soft) pada card waktu sholat yang sedang aktif atau yang paling dekat.
   - Sertakan ikon relevan dari Lucide React untuk masing-masing waktu (misal: Sunrise, Sun, Moon).

3. State Management & Data Fetching (Mockup):
   - Buatkan interface/type TypeScript yang sesuai dengan struktur respons API Kemenag (CityID, Tanggal, dan Waktu Sholat).
   - Buat state untuk loading (skeleton UI yang rapi saat data diambil), error state, dan empty state.
   - Isi dengan dummy data sementara yang terstruktur agar tampilannya bisa langsung dirender sebelum saya menyambungkannya ke fungsi fetch API Kemenag yang asli.

Mohon berikan kode lengkapnya (termasuk styling Tailwind) dalam satu file komponen utama atau pisahkan secara logis jika diperlukan. Pastikan kodenya rapi, modular, dan menerapkan best practice aksesibilitas (accessibility).