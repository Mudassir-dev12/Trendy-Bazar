"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UilAngleRight } from "@iconscout/react-unicons";
import ProductCard from "./ProductCard";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80";

export default function FeaturedSplitSection({ products = [], isLoading = false }) {
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  // One by one item auto scroll effect from right to left
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const stepWidth = clientWidth < 640 ? clientWidth / 2 : 240;

        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: stepWidth, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  if (isLoading || !products || products.length === 0) {
    return (
      <section className="my-6 sm:my-8 animate-pulse">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <div className="h-6 w-56 bg-gray-200 rounded-md mb-1" />
            <div className="h-3.5 w-72 bg-gray-100 rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-7 flex gap-3 overflow-hidden">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-[calc(50%-5px)] sm:w-56 shrink-0 bg-white rounded-2xl border border-gray-100 p-3 space-y-3">
                <div className="w-full pt-[85%] bg-gray-200 rounded-xl" />
                <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                <div className="h-5 w-16 bg-gray-200 rounded-md" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-5 bg-gray-200 rounded-2xl min-h-[260px]" />
        </div>
      </section>
    );
  }

  const tableProducts = products.slice(0, 6);

  return (
    <section className="my-6 sm:my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            Kitchen & Home Essentials
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 font-medium mt-0.5">
            Cookware, ceramic dinnerware, glass containers & organizers.
          </p>
        </div>
        <Link
          href="/category/home-essentials"
          className="text-xs md:text-sm font-bold text-gray-900 underline hover:text-[#F58220]"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* Left Side: Product Slider (7 cols on lg, 2 cards visible on mobile) */}
        <div
          className="lg:col-span-7 relative group/table"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            ref={sliderRef}
            className="flex items-stretch gap-2.5 sm:gap-4 overflow-x-auto custom-scrollbar pb-3 snap-x scroll-smooth"
          >
            {tableProducts.map((product) => (
              <div
                key={product.id}
                className="w-[calc(50%-5px)] sm:w-56 shrink-0 snap-start flex flex-col"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Carousel Scroll Arrow */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-all opacity-90 sm:opacity-0 sm:group-hover/table:opacity-100"
          >
            <UilAngleRight size={20} />
          </button>
        </div>

        {/* Right Side: Featured Highlight Banner Box (5 cols on lg) */}
        <div className="lg:col-span-5 bg-[#7c4d25] text-white rounded-3xl p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[240px] sm:min-h-[300px] shadow-xs">
          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-xs">
            <h3 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
              Durable dinnerware & glassware
            </h3>

            <Link
              href="/category/home-essentials"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-black text-xs px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all shadow-md transform hover:-translate-y-0.5"
            >
              Shop now
            </Link>

            <div className="pt-2 sm:pt-4">
              <span className="text-[11px] sm:text-xs font-medium text-amber-200 block">From</span>
              <span className="text-xl sm:text-2xl font-black text-white">Rs. 499</span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-1/2 sm:w-3/5 h-full opacity-90 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80"
              alt="Dinnerware & Glassware"
              className="w-full h-full object-cover object-center rounded-r-3xl"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
    </section>
  );
}
