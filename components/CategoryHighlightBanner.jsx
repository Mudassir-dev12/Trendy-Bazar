"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { UilArrowRight } from "@iconscout/react-unicons";
import { categoryBanners } from "@/data/categoryBanners";
import { buttonPressProps } from "@/lib/motion";

export default function CategoryHighlightBanner() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <section className="my-8 sm:my-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-2">
        <div>
          <span className="text-xs font-extrabold text-[#F58220] tracking-wider uppercase block mb-1">
            Featured Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
            Explore our 4 main collections with direct manufacturer prices
          </p>
        </div>

        <Link
          href="/category/smart-gadgets"
          className="text-xs sm:text-sm font-extrabold text-gray-900 underline hover:text-[#F58220] transition-colors shrink-0"
        >
          View all categories →
        </Link>
      </div>

      {/* 4-Card Highlight Grid */}
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {categoryBanners.map((banner) => (
          <motion.div
            key={banner.id}
            variants={prefersReducedMotion ? {} : cardVariants}
          >
            <motion.div {...buttonPressProps} className="h-full">
              <Link
                href={`/category/${banner.slug}`}
                className="group relative block rounded-3xl overflow-hidden h-72 sm:h-80 lg:h-96 border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 focus:outline-hidden focus:ring-4 focus:ring-[#F58220]/50"
              >
                {/* Full-Bleed Unsplash Background Image */}
                <img
                  src={banner.imageUrl}
                  alt={banner.altText}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  suppressHydrationWarning
                />

                {/* Dark Gradient Overlay for WCAG AA Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 group-hover:from-black/98 transition-colors duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#F58220] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {banner.badgeText}
                  </span>
                </div>

                {/* Card Content */}
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white z-10">
                  <div className="transform group-hover:-translate-y-1 transition-transform duration-300 space-y-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none group-hover:text-amber-100 transition-colors drop-shadow-md">
                      {banner.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-200 font-semibold leading-snug drop-shadow-xs pt-1">
                      {banner.tagline}{" "}
                      <span className="text-[#F58220] font-black">{banner.highlightWord}</span>
                    </p>

                    <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed pt-0.5">
                      {banner.description}
                    </p>
                  </div>

                  {/* Animated Shop Now Button */}
                  <div className="mt-4 pt-1">
                    <span className="inline-flex items-center gap-1.5 bg-white text-gray-900 group-hover:bg-[#F58220] group-hover:text-white text-xs font-black px-4 py-2 rounded-full shadow-md transform group-hover:translate-x-1 transition-all duration-300">
                      Shop Now <UilArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
