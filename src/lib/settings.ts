import { db } from "@/lib/db";

export async function getSettings() {
  try {
    const settings = await db.siteSettings.findMany();
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error("getSettings", error);
    return {};
  }
}
