"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { UilFire, UilClock, UilArrowRight } from "@iconscout/react-unicons";
import ProductGrid from "./ProductGrid";
import { fadeUp } from "@/lib/motion";

export default function FlashDeals({ products = [] }) {
  const prefersReducedMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!products || products.length === 0) return null;

  return (
    <section id="flash-deals" className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-red-500/10 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-orange-200/60 shadow-xs my-8">
      {/* Header with Title, Live Countdown & View All - Animated with whileInView */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={prefersReducedMotion ? {} : fadeUp}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-orange-200/50"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-[#F58220] text-white px-3.5 py-1.5 rounded-xl shadow-md">
            <UilFire size={18} className="animate-bounce" />
            <h2 className="font-black text-sm md:text-base tracking-tight uppercase">
              FLASH DEALS
            </h2>
          </div>

          {/* Ticking Timer */}
          <div className="flex items-center gap-1.5 bg-white border border-orange-200 px-3 py-1.5 rounded-xl shadow-2xs">
            <UilClock size={16} className="text-[#F58220]" />
            <span className="text-xs font-bold text-gray-600">Ends In:</span>
            <div className="flex items-center gap-1 font-black text-xs text-gray-900 font-mono">
              <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded-md">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded-md">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="bg-[#F58220] text-white px-1.5 py-0.5 rounded-md animate-pulse">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/category/smart-gadgets"
          className="text-xs font-black text-[#F58220] hover:text-[#E06D0F] flex items-center gap-1 group transition-colors self-end sm:self-auto"
        >
          <span>See All Flash Offers</span>
          <UilArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Grid of Flash Deal Cards */}
      <ProductGrid products={products} columns="4" />
    </section>
  );
}
