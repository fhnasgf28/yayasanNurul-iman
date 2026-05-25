import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Force fresh client (needed after prisma generate in dev)
if (globalForPrisma.prisma && (!(globalForPrisma.prisma as any).prestasi || !(globalForPrisma.prisma as any).contactMessage)) {
  (globalForPrisma as any).prisma = undefined;
}

export const db =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
