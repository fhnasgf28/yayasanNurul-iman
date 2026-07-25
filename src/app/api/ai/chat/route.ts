import { NextRequest, NextResponse } from "next/server";
import { findKnowledgeResponse, SYSTEM_PROMPT } from "@/lib/ai-knowledge";

const NINEROUTER_API_URL = "http://localhost:20128/v1/chat/completions";
const NINEROUTER_API_KEY = "sk-4d7386fbdacf12b8-0u1sx1-8e899e07";
const NINEROUTER_MODEL = "combo1";

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

    // 2. Primary 9Router AI Engine (Local 9Router Service via secret.txt API Key)
    try {
      const formattedHistory = Array.isArray(history)
        ? history.slice(-6).map((h: { role: string; content: string }) => ({
            role: h.role === "user" ? "user" : "assistant",
            content: h.content,
          }))
        : [];

      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...formattedHistory,
        { role: "user", content: message },
      ];

      const routerRes = await fetch(NINEROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NINEROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: NINEROUTER_MODEL,
          messages,
          stream: false,
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (routerRes.ok) {
        const data = await routerRes.json();
        let aiContent = data?.choices?.[0]?.message?.content;

        // Clean up reasoning thoughts if present
        if (!aiContent && data?.choices?.[0]?.message?.reasoning_content) {
          aiContent = data.choices[0].message.reasoning_content;
        }

        if (aiContent && typeof aiContent === "string" && aiContent.trim()) {
          return NextResponse.json({
            reply: aiContent.trim(),
            source: "9router_ai",
          });
        }
      }
    } catch (routerErr) {
      console.error("9Router AI Error:", routerErr);
    }

    // 3. Fallback to Gemini API if GEMINI_API_KEY environment variable is set
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
      for (const model of models) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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

    // 4. Default Friendly Response
    const fallbackReply = `Assalamu'alaikum Wr. Wb. 🌸

Terima kasih telah menghubungi Asisten Yayasan Nurul Iman. 

Saya siap membantu Anda dengan informasi seputar:
- 📖 *Pendaftaran Santri DTA Nurul Iman* (/pendaftaran-siswa)
- 🕌 *Jadwal Sholat & Kegiatan Masjid* (/jadwal-sholat)
- 📚 *Al-Qur'an Online & Dzikir Pagi Sore* (/masjid/quran)
- 🤲 *Kumpulan Doa Harian* (/masjid/doa)
- 💚 *Donasi & Infaq Yayasan* (/donate)`;

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
