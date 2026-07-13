"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Edit,
  FileText,
  Plus,
  Save,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Phone,
  MapPin,
  CalendarDays,
  CircleUserRound,
  Banknote,
} from "lucide-react";
import {
  type DonaturItem,
  type DonaturDonationItem,
  formatBulan,
  formatRupiah,
} from "@/lib/donatur-shared";

// ─── Types ─────────────────────────────────────────────────────────────────────

type DonaturFormState = {
  id?: string;
  nama: string;
  telepon: string;
  alamat: string;
  catatan: string;
  aktif: boolean;
};

type DonationFormState = {
  donaturId: string;
  bulan: string;
  nominal: string;
  catatan: string;
};

const defaultDonaturForm: DonaturFormState = {
  nama: "",
  telepon: "",
  alamat: "",
  catatan: "",
  aktif: true,
};

const defaultDonationForm = (donaturId: string): DonationFormState => ({
  donaturId,
  bulan: new Date().toISOString().slice(0, 7),
  nominal: "",
  catatan: "",
});

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function DonaturManager({ initialDonaturList }: { initialDonaturList: DonaturItem[] }) {
  const [donaturList, setDonaturList] = useState(initialDonaturList);
  const [form, setForm] = useState<DonaturFormState>(defaultDonaturForm);
  const [donationForm, setDonationForm] = useState<DonationFormState | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDonationSubmitting, setIsDonationSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const filteredList = useMemo(() => {
    const q = search.toLowerCase();
    return donaturList.filter(
      (d) => d.nama.toLowerCase().includes(q) || (d.telepon ?? "").includes(q)
    );
  }, [donaturList, search]);

  const stats = useMemo(() => {
    const aktif = donaturList.filter((d) => d.aktif).length;
    const thisMonth = new Date().toISOString().slice(0, 7);
    let totalBulanIni = 0;
    for (const d of donaturList) {
      for (const don of d.donations) {
        if (don.bulan.slice(0, 7) === thisMonth) totalBulanIni += don.nominal;
      }
    }
    return { aktif, total: donaturList.length, totalBulanIni };
  }, [donaturList]);

  // ── Form helpers ──────────────────────────────────────────────────────────────

  const updateField = <K extends keyof DonaturFormState>(key: K, value: DonaturFormState[K]) =>
    setForm((cur) => ({ ...cur, [key]: value }));

  const resetForm = () => {
    setForm(defaultDonaturForm);
    setError("");
  };

  const startEdit = (d: DonaturItem) => {
    setForm({
      id: d.id,
      nama: d.nama,
      telepon: d.telepon ?? "",
      alamat: d.alamat ?? "",
      catatan: d.catatan ?? "",
      aktif: d.aktif,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Submit donatur ────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(form.id ? `/api/donatur/${form.id}` : "/api/donatur", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama,
          telepon: form.telepon || null,
          alamat: form.alamat || null,
          catatan: form.catatan || null,
          aktif: form.aktif,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data donatur.");
      const saved = (await res.json()) as DonaturItem;

      setDonaturList((cur) => {
        const exists = cur.some((d) => d.id === saved.id);
        if (exists) return cur.map((d) => (d.id === saved.id ? saved : d)).sort(sortDonatur);
        return [saved, ...cur].sort(sortDonatur);
      });
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Delete donatur ────────────────────────────────────────────────────────────

  const handleDelete = async (d: DonaturItem) => {
    if (!confirm(`Hapus donatur "${d.nama}"? Semua riwayat donasi juga akan dihapus.`)) return;

    const res = await fetch(`/api/donatur/${d.id}`, { method: "DELETE" });
    if (res.ok) {
      setDonaturList((cur) => cur.filter((item) => item.id !== d.id));
      if (form.id === d.id) resetForm();
    } else {
      alert("Gagal menghapus donatur.");
    }
  };

  // ── Donation form ─────────────────────────────────────────────────────────────

  const openDonationForm = (donaturId: string) => {
    setDonationForm(defaultDonationForm(donaturId));
  };

  const closeDonationForm = () => setDonationForm(null);

  const handleDonationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!donationForm) return;
    setIsDonationSubmitting(true);

    try {
      const nominal = Number(donationForm.nominal);
      if (!Number.isFinite(nominal) || nominal <= 0) throw new Error("Nominal harus lebih dari 0.");

      const res = await fetch(`/api/donatur/${donationForm.donaturId}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bulan: donationForm.bulan,
          nominal,
          catatan: donationForm.catatan || null,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan donasi.");
      const savedDonation = (await res.json()) as DonaturDonationItem;

      setDonaturList((cur) =>
        cur.map((d) => {
          if (d.id !== donationForm.donaturId) return d;
          const exists = d.donations.some((don) => don.id === savedDonation.id);
          const newDonations = exists
            ? d.donations.map((don) => (don.id === savedDonation.id ? savedDonation : don))
            : [savedDonation, ...d.donations];
          return {
            ...d,
            donations: newDonations.sort(
              (a, b) => new Date(b.bulan).getTime() - new Date(a.bulan).getTime()
            ),
          };
        })
      );

      closeDonationForm();
      setExpandedId(donationForm.donaturId);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setIsDonationSubmitting(false);
    }
  };

  const handleDeleteDonation = async (donaturId: string, donationId: string) => {
    if (!confirm("Hapus entri donasi ini?")) return;

    const res = await fetch(`/api/donatur/${donaturId}/donations/${donationId}`, { method: "DELETE" });
    if (res.ok) {
      setDonaturList((cur) =>
        cur.map((d) =>
          d.id === donaturId
            ? { ...d, donations: d.donations.filter((don) => don.id !== donationId) }
            : d
        )
      );
    } else {
      alert("Gagal menghapus donasi.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Donatur"
          value={String(stats.total)}
          icon={<CircleUserRound size={20} />}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          label="Donatur Aktif"
          value={String(stats.aktif)}
          icon={<CircleUserRound size={20} />}
          color="text-green-700"
          bg="bg-green-50"
        />
        <StatCard
          label="Estimasi Donasi Bulan Ini"
          value={stats.totalBulanIni > 0 ? formatRupiah(stats.totalBulanIni) : "—"}
          icon={<Banknote size={20} />}
          color="text-amber-700"
          bg="bg-amber-50"
        />
      </div>

      {/* Main layout */}
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr] xl:gap-8">
        {/* ── Form ── */}
        <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-primary">
                {form.id ? "Edit Donatur" : "Tambah Donatur"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">Isi data donatur tetap yayasan.</p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-primary">Nama Donatur *</label>
              <input
                required
                value={form.nama}
                onChange={(e) => updateField("nama", e.target.value)}
                placeholder="H. Ahmad Rifai"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
              />
            </div>

            {/* Telepon */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-primary">Telepon</label>
              <input
                type="tel"
                value={form.telepon}
                onChange={(e) => updateField("telepon", e.target.value)}
                placeholder="0812-xxxx-xxxx"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-primary">Alamat</label>
              <textarea
                value={form.alamat}
                onChange={(e) => updateField("alamat", e.target.value)}
                rows={2}
                placeholder="Jl. Contoh No.1, Bandung"
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
              />
            </div>

            {/* Catatan */}
            <div>
              <label className="mb-1.5 block text-sm font-bold text-primary">Catatan</label>
              <textarea
                value={form.catatan}
                onChange={(e) => updateField("catatan", e.target.value)}
                rows={2}
                placeholder="Keterangan tambahan..."
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
              />
            </div>

            {/* Status aktif */}
            <label className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
              <span>
                <span className="block text-sm font-bold text-primary">Donatur Aktif</span>
                <span className="text-xs text-gray-500">Donatur masih aktif menyumbang.</span>
              </span>
              <input
                type="checkbox"
                checked={form.aktif}
                onChange={(e) => updateField("aktif", e.target.checked)}
                className="h-5 w-5 accent-primary"
              />
            </label>

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {form.id ? <Save size={17} /> : <Plus size={17} />}
              {isSubmitting ? "Menyimpan..." : form.id ? "Simpan Perubahan" : "Tambah Donatur"}
            </button>
          </form>
        </section>

        {/* ── List ── */}
        <section className="order-first space-y-5 xl:order-none">
          {/* Header + actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-primary">Daftar Donatur</h2>
              <p className="mt-0.5 text-sm text-gray-500">{donaturList.length} donatur terdaftar.</p>
            </div>
            <Link
              href="/api/donatur/pdf"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-2xl border border-primary/15 bg-white px-4 py-2.5 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-primary/5"
            >
              <FileText size={16} />
              Cetak PDF
            </Link>
          </div>

          {/* Search */}
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau telepon..."
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary/40"
          />

          {/* List */}
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="max-h-[75dvh] divide-y divide-gray-50 overflow-y-auto">
              {filteredList.map((donatur) => {
                const isExpanded = expandedId === donatur.id;
                const latestDonation = donatur.donations[0];
                const totalDonasi = donatur.donations.reduce((s, d) => s + d.nominal, 0);
                const isAddingDonation = donationForm?.donaturId === donatur.id;

                return (
                  <div key={donatur.id} className="transition-colors hover:bg-gray-50/50">
                    {/* Row header */}
                    <div className="flex items-start gap-3 px-5 py-4">
                      {/* Avatar */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                        <CircleUserRound size={20} className="text-primary" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-bold text-primary">{donatur.nama}</p>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              donatur.aktif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {donatur.aktif ? "Aktif" : "Nonaktif"}
                          </span>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          {donatur.telepon && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Phone size={11} /> {donatur.telepon}
                            </span>
                          )}
                          {donatur.alamat && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <MapPin size={11} />
                              <span className="line-clamp-1 max-w-[180px]">{donatur.alamat}</span>
                            </span>
                          )}
                        </div>

                        {/* Donasi summary */}
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          {latestDonation && (
                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                              <CalendarDays size={11} />
                              {formatBulan(latestDonation.bulan)}: {formatRupiah(latestDonation.nominal)}
                            </span>
                          )}
                          {totalDonasi > 0 && (
                            <span className="text-xs text-gray-400">
                              Total: {formatRupiah(totalDonasi)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openDonationForm(donatur.id)}
                          className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700 transition-colors hover:bg-emerald-100"
                          title="Tambah donasi"
                        >
                          <Banknote size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => startEdit(donatur)}
                          className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition-colors hover:bg-blue-100"
                          title="Edit donatur"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(donatur)}
                          className="rounded-xl bg-red-50 p-2.5 text-red-500 transition-colors hover:bg-red-100"
                          title="Hapus donatur"
                        >
                          <Trash2 size={16} />
                        </button>
                        {donatur.donations.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : donatur.id)}
                            className="rounded-xl bg-gray-100 p-2.5 text-gray-600 transition-colors hover:bg-gray-200"
                            title={isExpanded ? "Sembunyikan riwayat" : "Lihat riwayat"}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Add donation form (inline) */}
                    {isAddingDonation && (
                      <div className="border-t border-emerald-100 bg-emerald-50/50 px-5 py-4">
                        <p className="mb-3 text-sm font-bold text-primary">Tambah / Perbarui Donasi</p>
                        <form onSubmit={handleDonationSubmit} className="space-y-3">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-bold text-gray-600">Periode Bulan</label>
                              <input
                                required
                                type="month"
                                value={donationForm.bulan}
                                onChange={(e) =>
                                  setDonationForm((f) => f && { ...f, bulan: e.target.value })
                                }
                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary/40"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-bold text-gray-600">Nominal (Rp)</label>
                              <input
                                required
                                type="number"
                                min="1"
                                value={donationForm.nominal}
                                onChange={(e) =>
                                  setDonationForm((f) => f && { ...f, nominal: e.target.value })
                                }
                                placeholder="500000"
                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary/40"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-bold text-gray-600">Catatan (opsional)</label>
                            <input
                              value={donationForm.catatan}
                              onChange={(e) =>
                                setDonationForm((f) => f && { ...f, catatan: e.target.value })
                              }
                              placeholder="Keterangan donasi..."
                              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary/40"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              disabled={isDonationSubmitting}
                              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
                            >
                              <Save size={15} />
                              {isDonationSubmitting ? "Menyimpan..." : "Simpan Donasi"}
                            </button>
                            <button
                              type="button"
                              onClick={closeDonationForm}
                              className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200"
                            >
                              Batal
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Donation history */}
                    {isExpanded && donatur.donations.length > 0 && (
                      <div className="border-t border-gray-50 bg-gray-50/50 px-5 py-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                          Riwayat Donasi
                        </p>
                        <div className="space-y-2">
                          {donatur.donations.map((don) => (
                            <div
                              key={don.id}
                              className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-4 py-2.5"
                            >
                              <div>
                                <p className="text-sm font-bold text-primary">
                                  {formatRupiah(don.nominal)}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {formatBulan(don.bulan)}
                                  {don.catatan && ` · ${don.catatan}`}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeleteDonation(donatur.id, don.id)}
                                className="rounded-lg bg-red-50 p-1.5 text-red-400 transition-colors hover:bg-red-100"
                                title="Hapus entri donasi"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredList.length === 0 && (
                <div className="px-6 py-16 text-center text-sm text-gray-400">
                  {search ? "Donatur tidak ditemukan." : "Belum ada data donatur."}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function sortDonatur(a: DonaturItem, b: DonaturItem) {
  if (a.aktif !== b.aktif) return a.aktif ? -1 : 1;
  return a.nama.localeCompare(b.nama);
}

function StatCard({
  label,
  value,
  icon,
  color,
  bg,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className={`${bg} ${color} mb-3 w-fit rounded-xl p-2.5`}>{icon}</div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-primary">{value}</p>
    </div>
  );
}
