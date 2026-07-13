/**
 * Script untuk mengimport data donatur dari data_donatur.txt ke database
 * Jalankan: node scripts/import-donatur.mjs
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const __dirname = dirname(fileURLToPath(import.meta.url));

const connectionString = "postgresql://postgres:postgres@localhost:5433/yayasan_db?schema=public";
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

const txtPath = join(__dirname, "../data_donatur/data_donatur.txt");
const raw = readFileSync(txtPath, "utf-8");

// Parse setiap baris (skip header "NO\tNAMA")
const lines = raw
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean)
  .filter((l) => !l.startsWith("NO")); // skip header

const donaturNames = lines
  .map((line) => {
    // Format: "1. H. Ujang Mulyana" atau "1.\tH. Ujang Mulyana"
    const match = line.match(/^\d+\.\s*(.+)$/);
    return match ? match[1].trim() : null;
  })
  .filter(Boolean);

console.log(`Ditemukan ${donaturNames.length} donatur untuk diimport:`);
donaturNames.forEach((n, i) => console.log(`  ${i + 1}. ${n}`));

async function main() {
  let imported = 0;
  let skipped = 0;

  for (const nama of donaturNames) {
    // Cek apakah sudah ada
    const existing = await db.donatur.findFirst({ where: { nama } });
    if (existing) {
      console.log(`⏭  Skip (sudah ada): ${nama}`);
      skipped++;
      continue;
    }

    await db.donatur.create({
      data: { nama, aktif: true },
    });
    console.log(`✅ Imported: ${nama}`);
    imported++;
  }

  console.log(`\nSelesai! ${imported} donatur diimport, ${skipped} dilewati.`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
