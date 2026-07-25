"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Trash2,
  Lock,
  LogIn,
  HelpCircle,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const MAX_DAILY_MESSAGES = 20;
const EXPIRY_DAYS = 14; // Auto-delete sessions older than 14 days

export default function AIChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load chat history & check 14-day expiry / daily limit
  useEffect(() => {
    try {
      // 1. Check Auto-Expiry (14 Days)
      const lastSavedTime = localStorage.getItem("nurul-iman-ai-saved-at");
      const now = Date.now();
      const fourteenDaysMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

      if (lastSavedTime && now - parseInt(lastSavedTime) > fourteenDaysMs) {
        // Expired! Auto-cleanup history
        localStorage.removeItem("nurul-iman-ai-messages");
        localStorage.removeItem("nurul-iman-ai-saved-at");
      }

      // 2. Load Messages
      const savedMsgs = localStorage.getItem("nurul-iman-ai-messages");
      if (savedMsgs) {
        setMessages(JSON.parse(savedMsgs));
      } else {
        // Initial welcome message
        setMessages([
          {
            id: "welcome-1",
            sender: "ai",
            text: "Assalamu'alaikum Wr. Wb. 🌸\n\nSaya **Asisten AI Nurul Iman**. Saya siap menjawab pertanyaan seputar kegiatan Yayasan, Masjid, DTA, Jadwal Sholat, Al-Qur'an, Dzikir, Doa, Pendaftaran, serta Tanya Jawab Keagamaan umum.",
            timestamp: new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }

      // 3. Daily Limit Tracker
      const todayKey = `nurul-iman-ai-count-${new Date().toISOString().split("T")[0]}`;
      const count = localStorage.getItem(todayKey);
      if (count) setDailyCount(parseInt(count));
    } catch {}
  }, []);

  // Save messages to localStorage
  const saveMessagesToStorage = (newMsgs: ChatMessage[]) => {
    try {
      localStorage.setItem("nurul-iman-ai-messages", JSON.stringify(newMsgs));
      localStorage.setItem("nurul-iman-ai-saved-at", Date.now().toString());
    } catch {}
  };

  // Clear Chat History
  const handleClearHistory = () => {
    const defaultMsg: ChatMessage[] = [
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: "Assalamu'alaikum Wr. Wb. 🌸\n\nRiwayat obrolan telah dibersihkan. Ada yang bisa saya bantu?",
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
    setMessages(defaultMsg);
    saveMessagesToStorage(defaultMsg);
  };

  // Send Message Handler
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    if (dailyCount >= MAX_DAILY_MESSAGES) {
      alert(
        `Batas obrolan harian (${MAX_DAILY_MESSAGES} pesan) telah tercapai hari ini. Silakan coba kembali besok!`
      );
      return;
    }

    const timeStr = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: timeStr,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    // Update Daily Limit Count
    const newCount = dailyCount + 1;
    setDailyCount(newCount);
    const todayKey = `nurul-iman-ai-count-${new Date().toISOString().split("T")[0]}`;
    try {
      localStorage.setItem(todayKey, newCount.toString());
    } catch {}

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: updatedMessages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const aiReplyText =
        data.reply ||
        "Mohon maaf, terjadi kendala saat memproses jawaban. Silakan coba beberapa saat lagi.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const finalMessages = [...updatedMessages, aiMsg];
      setMessages(finalMessages);
      saveMessagesToStorage(finalMessages);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "ai",
        text: "Maaf, terjadi gangguan jaringan. Silakan periksa koneksi internet Anda.",
        timestamp: timeStr,
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Bagaimana cara mendaftar DTA?",
    "Apa keutamaan Puasa Ayyamul Bidh?",
    "Kapan jadwal kajian Subuh?",
    "Bagaimana tata cara wudhu?",
  ];

  return (
    // Stacked above WhatsApp (bottom-24 on mobile & desktop so they never collide)
    <div className="fixed bottom-24 right-4 md:right-8 z-[80] font-sans print:hidden">
      {/* --- FLOATING CHAT BUTTON --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="group bg-[#1A4D2E] text-[#C8963E] p-3.5 md:p-4 rounded-full shadow-2xl hover:shadow-emerald-900/40 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 border-2 border-[#C8963E]/40"
            aria-label="Tanya Asisten AI Nurul Iman"
          >
            <div className="relative">
              <Bot size={24} className="text-white group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1A4D2E] animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1A4D2E]" />
            </div>
            <span className="font-bold text-xs text-white hidden sm:inline-block pr-1">
              Tanya Asisten AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- EXPANDABLE CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-white rounded-3xl border border-secondary/20 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* CHAT HEADER */}
            <div className="bg-gradient-to-r from-[#1A4D2E] via-[#163e25] to-[#0f2c1a] text-white p-4 flex items-center justify-between border-b border-[#C8963E]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#C8963E] shrink-0">
                  <Bot size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-white">
                      Asisten Nurul Iman AI
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-emerald-200">
                    {session ? `Pengguna: ${session.user?.name || "Member"}` : `Sisa Kuota: ${MAX_DAILY_MESSAGES - dailyCount}/${MAX_DAILY_MESSAGES}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  className="p-2 text-white/70 hover:text-rose-300 transition rounded-xl hover:bg-white/10"
                  title="Hapus Riwayat Chat"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/70 hover:text-white transition rounded-xl hover:bg-white/10"
                  aria-label="Tutup Obrolan"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* LOGIN CALLOUT BANNER (For General AI Access) */}
            {!session && (
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-b border-amber-500/20 px-3.5 py-2.5 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-amber-900">
                  <Lock size={14} className="shrink-0 text-amber-600" />
                  <span className="text-[11px] font-medium leading-tight">
                    Ingin percakapan AI tanpa batas?
                  </span>
                </div>
                <Link
                  href="/login"
                  className="bg-[#1A4D2E] text-[#C8963E] font-bold text-[10px] px-3 py-1.5 rounded-xl hover:bg-[#153e25] transition shrink-0 flex items-center gap-1 shadow-sm"
                >
                  <LogIn size={12} /> Login Akun
                </Link>
              </div>
            )}

            {/* MESSAGES CONTAINER */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FDFAF4] text-xs">
              {messages.map((msg) => {
                const isAi = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isAi ? "items-start" : "items-end"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-sm ${
                        isAi
                          ? "bg-white border border-secondary/20 text-gray-900 rounded-tl-sm"
                          : "bg-[#1A4D2E] text-white rounded-tr-sm font-medium"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-primary font-semibold text-xs p-2 bg-white/80 rounded-xl border border-secondary/20 w-max">
                  <Sparkles size={14} className="animate-spin text-secondary" />
                  <span>Asisten sedang mengetik...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK PROMPT PILLS */}
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[10px]">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1.5 rounded-xl bg-gray-50 border border-secondary/15 text-primary hover:bg-secondary/10 whitespace-nowrap font-medium transition disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* CHAT INPUT FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tulis pertanyaan umum / seputar yayasan..."
                disabled={isLoading || dailyCount >= MAX_DAILY_MESSAGES}
                className="flex-1 px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 outline-none focus:border-primary transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading || dailyCount >= MAX_DAILY_MESSAGES}
                className="p-2.5 rounded-xl bg-[#1A4D2E] text-[#C8963E] hover:bg-[#153e25] transition disabled:opacity-40 shrink-0"
              >
                <Send size={16} />
              </button>
            </form>

            {/* EXPIRY NOTICE */}
            <div className="bg-gray-50 text-[9px] text-gray-400 text-center py-1 border-t border-gray-100">
              ⏱️ Sesi obrolan otomatis dibersihkan setelah 14 hari
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
