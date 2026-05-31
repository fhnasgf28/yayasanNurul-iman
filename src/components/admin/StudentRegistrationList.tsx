"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock3,
  Download,
  Mail,
  MapPin,
  Phone,
  Search,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import {
  registrationStatusLabels,
  registrationStatusValues,
  studentGenderLabels,
  type RegistrationStatusValue,
  type StudentGenderValue,
} from "@/lib/student-registration";
import { cn } from "@/lib/utils";

export type StudentRegistrationItem = {
  id: string;
  studentName: string;
  nickname: string | null;
  gender: StudentGenderValue;
  birthPlace: string;
  birthDate: string;
  schoolOrigin: string | null;
  currentGrade: string | null;
  program: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string | null;
  address: string;
  notes: string | null;
  status: RegistrationStatusValue;
  submittedAt: string;
  reviewedAt: string | null;
  updatedAt: string;
};

type StudentRegistrationListProps = {
  initialRegistrations: StudentRegistrationItem[];
};

const statusClass: Record<RegistrationStatusValue, string> = {
  NEW: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function StudentRegistrationList({ initialRegistrations }: StudentRegistrationListProps) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<RegistrationStatusValue | "ALL">("ALL");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filteredRegistrations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return registrations.filter((registration) => {
      const matchesStatus = statusFilter === "ALL" || registration.status === statusFilter;
      const searchableText = [
        registration.studentName,
        registration.nickname,
        registration.program,
        registration.parentName,
        registration.parentPhone,
        registration.parentEmail,
        registration.schoolOrigin,
        registration.currentGrade,
        registration.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!query || searchableText.includes(query));
    });
  }, [registrations, searchTerm, statusFilter]);

  const updateStatus = async (id: string, status: RegistrationStatusValue) => {
    setBusyId(id);

    try {
      const response = await fetch(`/api/student-registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memperbarui status");
      }

      setRegistrations((items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                status: result.status,
                reviewedAt: result.reviewedAt,
                updatedAt: result.updatedAt,
              }
            : item
        )
      );
    } catch (error) {
      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setBusyId(null);
    }
  };

  const deleteRegistration = async (id: string, studentName: string) => {
    if (!confirm(`Hapus pendaftaran "${studentName}" secara permanen?`)) return;

    setBusyId(id);

    try {
      const response = await fetch(`/api/student-registrations/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus pendaftaran");
      }

      setRegistrations((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setBusyId(null);
    }
  };

  if (registrations.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-300">
          <UsersRound size={32} />
        </div>
        <p className="mt-4 text-sm font-medium text-gray-500">Belum ada pendaftaran siswa baru.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Cari nama siswa, wali, program, atau nomor WA..."
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm outline-none transition-colors focus:border-primary/40"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Hapus pencarian"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as RegistrationStatusValue | "ALL")}
          className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-primary outline-none transition-colors focus:border-primary/40"
        >
          <option value="ALL">Semua Status</option>
          {registrationStatusValues.map((status) => (
            <option key={status} value={status}>
              {registrationStatusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredRegistrations.map((registration) => (
          <article key={registration.id} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0 flex-1 space-y-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-xl font-serif font-bold text-primary">
                        {registration.studentName}
                      </h2>
                      <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase", statusClass[registration.status])}>
                        {registrationStatusLabels[registration.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {registration.program} {registration.currentGrade ? `- ${registration.currentGrade}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <Clock3 size={15} />
                    <span>{formatDateTime(registration.submittedAt)}</span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="space-y-1 rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <UserRound size={14} />
                      Siswa
                    </div>
                    <p className="text-sm font-semibold text-primary">
                      {studentGenderLabels[registration.gender]}, lahir di {registration.birthPlace}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(registration.birthDate)}</p>
                    {registration.schoolOrigin && (
                      <p className="text-xs text-gray-500">Asal sekolah: {registration.schoolOrigin}</p>
                    )}
                  </div>

                  <div className="space-y-1 rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <UsersRound size={14} />
                      Wali
                    </div>
                    <p className="text-sm font-semibold text-primary">{registration.parentName}</p>
                    <a href={`https://wa.me/${registration.parentPhone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary">
                      <Phone size={13} />
                      {registration.parentPhone}
                    </a>
                    {registration.parentEmail && (
                      <a href={`mailto:${registration.parentEmail}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary">
                        <Mail size={13} />
                        {registration.parentEmail}
                      </a>
                    )}
                  </div>

                  <div className="space-y-1 rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <MapPin size={14} />
                      Alamat
                    </div>
                    <p className="line-clamp-4 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">
                      {registration.address}
                    </p>
                  </div>

                  <div className="space-y-1 rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <CalendarDays size={14} />
                      Catatan
                    </div>
                    <p className="line-clamp-4 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">
                      {registration.notes || "Tidak ada catatan tambahan."}
                    </p>
                    {registration.reviewedAt && (
                      <p className="pt-1 text-xs text-gray-400">
                        Ditinjau: {formatDateTime(registration.reviewedAt)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row xl:w-52 xl:flex-col">
                <a
                  href={`/api/student-registrations/${registration.id}/pdf`}
                  download
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                >
                  <Download size={17} />
                  <span>PDF</span>
                </a>
                <select
                  value={registration.status}
                  disabled={busyId === registration.id}
                  onChange={(event) => updateStatus(registration.id, event.target.value as RegistrationStatusValue)}
                  className="min-h-11 flex-1 rounded-2xl border border-primary/15 bg-white px-4 py-3 text-sm font-bold text-primary outline-none transition-colors focus:border-primary/40 disabled:opacity-60"
                >
                  {registrationStatusValues.map((status) => (
                    <option key={status} value={status}>
                      {registrationStatusLabels[status]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={busyId === registration.id}
                  onClick={() => deleteRegistration(registration.id, registration.studentName)}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60"
                >
                  {busyId === registration.id ? <CheckCircle size={17} /> : <Trash2 size={17} />}
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredRegistrations.length === 0 && (
        <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center text-sm font-medium text-gray-400 shadow-sm">
          Tidak ada data pendaftaran yang cocok dengan filter.
        </div>
      )}
    </div>
  );
}
