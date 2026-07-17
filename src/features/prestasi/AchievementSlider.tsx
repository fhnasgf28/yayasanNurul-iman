"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

export type PrestasiItem = {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  badge: string;
};

const GAP = 24;

export default function AchievementSlider({ items }: { items: PrestasiItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const v = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setVisibleCount(v);
      setCardWidth((w - GAP * (v - 1)) / v);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  const next = useCallback(
    () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)),
    [maxIndex]
  );
  const prev = useCallback(
    () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1)),
    [maxIndex]
  );
  const goTo = useCallback(
    (i: number) => setCurrent(Math.min(Math.max(i, 0), maxIndex)),
    [maxIndex]
  );

  useEffect(() => {
    const t = setInterval(() => {
      if (!isPausedRef.current) next();
    }, 3500);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    if (current > maxIndex) setCurrent(maxIndex);
  }, [maxIndex, current]);

  const trackX = cardWidth > 0 ? -(current * (cardWidth + GAP)) : 0;

  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 bg-accent/20">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-secondary font-bold tracking-widest uppercase text-sm">
              <Award size={16} />
              Galeri Prestasi
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
              Santri Kami Berprestasi
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full bg-primary text-white hover:bg-primary/90 transition-all flex items-center justify-center shadow-md"
              aria-label="Berikutnya"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Track */}
        <div
          ref={containerRef}
          className="overflow-hidden"
          onMouseEnter={() => { isPausedRef.current = true; }}
          onMouseLeave={() => { isPausedRef.current = false; }}
        >
          <motion.div
            className="flex"
            style={{ gap: GAP }}
            animate={{ x: trackX }}
            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
          >
            {items.map((item, i) => (
              <div
                key={item.id ?? i}
                style={{
                  width: cardWidth > 0
                    ? cardWidth
                    : `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})`,
                  flexShrink: 0,
                }}
                className="rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                    {item.badge}
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-serif font-bold text-primary text-base leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-8 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-primary/20 hover:bg-primary/40"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
