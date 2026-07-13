import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { studentRegistrationSchema } from "@/lib/student-registration";
import { notifyNewStudentRegistration } from "@/lib/whatsapp";

const submissionWindowMs = 60 * 60 * 1000;
const submissionLimit = 5;

function getRequestKey(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  const userAgent = req.headers.get("user-agent")?.slice(0, 80) ?? "unknown";

  return `${forwardedFor || realIp || "unknown"}:${userAgent}`;
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(
    `student-registration:${getRequestKey(req)}`,
    submissionLimit,
    submissionWindowMs
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: "Terlalu banyak percobaan. Silakan coba lagi beberapa saat." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  try {
    const body = await req.json();
    const result = studentRegistrationSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Data pendaftaran tidak valid";
      return NextResponse.json(
        { message: firstError, errors: result.error.issues },
        { status: 400 }
      );
    }

    const { consent, website, ...data } = result.data;
    void consent;

    if (website) {
      return NextResponse.json(
        { message: "Pendaftaran berhasil dikirim" },
        { status: 201 }
      );
    }

    const registration = await db.studentRegistration.create({ data });

    // Kirim notifikasi WA ke admin — non-blocking, error tidak menggagalkan response
    void notifyNewStudentRegistration({
      nama: registration.studentName,
      namaOrangTua: registration.parentName,
      noHp: registration.parentPhone,
      program: registration.program,
      tanggal: new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(registration.submittedAt),
    });

    return NextResponse.json(
      { message: "Pendaftaran berhasil dikirim" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[STUDENT_REGISTRATIONS_POST]", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server saat mengirim pendaftaran" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const registrations = await db.studentRegistration.findMany({
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("[STUDENT_REGISTRATIONS_GET]", error);
    return NextResponse.json(
      { message: "Gagal mengambil data pendaftaran" },
      { status: 500 }
    );
  }
}
