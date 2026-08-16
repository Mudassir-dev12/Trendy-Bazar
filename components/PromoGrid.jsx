"use client";

import React from "react";
import Link from "next/link";

export default function PromoGrid() {
  return (
    <section className="my-6 sm:my-8">
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* Card 1: Featured Hero Card (Span 2 on mobile, 4 cols on lg) */}
        <div className="col-span-2 lg:col-span-4 bg-[#f4e7be] rounded-3xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden min-h-[260px] sm:min-h-[360px] shadow-xs hover:shadow-md transition-shadow">
          <div className="relative z-10 space-y-2 sm:space-y-3 max-w-xs">
            <span className="text-[10px] sm:text-xs font-bold text-gray-800 tracking-wide uppercase">
              FEATURED COLLECTION
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-gray-900 leading-tight">
              Next-Gen Audio & Smart Gadgets
            </h2>
            <div>
              <Link
                href="/category/smart-gadgets"
                className="inline-block bg-gray-900 hover:bg-black text-white text-[11px] sm:text-xs font-bold py-2 px-5 sm:py-2.5 sm:px-6 rounded-full transition-all shadow-xs"
              >
                Explore Gadgets
              </Link>
            </div>
          </div>

          <div className="relative z-0 mt-4 -mb-5 -mx-5 sm:-mb-7 sm:-mx-7 flex justify-end">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
              alt="Smart Gadgets & Audio"
              className="w-full h-40 sm:h-60 object-cover object-center rounded-b-3xl"
              suppressHydrationWarning
            />
          </div>
        </div>

        {/* Center Section: Kitchen & Appliances (Span 2 on mobile, 5 cols on lg) */}
        <div className="col-span-2 lg:col-span-5 flex flex-col gap-3 sm:gap-4">
          {/* Card 2: Kitchen cookware banner */}
          <div className="bg-[#f2ece4] rounded-3xl p-4 sm:p-6 flex flex-row items-center justify-between overflow-hidden relative min-h-[140px] sm:min-h-[160px] shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-1.5 z-10 max-w-[180px] sm:max-w-[200px]">
              <span className="text-[10px] sm:text-xs font-semibold text-gray-700 block">
                Home Essentials
              </span>
              <h3 className="text-sm sm:text-lg font-black text-gray-900 leading-snug">
                Kitchen cookware, dining & organization
              </h3>
              <Link
                href="/category/home-essentials"
                className="inline-block text-[11px] sm:text-xs font-bold text-gray-900 underline hover:text-[#F58220]"
              >
                Shop Essentials
              </Link>
            </div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 relative">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80"
                alt="Kitchen & Home Essentials"
                className="w-full h-full object-cover rounded-2xl"
                suppressHydrationWarning
              />
            </div>
          </div>

          {/* 2-Column Mobile Grid Row (Card 3 & Card 4 side-by-side on mobile) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1">
            {/* Card 3: Home Appliances */}
            <div className="col-span-1 bg-[#e9eff2] rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden min-h-[160px] sm:min-h-[180px] shadow-xs hover:shadow-md transition-shadow">
              <div className="space-y-1 z-10">
                <h4 className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
                  Modern Smart Home Appliances
                </h4>
                <Link
                  href="/category/home-appliances"
                  className="inline-block text-[10px] sm:text-xs font-bold text-gray-900 underline hover:text-[#F58220]"
                >
                  Shop Appliances
                </Link>
              </div>
              <div className="mt-2 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format&fit=crop&q=80"
                  alt="Home Appliances"
                  className="w-20 h-16 sm:w-28 sm:h-20 object-contain rounded-lg"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Card 4: Quality Guarantee Card */}
            <div className="col-span-1 bg-[#e5eef7] rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between relative overflow-hidden min-h-[160px] sm:min-h-[180px] shadow-xs hover:shadow-md transition-shadow">
              <div className="space-y-1 z-10">
                <h4 className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
                  100% Direct Bazaar Warranty
                </h4>
                <Link
                  href="/category/smart-gadgets"
                  className="inline-block text-[10px] sm:text-xs font-bold text-gray-900 underline hover:text-[#F58220]"
                >
                  Learn more
                </Link>
              </div>
              <div className="mt-2 flex justify-center">
                <div className="w-full max-w-[110px] h-12 sm:h-14 bg-gradient-to-r from-orange-600 to-amber-500 rounded-xl p-1.5 sm:p-2 text-white shadow-xs flex flex-col justify-between">
                  <span className="text-[8px] sm:text-[9px] font-black tracking-wider">TRENDY BAZAAR</span>
                  <div className="flex justify-between items-center text-[9px] sm:text-[10px]">
                    <span className="truncate">CERTIFIED</span>
                    <span className="font-bold">★ 4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Right Banner (Toys & Games, Span 2 on mobile, 3 cols on lg) */}
        <div className="col-span-2 lg:col-span-3 bg-[#b5d3e7] rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[260px] sm:min-h-[360px] shadow-xs hover:shadow-md transition-shadow">
          <div className="space-y-1.5 z-10">
            <span className="text-[10px] sm:text-xs font-semibold text-gray-800 block">
              Kids & Family Favorites
            </span>
            <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">
              STEM Toys, RC Trucks & Board Games
            </h3>
            <Link
              href="/category/toys"
              className="inline-block text-[11px] sm:text-xs font-bold text-gray-900 underline hover:text-[#F58220]"
            >
              Shop Toys
            </Link>
          </div>

          <div className="-mb-5 -mx-5 sm:-mb-6 sm:-mx-6 mt-3">
            <img
              src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80"
              alt="Toys & Games"
              className="w-full h-40 sm:h-56 object-cover rounded-b-3xl"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
    </section>
  );
}
