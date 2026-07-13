"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  UserPlus,
  Pencil,
  Trash2,
  Shield,
  ShieldCheck,
  Loader2,
  Eye,
  EyeOff,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────
type UserRole = "ADMIN" | "EDITOR";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

type FormMode = "add" | "edit" | null;

// ─── Helpers ────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Sub-components ─────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        role === "ADMIN"
          ? "bg-primary/10 text-primary"
          : "bg-secondary/15 text-secondary-foreground"
      )}
    >
      {role === "ADMIN" ? <ShieldCheck size={12} /> : <Shield size={12} />}
      {role}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function UserManager() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("EDITOR");

  // ── Fetch users ──────────────────────────────────────────────────────────
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) setUsers(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ── Open form ────────────────────────────────────────────────────────────
  const openAdd = () => {
    setFormMode("add");
    setEditTarget(null);
    setName("");
    setEmail("");
    setPassword("");
    setRole("EDITOR");
    setError("");
    setSuccess("");
  };

  const openEdit = (user: AdminUser) => {
    setFormMode("edit");
    setEditTarget(user);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setRole(user.role);
    setError("");
    setSuccess("");
  };

  const closeForm = () => {
    setFormMode(null);
    setEditTarget(null);
    setError("");
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      let res: Response;

      if (formMode === "add") {
        res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role }),
        });
      } else {
        const payload: Record<string, string> = { name, role };
        if (password.trim()) payload.password = password;
        res = await fetch(`/api/users/${editTarget!.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan");
        return;
      }

      setSuccess(formMode === "add" ? "User berhasil ditambahkan!" : "User berhasil diperbarui!");
      closeForm();
      fetchUsers();
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/users/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal menghapus user");
        setDeleteTarget(null);
        return;
      }

      setSuccess(`User "${deleteTarget.name}" berhasil dihapus.`);
      setDeleteTarget(null);
      fetchUsers();
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Notifikasi sukses */}
      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
          <Check size={16} className="shrink-0" />
          <span>{success}</span>
          <button onClick={() => setSuccess("")} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Error global */}
      {error && !formMode && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertTriangle size={16} className="shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError("")} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header + tombol tambah */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {users.length} user terdaftar —{" "}
            {users.filter((u) => u.role === "ADMIN").length} Admin,{" "}
            {users.filter((u) => u.role === "EDITOR").length} Editor
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
        >
          <UserPlus size={16} />
          Tambah User
        </button>
      </div>

      {/* Form Tambah / Edit */}
      {formMode && (
        <div className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">
              {formMode === "add" ? "Tambah User Baru" : `Edit: ${editTarget?.name}`}
            </h2>
            <button
              onClick={closeForm}
              className="rounded-xl p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600">
              <AlertTriangle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Nama */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-secondary focus:bg-white"
                />
              </div>

              {/* Email — hanya saat tambah */}
              {formMode === "add" ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@nuruliman.or.id"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-secondary focus:bg-white"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Email</label>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-sm text-gray-400">
                    {editTarget?.email}
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Password{" "}
                  {formMode === "edit" && (
                    <span className="font-normal text-gray-400">(kosongkan jika tidak diubah)</span>
                  )}
                  {formMode === "add" && <span className="text-red-400">*</span>}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required={formMode === "add"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={formMode === "add" ? "Min. 6 karakter" : "Kosongkan jika tidak diubah"}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-secondary focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-500">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  disabled={formMode === "edit" && editTarget?.id === session?.user?.id}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-secondary focus:bg-white disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  <option value="EDITOR">Editor — kelola konten</option>
                  <option value="ADMIN">Admin — akses penuh</option>
                </select>
                {formMode === "edit" && editTarget?.id === session?.user?.id && (
                  <p className="text-xs text-amber-600">⚠️ Tidak bisa mengubah role akun sendiri</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-primary/90 disabled:opacity-60"
              >
                {submitting && <Loader2 size={14} className="animate-spin" />}
                {formMode === "add" ? "Tambah User" : "Simpan Perubahan"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel user */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 size={28} className="animate-spin" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-left">
                  <th className="px-6 py-4 font-semibold text-gray-500">Nama</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Email</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Role</th>
                  <th className="px-6 py-4 font-semibold text-gray-500">Terdaftar</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => {
                  const isSelf = user.id === session?.user?.id;
                  return (
                    <tr key={user.id} className="transition-colors hover:bg-gray-50/60">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            {isSelf && (
                              <p className="text-[11px] font-medium text-secondary">(akun Anda)</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{user.email}</td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-6 py-4 text-gray-400">{formatDate(user.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(user)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                          >
                            <Pencil size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(user)}
                            disabled={isSelf}
                            title={isSelf ? "Tidak bisa menghapus akun sendiri" : "Hapus user"}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Trash2 size={12} />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Konfirmasi hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-red-100 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <Trash2 size={22} />
            </div>
            <h3 className="mb-1 font-serif text-lg font-bold text-gray-800">Hapus User</h3>
            <p className="mb-5 text-sm text-gray-500">
              Apakah Anda yakin ingin menghapus akun{" "}
              <span className="font-semibold text-gray-700">{deleteTarget.name}</span>? Tindakan ini
              tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {submitting && <Loader2 size={14} className="animate-spin" />}
                Ya, Hapus
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
