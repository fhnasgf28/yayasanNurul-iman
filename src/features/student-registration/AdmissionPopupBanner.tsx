"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, GraduationCap, X } from "lucide-react";

type AdmissionPopupBannerProps = {
  settings: Record<string, string>;
};

export default function AdmissionPopupBanner({ settings }: AdmissionPopupBannerProps) {
  const enabled = settings.admission_popup_enabled !== "false";
  const title = settings.admission_popup_title || "Penerimaan Siswa Baru DTA Nurul Iman";
  const description =
    settings.admission_popup_description ||
    "Pendaftaran siswa baru untuk program DTA, Tahfidz, dan baca tulis Al-Qur'an telah dibuka.";
  const badge = settings.admission_popup_badge || "Penerimaan Siswa Baru";
  const ctaLabel = settings.admission_popup_cta_label || "Daftar Sekarang";
  const ctaHref = settings.admission_popup_cta_href || "/pendaftaran-siswa";
  const storageKey = useMemo(() => `admission-popup-dismissed:${title}`, [title]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(window.sessionStorage.getItem(storageKey) !== "true");
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [enabled, storageKey]);

  const dismiss = () => {
    window.sessionStorage.setItem(storageKey, "true");
    setIsVisible(false);
  };

  if (!enabled || !isVisible) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-end justify-center bg-primary/35 px-4 pb-5 backdrop-blur-[2px] sm:items-center sm:pb-0">
      <section className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/50 bg-white shadow-[0_30px_90px_rgba(26,77,46,0.24)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-secondary" />
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 z-10 rounded-2xl bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-primary"
          aria-label="Tutup popup"
        >
          <X size={18} />
        </button>

        <div className="grid gap-0 sm:grid-cols-[0.85fr_1.15fr]">
          <div className="relative hidden bg-primary p-8 text-white sm:block">
            <div className="absolute inset-0 bg-islamic opacity-15" />
            <div className="relative flex h-full min-h-64 flex-col justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary text-primary">
                <GraduationCap size={28} />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Nurul Iman</p>
                <p className="mt-3 text-3xl font-serif font-bold leading-tight">Buka Pendaftaran</p>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">
              <GraduationCap size={15} />
              {badge}
            </div>
            <h2 className="pr-10 text-2xl font-serif font-bold leading-tight text-primary sm:text-3xl">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">{description}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={ctaHref}
                onClick={dismiss}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                {ctaLabel}
                <ArrowRight size={17} />
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-50"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}
