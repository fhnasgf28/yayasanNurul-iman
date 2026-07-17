"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

const defaultMessage =
  "Assalamu'alaikum, saya ingin bertanya tentang Yayasan Nurul Iman.";

interface FloatingWhatsAppProps {
  settings?: Record<string, string>;
}

export default function FloatingWhatsApp({ settings }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  const rawWa = settings?.whatsapp_number || settings?.contact_phone || "6283823290281";
  const whatsappNumber = rawWa.replace(/\D/g, "").startsWith("0")
    ? "62" + rawWa.replace(/\D/g, "").slice(1)
    : rawWa.replace(/\D/g, "") || "6283823290281";

  const trimmedMessage = message.trim();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    trimmedMessage || defaultMessage
  )}`;

  return (
    <div className="fixed bottom-[108px] right-4 z-[85] md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="mb-4 w-[min(calc(100vw-2rem),22rem)] overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/90 shadow-[0_24px_70px_rgba(26,77,46,0.22)] backdrop-blur-2xl"
          >
            <div className="bg-primary px-5 py-4 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.24)]">
                    <MessageCircle size={22} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">Chat WhatsApp</p>
                    <p className="mt-0.5 text-xs text-white/65">Pengurus Yayasan Nurul Iman</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Tutup WhatsApp"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <label htmlFor="floating-whatsapp-message" className="block text-sm font-bold text-primary">
                Tulis pesan
              </label>
              <textarea
                id="floating-whatsapp-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-2xl border border-secondary/15 bg-light px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-secondary"
                placeholder="Tulis pesan Anda..."
              />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,211,102,0.28)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send size={17} />
                Kirim ke WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={isOpen ? "Tutup WhatsApp" : "Buka WhatsApp"}
        onClick={() => setIsOpen((open) => !open)}
        className="group flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.36)] ring-8 ring-[#25D366]/12 transition-transform hover:-translate-y-1 active:translate-y-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 320, damping: 22 }}
      >
        <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
        <MessageCircle size={30} className="relative" />
      </motion.button>
    </div>
  );
}
