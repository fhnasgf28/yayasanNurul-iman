import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });

type PrismaClientWithGeneratedModels = PrismaClient & {
  prestasi?: unknown;
  contactMessage?: unknown;
  studentRegistration?: unknown;
  donatur?: unknown;
};

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const currentClient = globalForPrisma.prisma as PrismaClientWithGeneratedModels | undefined;

// Force fresh client (needed after prisma generate in dev)
// Tambahkan model baru ke checklist ini setiap kali schema diperbarui
if (
  currentClient &&
  (
    !currentClient.prestasi ||
    !currentClient.contactMessage ||
    !currentClient.studentRegistration ||
    !currentClient.donatur
  )
) {
  globalForPrisma.prisma = undefined;
}

export const db =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
