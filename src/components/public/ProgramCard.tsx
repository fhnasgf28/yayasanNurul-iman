"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-secondary/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      <Link href={`/programs/${program.slug}`} className="block h-full">
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src={program.thumbnail || "https://images.unsplash.com/photo-1542714599-423730594498?q=80&w=2070&auto=format&fit=crop"}
            alt={program.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-6 left-6 z-20">
            <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] uppercase font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 border border-white/20">
              <Tag size={12} className="text-secondary" />
              <span>{program.category}</span>
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-10 space-y-4">
          <h3 className="text-2xl font-serif font-bold text-primary group-hover:text-secondary transition-colors duration-300">
            {program.title}
          </h3>
          <p className="text-gray-500 text-base line-clamp-3 leading-relaxed font-sans">
            {program.description}
          </p>
          <div className="pt-4 flex items-center text-primary font-bold text-sm tracking-tight group/btn">
            <span className="relative">
              Lihat Detail Program
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover/btn:w-full transition-all duration-300" />
            </span>
            <ArrowRight size={18} className="ml-2 text-secondary group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
