"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Gagal mengirim pesan");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-primary/5 border border-secondary/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-0" />
      
      {success ? (
        <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-primary">Pesan Terkirim!</h3>
            <p className="text-gray-500">Jazakumullahu Khairan. Kami telah menerima pesan Anda dan akan segera menghubungi kembali.</p>
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="text-secondary font-bold hover:underline font-sans"
          >
            Kirim pesan lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Nama Lengkap</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Nama Lengkap Anda"
                className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors font-sans"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="email@anda.com"
                className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors font-sans"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Subjek</label>
            <input
              name="subject"
              type="text"
              required
              placeholder="Informasi DTA / Donasi / Lainnya"
              className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors font-sans"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Pesan Anda</label>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Tulis pesan Anda di sini..."
              className="w-full bg-light border border-secondary/10 rounded-xl py-4 px-6 outline-none focus:border-secondary transition-colors resize-none font-sans"
            ></textarea>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium bg-red-50 p-4 rounded-xl border border-red-100 font-sans">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-primary py-5 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
            <span>{loading ? "Mengirim..." : "Kirim Pesan"}</span>
          </button>
          <p className="text-center text-xs text-gray-400 italic mt-4 font-sans">
            Jazakumullahu Khairan. Kami akan segera menghubungi Anda.
          </p>
        </form>
      )}
    </div>
  );
}
