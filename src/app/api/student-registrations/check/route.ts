import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

const submissionWindowMs = 60 * 1000; // 1 minute
const checkLimit = 10; // Max 10 checks per minute

function getRequestKey(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  const userAgent = req.headers.get("user-agent")?.slice(0, 80) ?? "unknown";

  return `${forwardedFor || realIp || "unknown"}:${userAgent}`;
}

export async function GET(req: NextRequest) {
  const rateLimit = checkRateLimit(
    `check-status:${getRequestKey(req)}`,
    checkLimit,
    submissionWindowMs
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: "Terlalu banyak permintaan. Silakan tunggu 1 menit sebelum mencoba lagi." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  const { searchParams } = new URL(req.url);
  const identifier = searchParams.get("q")?.trim();

  if (!identifier || identifier.length < 3) {
    return NextResponse.json(
      { message: "Kata kunci pencarian harus minimal 3 karakter." },
      { status: 400 }
    );
  }

  try {
    // Bersihkan angka saja jika berupa nomor telepon
    const digitsOnly = identifier.replace(/[^0-9]/g, "");

    const queryConditions = [];
    
    // Jika ada input email, tambahkan kondisi email
    if (identifier.includes("@")) {
      queryConditions.push({
        parentEmail: { equals: identifier, mode: "insensitive" as const },
      });
    }

    // Jika input mengandung angka, tambahkan kondisi nomor telepon
    if (digitsOnly.length >= 5) {
      queryConditions.push({
        parentPhone: { contains: digitsOnly },
      });
    }

    // Jika tidak memenuhi kriteria di atas (misal hanya kata acak), cari berdasarkan email/telepon parsial
    if (queryConditions.length === 0) {
      queryConditions.push(
        { parentEmail: { contains: identifier, mode: "insensitive" as const } },
        { parentPhone: { contains: identifier } }
      );
    }

    const registrations = await db.studentRegistration.findMany({
      where: {
        OR: queryConditions,
      },
      select: {
        id: true,
        studentName: true,
        program: true,
        status: true,
        submittedAt: true,
      },
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json(registrations);
  } catch (error) {
    console.error("[STUDENT_REGISTRATIONS_CHECK_GET]", error);
    return NextResponse.json(
      { message: "Gagal memproses pengecekan status." },
      { status: 500 }
    );
  }
}
