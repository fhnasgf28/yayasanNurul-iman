"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  program: {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string | null;
    category: string;
  };
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <Link href={`/programs/${program.slug}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={program.thumbnail || "/placeholder-program.jpg"}
            alt={program.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-lg">
              {program.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-8">
          <h3 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-accent transition-colors">
            {program.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-6 leading-relaxed">
            {program.description}
          </p>
          <div className="flex items-center text-accent font-bold text-sm tracking-wide">
            Selengkapnya <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
