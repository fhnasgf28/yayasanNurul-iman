"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle, Eye, EyeOff, Download, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as NavigatorWithStandalone).standalone);
    const alreadyShown = sessionStorage.getItem("nurul-iman-install-popup") === "dismissed";
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isStandalone || alreadyShown || !isMobile) return;

    const popupTimer = window.setTimeout(() => setShowInstallPopup(true), 900);
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setShowInstallPopup(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.clearTimeout(popupTimer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const closeInstallPopup = () => {
    sessionStorage.setItem("nurul-iman-install-popup", "dismissed");
    setShowInstallPopup(false);
  };

  const handleInstallApp = async () => {
    if (!installPrompt) {
      closeInstallPopup();
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice.catch(() => undefined);
    setInstallPrompt(null);
    closeInstallPopup();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah. Silakan coba lagi.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-islamic px-6 py-12">
      <AnimatePresence>
        {showInstallPopup && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-primary/35 px-4 pb-6 backdrop-blur-sm sm:items-center sm:pb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              className="w-full max-w-sm rounded-[2rem] border border-secondary/15 bg-white p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-primary">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-primary">Pasang Aplikasi?</h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                    PWA siap digunakan
                  </p>
                </div>
              </div>
              <p className="text-sm leading-6 text-gray-500">
                Tambahkan Yayasan Nurul Iman ke layar utama smartphone agar akses login dan dashboard lebih cepat.
              </p>
              {!installPrompt && (
                <p className="mt-3 text-xs leading-5 text-gray-400">
                  Jika tombol install browser belum muncul, gunakan menu Share atau titik tiga lalu pilih Add to Home Screen.
                </p>
              )}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeInstallPopup}
                  className="flex-1 rounded-2xl border border-primary/10 px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                >
                  Nanti
                </button>
                <button
                  type="button"
                  onClick={handleInstallApp}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-secondary hover:text-primary"
                >
                  <Download size={17} />
                  <span>{installPrompt ? "Pasang" : "Mengerti"}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center text-primary font-bold text-4xl shadow-2xl mx-auto mb-6"
          >
            🕌
          </motion.div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Login Admin</h1>
          <p className="text-gray-500 italic">Selamat datang kembali di Panel Yayasan Nurul Iman</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-secondary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-0" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center space-x-3 text-sm"
              >
                <AlertCircle size={18} />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary ml-1">Email Resmi</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@nuruliman.or.id"
                  className="w-full bg-light border border-secondary/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-secondary transition-all shadow-sm"
                />
              </div>
              <p className="text-xs text-gray-400 ml-1">Format: <span className="font-mono font-semibold">username@nuruliman.or.id</span></p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-light border border-secondary/10 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-secondary transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 mt-8",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8 italic">
            Hanya diizinkan untuk pengurus Yayasan Nurul Iman.
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/")}
            className="text-primary/60 hover:text-primary text-sm font-medium transition-colors"
          >
            ← Kembali ke Website Utama
          </button>
        </div>
      </motion.div>
    </main>
  );
}
