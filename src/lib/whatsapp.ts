/**
 * Utilitas notifikasi WhatsApp via wa-gateway lokal (Baileys)
 * Server: /home/fhnasgf/wa-gateway/server.js di port 3002
 *
 * Setup:
 * 1. cd ~/wa-gateway && node server.js
 * 2. Scan QR yang muncul di terminal dengan nomor 083823290281
 * 3. Session tersimpan di ~/wa-gateway/session_auth (tidak perlu scan ulang)
 * 4. Jalankan sebagai service: systemctl --user enable --now wa-gateway
 */

const WA_GATEWAY_URL = process.env.WA_GATEWAY_URL || "http://127.0.0.1:3002";

// Nomor penerima notifikasi (format internasional tanpa + dan spasi)
const NOTIF_RECIPIENTS = [
  "6281514846433", // +62 815-1484-6433
  "6281199904033", // +62 811-9990-403
];

interface SendWAOptions {
  to: string;
  message: string;
}

async function sendWhatsApp({ to, message }: SendWAOptions): Promise<boolean> {
  try {
    const res = await fetch(`${WA_GATEWAY_URL}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, message }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[WA] Gagal kirim ke ${to}: ${res.status} ${err}`);
      return false;
    }

    console.log(`[WA] ✅ Pesan terkirim ke ${to}`);
    return true;
  } catch (err) {
    // Jika gateway tidak jalan, log warning tapi jangan crash
    console.warn(`[WA] Gateway tidak tersedia, skip notifikasi ke ${to}`);
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
