import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import { registrationStatusLabels } from "@/lib/student-registration";

const itemLimit = 6;

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const [unreadMessageCount, newRegistrationCount, messages, registrations] = await Promise.all([
      db.contactMessage.count({ where: { isRead: false } }),
      db.studentRegistration.count({ where: { status: "NEW" } }),
      db.contactMessage.findMany({
        where: { isRead: false },
        orderBy: { createdAt: "desc" },
        take: itemLimit,
        select: {
          id: true,
          name: true,
          subject: true,
          createdAt: true,
        },
      }),
      db.studentRegistration.findMany({
        where: { status: "NEW" },
        orderBy: { submittedAt: "desc" },
        take: itemLimit,
        select: {
          id: true,
          studentName: true,
          program: true,
          submittedAt: true,
        },
      }),
    ]);

    const items = [
      ...messages.map((message) => ({
        id: `message-${message.id}`,
        type: "MESSAGE" as const,
        title: message.subject,
        description: `Pesan baru dari ${message.name}`,
        href: "/dashboard/messages",
        createdAt: message.createdAt.toISOString(),
      })),
      ...registrations.map((registration) => ({
        id: `registration-${registration.id}`,
        type: "REGISTRATION" as const,
        title: registration.studentName,
        description: `${registrationStatusLabels.NEW} - ${registration.program}`,
        href: "/dashboard/registrations",
        createdAt: registration.submittedAt.toISOString(),
      })),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, itemLimit);

    return NextResponse.json({
      total: unreadMessageCount + newRegistrationCount,
      unreadMessageCount,
      newRegistrationCount,
      items,
    });
  } catch (error) {
    console.error("[ADMIN_NOTIFICATIONS_GET]", error);
    return NextResponse.json(
      { message: "Gagal mengambil notifikasi" },
      { status: 500 }
    );
  }
}
