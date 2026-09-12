"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UilAngleLeft, UilAngleRight } from "@iconscout/react-unicons";
import ProductCard from "./ProductCard";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

export default function ProductSlider({ title, subtitle, products = [], viewAllLink = "/category/smart-gadgets", isLoading = false }) {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // One by one item auto scroll effect from right to left
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        // Step width of 1 product card (~180px on mobile, ~260px on sm)
        const stepWidth = clientWidth < 640 ? clientWidth / 2 : 260;

        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: stepWidth, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (isLoading || !products || products.length === 0) {
    return (
      <section className="my-6 sm:my-8 animate-pulse">
        {/* Section Header Skeleton */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <div className="h-6 w-48 bg-gray-200 rounded-md mb-1" />
            {subtitle && <div className="h-3.5 w-64 bg-gray-100 rounded-md" />}
          </div>
        </div>

        {/* Shimmer Cards Track */}
        <div className="flex gap-2.5 sm:gap-4 overflow-hidden py-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="w-[calc(50%-5px)] sm:w-60 md:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3.5 space-y-3"
            >
              <div className="w-full pt-[85%] bg-gray-200 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
              <div className="h-3.5 w-1/2 bg-gray-100 rounded-md" />
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                <div className="h-5 w-16 bg-gray-200 rounded-md" />
                <div className="h-7 w-14 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-xs md:text-sm font-bold text-gray-900 underline hover:text-[#F58220] transition-colors shrink-0"
          >
            Shop all
          </Link>
        )}
      </div>

      {/* Slider Container with Hover Nav Buttons & Auto Scroll Pause */}
      <div
        className="relative group/slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="hidden sm:flex absolute -left-3 top-[38%] -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-gray-200 text-gray-800 items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all sm:opacity-0 sm:group-hover/slider:opacity-100 cursor-pointer"
        >
          <UilAngleLeft size={20} />
        </button>

        {/* Horizontal Scroll Track */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-2.5 sm:gap-4 overflow-x-auto custom-scrollbar pb-3 pt-1 snap-x scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50%-5px)] sm:w-60 md:w-64 shrink-0 snap-start flex flex-col"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="hidden sm:flex absolute -right-3 top-[38%] -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-gray-200 text-gray-800 items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all sm:opacity-0 sm:group-hover/slider:opacity-100 cursor-pointer"
        >
          <UilAngleRight size={20} />
        </button>
      </div>
    </section>
  );
}
