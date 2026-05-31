"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Edit, FileText, Plus, Save, Trash2, X } from "lucide-react";
import {
  donationCategories,
  donationCategoryLabels,
  formatCurrency,
  formatMonth,
  toMonthInputValue,
  type DonationCategoryValue,
  type DonationReportItem,
} from "@/lib/finance";

type FormState = {
  id?: string;
  title: string;
  month: string;
  category: DonationCategoryValue;
  income: string;
  expense: string;
  notes: string;
  published: boolean;
};

const defaultForm: FormState = {
  title: "",
  month: new Date().toISOString().slice(0, 7),
  category: "OPERASIONAL_MASJID",
  income: "0",
  expense: "0",
  notes: "",
  published: true,
};

function toFormState(report: DonationReportItem): FormState {
  return {
    id: report.id,
    title: report.title,
    month: toMonthInputValue(report.month),
    category: report.category,
    income: String(report.income),
    expense: String(report.expense),
    notes: report.notes ?? "",
    published: report.published,
  };
}

export default function DonationReportManager({
  initialReports,
}: {
  initialReports: DonationReportItem[];
}) {
  const [reports, setReports] = useState(initialReports);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const summary = useMemo(
    () =>
      reports.reduce(
        (acc, report) => {
          acc.income += report.income;
          acc.expense += report.expense;
          acc.balance += report.balance;
          return acc;
        },
        { income: 0, expense: 0, balance: 0 }
      ),
    [reports]
  );

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(form.id ? `/api/donation-reports/${form.id}` : "/api/donation-reports", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          month: form.month,
          category: form.category,
          income: Number(form.income),
          expense: Number(form.expense),
          notes: form.notes,
          published: form.published,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan laporan. Periksa kembali data nominal dan periode.");
      }

      const saved = (await response.json()) as DonationReportItem;
      setReports((current) => {
        const exists = current.some((report) => report.id === saved.id);
        const next = exists
          ? current.map((report) => (report.id === saved.id ? saved : report))
          : [saved, ...current];

        return next.sort((a, b) => {
          const monthDiff = new Date(b.month).getTime() - new Date(a.month).getTime();
          return monthDiff || a.category.localeCompare(b.category);
        });
      });
      resetForm();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Gagal menyimpan laporan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (report: DonationReportItem) => {
    if (!confirm(`Hapus laporan "${report.title}"?`)) {
      return;
    }

    const response = await fetch(`/api/donation-reports/${report.id}`, { method: "DELETE" });

    if (response.ok) {
      setReports((current) => current.filter((item) => item.id !== report.id));
      if (form.id === report.id) resetForm();
    } else {
      alert("Gagal menghapus laporan");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr] xl:gap-8">
      <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-primary">
              {form.id ? "Edit Laporan" : "Input Laporan"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Satu laporan untuk satu periode dan kategori.</p>
          </div>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl bg-gray-100 p-3 text-gray-500 transition-colors hover:bg-gray-200"
              aria-label="Batalkan edit"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-primary">Judul Laporan</label>
            <input
              required
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Contoh: Laporan Donasi Januari 2026"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-primary">Periode</label>
              <input
                required
                type="month"
                value={form.month}
                onChange={(event) => updateField("month", event.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-primary">Kategori</label>
              <select
                value={form.category}
                onChange={(event) => updateField("category", event.target.value as DonationCategoryValue)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
              >
                {donationCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-primary">Pemasukan</label>
              <input
                required
                min="0"
                type="number"
                value={form.income}
                onChange={(event) => updateField("income", event.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-primary">Pengeluaran</label>
              <input
                required
                min="0"
                type="number"
                value={form.expense}
                onChange={(event) => updateField("expense", event.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-primary">Catatan</label>
            <textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              rows={4}
              placeholder="Ringkasan penggunaan dana atau keterangan tambahan."
              className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
            />
          </div>

          <label className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
            <span>
              <span className="block text-sm font-bold text-primary">Publikasikan</span>
              <span className="text-xs text-gray-500">Tampilkan laporan ini di halaman publik.</span>
            </span>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) => updateField("published", event.target.checked)}
              className="h-5 w-5 accent-primary"
            />
          </label>

          {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.id ? <Save size={17} /> : <Plus size={17} />}
            {isSubmitting ? "Menyimpan..." : form.id ? "Simpan Perubahan" : "Tambah Laporan"}
          </button>
        </form>
      </section>

      <section className="order-first space-y-5 xl:order-none">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Pemasukan", summary.income],
              ["Pengeluaran", summary.expense],
              ["Saldo", summary.balance],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{label}</p>
                <p className="mt-2 text-xl font-bold text-primary">{formatCurrency(Number(value))}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 lg:w-64">
            <Link
              href="/api/donation-reports/pdf?includeDraft=true"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-primary/5"
            >
              <FileText size={17} />
              PDF
            </Link>
            <Link
              href="/api/donation-reports/export?includeDraft=true"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-primary/5"
            >
              <Download size={17} />
              CSV
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-xl font-serif font-bold text-primary">Daftar Laporan</h2>
            <p className="mt-1 text-sm text-gray-500">{reports.length} laporan tersimpan.</p>
          </div>

          <div className="max-h-[70dvh] divide-y divide-gray-50 overflow-y-auto">
            {reports.map((report) => (
              <article key={report.id} className="p-4 transition-colors hover:bg-gray-50/60 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {formatMonth(report.month)}
                      </span>
                      <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                        {donationCategoryLabels[report.category]}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${report.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {report.published ? "Publik" : "Draft"}
                      </span>
                    </div>
                    <h3 className="line-clamp-1 text-sm font-bold text-primary sm:text-base">{report.title}</h3>
                    {report.notes && <p className="mt-1 hidden text-sm text-gray-500 sm:line-clamp-2">{report.notes}</p>}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setForm(toFormState(report))}
                      className="rounded-2xl bg-blue-50 p-3 text-blue-600 transition-colors hover:bg-blue-100"
                      aria-label="Edit laporan"
                    >
                      <Edit size={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(report)}
                      className="rounded-2xl bg-red-50 p-3 text-red-500 transition-colors hover:bg-red-100"
                      aria-label="Hapus laporan"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-xs sm:hidden">
                  <span className="font-semibold text-emerald-700">Masuk {formatCurrency(report.income)}</span>
                  <span className="font-semibold text-primary">Saldo {formatCurrency(report.balance)}</span>
                </div>

                <div className="mt-4 hidden gap-3 text-sm sm:grid sm:grid-cols-3">
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase text-emerald-700/70">Masuk</p>
                    <p className="mt-1 font-bold text-emerald-700">{formatCurrency(report.income)}</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 px-4 py-3">
                    <p className="text-xs font-bold uppercase text-amber-700/70">Keluar</p>
                    <p className="mt-1 font-bold text-amber-700">{formatCurrency(report.expense)}</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 px-4 py-3">
                    <p className="text-xs font-bold uppercase text-primary/70">Saldo</p>
                    <p className="mt-1 font-bold text-primary">{formatCurrency(report.balance)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {reports.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-gray-400">Belum ada laporan donasi.</div>
          )}
        </div>
      </section>
    </div>
  );
}
