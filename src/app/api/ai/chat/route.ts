import { NextRequest, NextResponse } from "next/server";
import { findKnowledgeResponse, SYSTEM_PROMPT } from "@/lib/ai-knowledge";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" },
        { status: 400 }
      );
    }

    // 1. Fast Knowledge Base Search (Instant zero-latency answer)
    const matchedResponse = findKnowledgeResponse(message);
    if (matchedResponse) {
      return NextResponse.json({
        reply: matchedResponse,
        source: "knowledge_base",
      });
    }

    // 2. Try Gemini API if GEMINI_API_KEY environment variable is set
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const contents = [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\n\nPertanyaan Jamaah: ${message}` }],
          },
        ];

        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              maxOutputTokens: 350,
              temperature: 0.7,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const replyText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({
              reply: replyText,
              source: "gemini_api",
            });
          }
        }
      } catch (geminiErr) {
        console.error("Gemini API Error:", geminiErr);
      }
    }

    // 3. Try Local AGY CLI Runner (If running locally & AGY binary is accessible)
    try {
      const sanitizedPrompt = message.replace(/["'`$\\]/g, "");
      const { stdout } = await execAsync(
        `agy --print "${SYSTEM_PROMPT.replace(/\n/g, " ")} Pertanyaan: ${sanitizedPrompt}"`,
        { timeout: 8000 }
      );
      if (stdout && stdout.trim()) {
        return NextResponse.json({
          reply: stdout.trim(),
          source: "agy_cli",
        });
      }
    } catch (agyErr) {
      // AGY CLI timeout or non-CLI environment, fallback gracefully
    }

    // 4. Friendly Islamic Fallback Response
    const fallbackReply = `Assalamu'alaikum Wr. Wb. 🌸

Terima kasih telah menghubungi Asisten Yayasan Nurul Iman. 

Saya siap membantu Anda dengan informasi mengenai:
- 📖 *Pendaftaran Santri DTA Nurul Iman* (/pendaftaran-siswa)
- 🕌 *Jadwal Sholat & Kegiatan Masjid* (/jadwal-sholat)
- 📚 *Al-Qur'an Online & Dzikir Pagi Sore* (/masjid/quran)
- 🤲 *Kumpulan Doa Harian* (/masjid/doa)
- 💚 *Donasi & Infaq Yayasan* (/donate)

Ada yang bisa kami bantu seputar kegiatan yayasan?`;

    return NextResponse.json({
      reply: fallbackReply,
      source: "fallback",
    });
  } catch (error) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada layanan AI" },
      { status: 500 }
    );
  }
}
