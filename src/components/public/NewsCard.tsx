"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: string | null;
    createdAt: Date;
    author: {
      name: string;
    };
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row gap-6 group"
    >
      <Link href={`/news/${news.slug}`} className="relative h-48 w-full md:w-64 shrink-0 overflow-hidden rounded-xl">
        <img
          src={news.thumbnail || "/placeholder-news.jpg"}
          alt={news.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="flex flex-col justify-center py-2">
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar size={14} className="text-accent" />
            <span>{formatDate(news.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={14} className="text-accent" />
            <span>{news.author.name}</span>
          </div>
        </div>
        
        <Link href={`/news/${news.slug}`}>
          <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors leading-snug">
            {news.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {news.excerpt}
        </p>
      </div>
    </motion.article>
  );
}
