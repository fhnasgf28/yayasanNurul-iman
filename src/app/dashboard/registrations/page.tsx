import { redirect } from "next/navigation";
import { GraduationCap, ShieldCheck, UserCheck, UserPlus, UsersRound } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import StudentRegistrationList, {
  type StudentRegistrationItem,
} from "@/components/admin/StudentRegistrationList";
import { registrationStatusLabels, type RegistrationStatusValue } from "@/lib/student-registration";

const statStyle: Record<RegistrationStatusValue | "TOTAL", { label: string; icon: typeof UserPlus; className: string }> = {
  TOTAL: {
    label: "Total Pendaftar",
    icon: UsersRound,
    className: "bg-primary/10 text-primary",
  },
  NEW: {
    label: registrationStatusLabels.NEW,
    icon: UserPlus,
    className: "bg-amber-100 text-amber-700",
  },
  CONTACTED: {
    label: registrationStatusLabels.CONTACTED,
    icon: ShieldCheck,
    className: "bg-blue-100 text-blue-700",
  },
  ACCEPTED: {
    label: registrationStatusLabels.ACCEPTED,
    icon: UserCheck,
    className: "bg-green-100 text-green-700",
  },
  REJECTED: {
    label: registrationStatusLabels.REJECTED,
    icon: GraduationCap,
    className: "bg-red-100 text-red-700",
  },
};

export default async function StudentRegistrationsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [registrations, totalCount, newCount, contactedCount, acceptedCount, rejectedCount] = await Promise.all([
    db.studentRegistration.findMany({
      orderBy: { submittedAt: "desc" },
    }),
    db.studentRegistration.count(),
    db.studentRegistration.count({ where: { status: "NEW" } }),
    db.studentRegistration.count({ where: { status: "CONTACTED" } }),
    db.studentRegistration.count({ where: { status: "ACCEPTED" } }),
    db.studentRegistration.count({ where: { status: "REJECTED" } }),
  ]);

  const stats = [
    { key: "TOTAL" as const, value: totalCount },
    { key: "NEW" as const, value: newCount },
    { key: "CONTACTED" as const, value: contactedCount },
    { key: "ACCEPTED" as const, value: acceptedCount },
    { key: "REJECTED" as const, value: rejectedCount },
  ];

  const serializedRegistrations: StudentRegistrationItem[] = registrations.map((registration) => ({
    id: registration.id,
    studentName: registration.studentName,
    nickname: registration.nickname,
    gender: registration.gender,
    birthPlace: registration.birthPlace,
    birthDate: registration.birthDate.toISOString(),
    schoolOrigin: registration.schoolOrigin,
    currentGrade: registration.currentGrade,
    program: registration.program,
    parentName: registration.parentName,
    parentPhone: registration.parentPhone,
    parentEmail: registration.parentEmail,
    address: registration.address,
    notes: registration.notes,
    status: registration.status,
    submittedAt: registration.submittedAt.toISOString(),
    reviewedAt: registration.reviewedAt?.toISOString() ?? null,
    updatedAt: registration.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary sm:text-3xl">Pendaftaran Siswa Baru</h1>
          <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
            Kelola data calon siswa dan tindak lanjuti proses penerimaan.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-xs font-semibold text-gray-500 shadow-sm">
          Data ini hanya tersedia untuk role ADMIN.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((stat) => {
          const config = statStyle[stat.key];
          const Icon = config.icon;

          return (
            <div key={stat.key} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${config.className}`}>
                <Icon size={21} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{config.label}</p>
              <p className="mt-1 text-3xl font-bold text-primary">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <StudentRegistrationList initialRegistrations={serializedRegistrations} />
    </div>
  );
}
