import { getDailyAyah } from "./quran-api";
import { BookOpen, Sparkles } from "lucide-react";
import DailyVerseClient from "./DailyVerseClient";

export default async function DailyVerse() {
  const ayah = await getDailyAyah();

  return <DailyVerseClient ayah={ayah} />;
}
