import Link from "next/link";
import { Calendar, Users, Target, Clock, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getProgramBySlug } from "@/lib/data";

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="pt-20">
      {/* Header Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        {program.thumbnail && (
          <img
            src={program.thumbnail}
            alt={program.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
          <div className="max-w-7xl mx-auto space-y-6">
            <Link href="/programs" className="inline-flex items-center text-accent font-bold hover:underline">
              <ArrowLeft size={20} className="mr-2" /> Kembali ke Program
            </Link>
            <div className="space-y-4">
              <span className="bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                {program.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white max-w-4xl">
                {program.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div 
              className="prose prose-lg max-w-none text-gray-600 prose-headings:font-serif prose-headings:text-primary prose-a:text-accent"
              dangerouslySetInnerHTML={{ __html: program.content }}
            />
            
            {/* CTA in Content */}
            <div className="bg-base p-10 rounded-3xl border border-gray-100 flex flex-col md:row items-center justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-primary">Dukung Program Ini</h3>
                <p className="text-gray-500">Kontribusi Anda akan sangat berarti bagi para penerima manfaat.</p>
              </div>
              <Link
                href="/donate"
                className="bg-accent text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                Donasi Sekarang
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
              <h4 className="text-xl font-serif font-bold text-primary border-b pb-4">Detail Program</h4>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-base p-3 rounded-xl text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Target Penerima</p>
                    <p className="text-primary font-bold">{program.beneficiary || 0} Orang</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-base p-3 rounded-xl text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status</p>
                    <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold uppercase">
                      {program.status}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/donate"
                className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
              >
                Donasi Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
