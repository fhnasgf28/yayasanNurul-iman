import { NextRequest, NextResponse } from "next/server";
import { findKnowledgeResponse, SYSTEM_PROMPT } from "@/lib/ai-knowledge";

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

    // 1. Fast Knowledge Base Search (Instant zero-latency answer for official Yayasan info)
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
      // Try models in order: gemini-2.0-flash -> gemini-1.5-flash
      const models = ["gemini-2.0-flash", "gemini-1.5-flash"];

      for (const model of models) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

          // Format conversation history for Gemini API
          const formattedHistory = Array.isArray(history)
            ? history.slice(-6).map((h: { role: string; content: string }) => ({
                role: h.role === "user" ? "user" : "model",
                parts: [{ text: h.content }],
              }))
            : [];

          const contents = [
            ...formattedHistory,
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
                maxOutputTokens: 400,
                temperature: 0.7,
              },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (replyText) {
              return NextResponse.json({
                reply: replyText,
                source: `gemini_api_${model}`,
              });
            }
          }
        } catch (err) {
          console.error(`Gemini model ${model} error:`, err);
        }
      }
    }

    // 3. Fallback Response if GEMINI_API_KEY is missing in .env
    const setupGuideReply = `Assalamu'alaikum Wr. Wb. 🌸

Terima kasih atas pertanyaannya! 

Untuk mengaktifkan jawaban **AI Gemini Generatif Luwes** secara penuh untuk pertanyaan umum di luar sistem basis pengetahuan yayasan, tambahkan **GEMINI_API_KEY** di file \`.env\` server:

\`\`\`env
GEMINI_API_KEY="AIzaSy..."
\`\`\`

*(API Key gratis dapat dibuat di: https://aistudio.google.com/)*

Saat ini saya dapat membantu Anda secara instan untuk informasi:
- 📖 *Pendaftaran Santri DTA Nurul Iman* (/pendaftaran-siswa)
- 🕌 *Jadwal Sholat & Kegiatan Masjid* (/jadwal-sholat)
- 📚 *Al-Qur'an Online & Dzikir Pagi Sore* (/masjid/quran)
- 🤲 *Kumpulan Doa Harian* (/masjid/doa)
- 💚 *Donasi & Infaq Yayasan* (/donate)`;

    return NextResponse.json({
      reply: setupGuideReply,
      source: "setup_guide",
    });
  } catch (error) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada layanan AI" },
      { status: 500 }
    );
  }
}
