"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  description: string;
}

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + (suffix || "");
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0</span>;
}

export default function StatCounter() {
  const stats: StatItemProps[] = [
    { value: 500, label: "Santri", suffix: "+", description: "Santri DTA Aktif" },
    { value: 10, label: "Tahun", suffix: "+", description: "Tahun Berkhidmat" },
    { value: 12, label: "Pengajar", description: "Asatidz Berpengalaman" },
    { value: 1000, label: "Jamaah", suffix: "+", description: "Jamaah Rutin" },
  ];

  return (
    <section className="relative z-20 mt-0 md:-mt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={cn(
                "bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-secondary/5 text-center space-y-2 group hover:-translate-y-2 transition-all duration-500",
                index % 2 === 1 ? "md:mt-10" : ""
              )}
            >
              <div className="text-4xl md:text-6xl font-serif font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="space-y-1">
                <p className="text-sm md:text-lg font-bold text-primary uppercase tracking-tighter">
                  {stat.label}
                </p>
                <p className="text-[10px] md:text-xs text-gray-400 font-medium tracking-widest uppercase">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
