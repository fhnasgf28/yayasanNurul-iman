import { z } from "zod";

export const studentGenderValues = ["MALE", "FEMALE"] as const;
export const registrationStatusValues = ["NEW", "CONTACTED", "ACCEPTED", "REJECTED"] as const;

export type StudentGenderValue = (typeof studentGenderValues)[number];
export type RegistrationStatusValue = (typeof registrationStatusValues)[number];

export const studentGenderLabels: Record<StudentGenderValue, string> = {
  MALE: "Laki-laki",
  FEMALE: "Perempuan",
};

export const registrationStatusLabels: Record<RegistrationStatusValue, string> = {
  NEW: "Baru",
  CONTACTED: "Dihubungi",
  ACCEPTED: "Diterima",
  REJECTED: "Ditolak",
};

const trimString = (min: number, max: number, label: string) =>
  z
    .string({ message: `${label} wajib diisi` })
    .trim()
    .min(min, `${label} wajib diisi`)
    .max(max, `${label} maksimal ${max} karakter`);

const optionalTrimString = (max: number, label: string) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed.length === 0 ? undefined : trimmed;
    },
    z.string().max(max, `${label} maksimal ${max} karakter`).optional()
  );

const phoneRegex = /^[0-9+()\-\s.]{8,20}$/;

export const studentRegistrationSchema = z.object({
  studentName: trimString(2, 120, "Nama lengkap siswa"),
  nickname: optionalTrimString(60, "Nama panggilan"),
  gender: z.enum(studentGenderValues, { message: "Jenis kelamin tidak valid" }),
  birthPlace: trimString(2, 80, "Tempat lahir"),
  birthDate: z.coerce
    .date({ message: "Tanggal lahir tidak valid" })
    .refine((date) => date <= new Date(), "Tanggal lahir tidak boleh di masa depan")
    .refine((date) => date >= new Date("1990-01-01"), "Tanggal lahir tidak valid"),
  schoolOrigin: optionalTrimString(120, "Asal sekolah"),
  currentGrade: optionalTrimString(40, "Kelas saat ini"),
  program: trimString(2, 80, "Program pilihan"),
  parentName: trimString(2, 120, "Nama orang tua/wali"),
  parentPhone: z
    .string({ message: "Nomor WhatsApp wajib diisi" })
    .trim()
    .min(8, "Nomor WhatsApp wajib diisi")
    .max(20, "Nomor WhatsApp maksimal 20 karakter")
    .regex(phoneRegex, "Nomor WhatsApp hanya boleh berisi angka dan tanda telepon"),
  parentEmail: z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed.length === 0 ? undefined : trimmed;
    },
    z.string().email("Email wali tidak valid").max(120, "Email wali maksimal 120 karakter").optional()
  ),
  address: trimString(8, 500, "Alamat domisili"),
  notes: optionalTrimString(700, "Catatan tambahan"),
  consent: z
    .boolean({ message: "Persetujuan pengolahan data wajib dicentang" })
    .refine(Boolean, "Persetujuan pengolahan data wajib dicentang"),
  website: optionalTrimString(200, "Website"),
});

export const updateRegistrationStatusSchema = z.object({
  status: z.enum(registrationStatusValues, { message: "Status pendaftaran tidak valid" }),
});

export type StudentRegistrationInput = z.infer<typeof studentRegistrationSchema>;
