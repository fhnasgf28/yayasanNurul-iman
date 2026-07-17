import ProgramCard from "@/features/programs/ProgramCard";
import { getPrograms } from "@/lib/data";

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allPrograms = await getPrograms();
  
  const filteredPrograms = category && category !== "Semua"
    ? allPrograms.filter(p => p.category === category)
    : allPrograms;

  const categories = ["Semua", "Masjid", "Pendidikan", "Sosial"];

  return (
    <main className="pt-20">
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Program Kami</h1>
          <p className="text-white/70 text-lg md:text-xl">Khidmah Yayasan Nurul Iman dalam memakmurkan masjid dan membina generasi ummat.</p>
        </div>
      </section>

      <section className="py-24 px-6 bg-light bg-islamic">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <a
                key={cat}
                href={cat === "Semua" ? "/programs" : `/programs?category=${cat}`}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all border ${
                  (category === cat || (!category && cat === "Semua")) 
                    ? "bg-secondary text-primary border-secondary shadow-lg scale-105" 
                    : "bg-white text-primary border-secondary/10 hover:border-secondary shadow-sm"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          
          {filteredPrograms.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-secondary/10">
              <p className="text-gray-500 font-serif text-xl italic">Belum ada program aktif di kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
