/**
 * Utilitas notifikasi WhatsApp via OpenWA (self-hosted)
 * Dokumentasi API: http://localhost:2785/api/docs
 *
 * Setup:
 * 1. Jalankan OpenWA: docker compose -f docker-compose.dev.yml up -d
 * 2. Buka http://localhost:2785 → buat API key → scan QR dengan nomor pengirim
 * 3. Isi env vars di .env:
 *    OPENWA_API_KEY=your-api-key
 *    OPENWA_SESSION_ID=default  (nama session di OpenWA)
 *    OPENWA_BASE_URL=http://localhost:2785
 */

const OPENWA_BASE_URL = process.env.OPENWA_BASE_URL || "http://localhost:2785";
const OPENWA_API_KEY = process.env.OPENWA_API_KEY || "";
const OPENWA_SESSION_ID = process.env.OPENWA_SESSION_ID || "default";

// Nomor penerima notifikasi (tanpa tanda + dan spasi, gunakan format internasional)
const NOTIF_RECIPIENTS = [
  "6281514846433", // +62 815-1484-6433
  "6281199904033", // +62 811-9990-403
];

interface SendWAOptions {
  to: string;
  message: string;
}

async function sendWhatsApp({ to, message }: SendWAOptions): Promise<boolean> {
  if (!OPENWA_API_KEY) {
    console.warn("[WA] OPENWA_API_KEY belum diset, skip notifikasi");
    return false;
  }

  try {
    const res = await fetch(
      `${OPENWA_BASE_URL}/api/${OPENWA_SESSION_ID}/messages/send-text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": OPENWA_API_KEY,
        },
        body: JSON.stringify({ chatId: `${to}@c.us`, text: message }),
        signal: AbortSignal.timeout(10_000), // 10 detik timeout
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error(`[WA] Gagal kirim ke ${to}: ${res.status} ${err}`);
      return false;
    }

    console.log(`[WA] ✅ Pesan terkirim ke ${to}`);
    return true;
  } catch (err) {
    console.error(`[WA] Error kirim ke ${to}:`, err);
    return false;
  }
}

/**
 * Kirim notifikasi pendaftaran siswa baru ke semua admin
 */
export async function notifyNewStudentRegistration(data: {
  nama: string;
  namaOrangTua: string;
  noHp: string;
  program?: string;
  tanggal: string;
}) {
  const message =
    `🔔 *Pendaftaran Siswa Baru*\n` +
    `──────────────────────\n` +
    `👤 *Nama*        : ${data.nama}\n` +
    `👨‍👩‍👦 *Orang Tua* : ${data.namaOrangTua}\n` +
    `📱 *No. HP*      : ${data.noHp}\n` +
    (data.program ? `📚 *Program*    : ${data.program}\n` : "") +
    `📅 *Tanggal*    : ${data.tanggal}\n` +
    `──────────────────────\n` +
    `👉 Lihat di dashboard:\n` +
    `https://yayasannuruliman.clipperyt.online/dashboard/registrations`;

  // Kirim ke semua penerima secara paralel, jangan sampai error 1 nomor block nomor lain
  await Promise.allSettled(
    NOTIF_RECIPIENTS.map((to) => sendWhatsApp({ to, message }))
  );
}
