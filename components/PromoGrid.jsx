"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, ChefHat, Gamepad2, Tv, Star } from "lucide-react";
import { buttonPressProps } from "@/lib/motion";

export default function PromoGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="my-8 sm:my-12">
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Card 1: Next-Gen Audio & Smart Gadgets (Hero Card 4 cols on lg) */}
        <motion.div
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="col-span-2 lg:col-span-4 bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px] sm:min-h-[400px] shadow-xs hover:shadow-xl transition-all border border-amber-300/60 group"
        >
          {/* Subtle Decorative Background Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />

          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 backdrop-blur-md text-gray-950 text-[10px] sm:text-xs font-black tracking-wider uppercase border border-black/10">
              <Zap className="w-3.5 h-3.5 fill-gray-950" /> FEATURED COLLECTION
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 tracking-tight leading-[1.1]">
              Next-Gen Audio & Smart Gadgets
            </h2>

            <p className="text-xs sm:text-sm font-medium text-gray-900/80 leading-relaxed">
              Wireless noise-canceling headphones, smart bands & fast chargers.
            </p>

            <div className="pt-1">
              <motion.div {...buttonPressProps} className="inline-block">
                <Link
                  href="/category/smart-gadgets"
                  className="bg-gray-950 hover:bg-black text-white text-xs sm:text-sm font-extrabold py-2.5 px-6 sm:py-3 sm:px-7 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all group/btn"
                >
                  <span>Explore Gadgets</span>
                  <ArrowRight className="w-4 h-4 text-[#F58220] group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="relative z-0 mt-4 -mb-8 -mx-8 sm:-mb-10 sm:-mx-10 flex justify-end">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
              alt="Smart Gadgets & Audio"
              className="w-full h-44 sm:h-64 object-cover object-center rounded-b-3xl group-hover:scale-105 transition-transform duration-500 ease-out"
              suppressHydrationWarning
            />
          </div>
        </motion.div>

        {/* Center Grid Column (5 cols on lg) */}
        <div className="col-span-2 lg:col-span-5 flex flex-col gap-4 sm:gap-6">
          {/* Card 2: Kitchen cookware banner */}
          <motion.div
            whileHover={prefersReducedMotion ? {} : { y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-gradient-to-r from-orange-50/90 via-amber-50/80 to-stone-100 rounded-3xl p-5 sm:p-7 flex flex-row items-center justify-between overflow-hidden relative min-h-[150px] sm:min-h-[180px] shadow-xs hover:shadow-md transition-all border border-orange-200/50 group"
          >
            <div className="space-y-2 z-10 max-w-[200px] sm:max-w-[240px]">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold text-[#F58220] uppercase tracking-wider">
                <ChefHat className="w-3.5 h-3.5" /> Home Essentials
              </span>
              <h3 className="text-base sm:text-xl font-black text-gray-900 leading-snug">
                Kitchen cookware, dining & organization
              </h3>
              <Link
                href="/category/home-essentials"
                className="inline-flex items-center gap-1 text-xs font-bold text-gray-950 underline hover:text-[#F58220] transition-colors group/link"
              >
                <span>Shop Essentials</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 relative rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80"
                alt="Kitchen & Home Essentials"
                className="w-full h-full object-cover"
                suppressHydrationWarning
              />
            </div>
          </motion.div>

          {/* 2-Column Row inside Center Section */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1">
            {/* Card 3: Modern Smart Home Appliances */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="col-span-1 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-white rounded-3xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[180px] sm:min-h-[200px] shadow-md hover:shadow-xl transition-all border border-gray-800 group"
            >
              <div className="space-y-1.5 z-10">
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-[#F58220] uppercase tracking-wider">
                  <Tv className="w-3 h-3" /> APPLIANCES
                </span>
                <h4 className="text-xs sm:text-base font-black text-white leading-tight">
                  Modern Smart Appliances
                </h4>
                <Link
                  href="/category/home-appliances"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-amber-200 hover:text-white transition-colors group/app"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3 h-3 group-hover/app:translate-x-1 transition-transform text-[#F58220]" />
                </Link>
              </div>

              <div className="mt-3 flex justify-center z-10">
                <img
                  src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format&fit=crop&q=80"
                  alt="Home Appliances"
                  className="w-24 h-18 sm:w-32 sm:h-22 object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  suppressHydrationWarning
                />
              </div>
            </motion.div>

            {/* Card 4: Quality Guarantee Card */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="col-span-1 bg-gradient-to-br from-[#F58220] via-orange-500 to-amber-500 text-white rounded-3xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden min-h-[180px] sm:min-h-[200px] shadow-md hover:shadow-xl transition-all border border-orange-400/50 group"
            >
              {/* Background watermark icon */}
              <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white/15 pointer-events-none" />

              <div className="space-y-1.5 z-10">
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black tracking-widest uppercase bg-black/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" /> GUARANTEED
                </span>
                <h4 className="text-xs sm:text-base font-black text-white leading-tight">
                  14-Day Hassle-Free Return
                </h4>
                <Link
                  href="/category/smart-gadgets"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-white/90 underline hover:text-white transition-colors"
                >
                  <span>Learn details</span>
                </Link>
              </div>

              <div className="mt-3 z-10 flex items-center justify-between bg-black/20 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/20">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-black tracking-wider block text-white/80">TRENDY BAZAAR</span>
                  <span className="text-[10px] sm:text-xs font-black text-emerald-300">CERTIFIED</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-xl text-xs font-black">
                  <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>4.9</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Card 5: Right Banner (Kids & Family Favorites - 3 cols on lg) */}
        <motion.div
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="col-span-2 lg:col-span-3 bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-100 rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden min-h-[300px] sm:min-h-[400px] shadow-xs hover:shadow-xl transition-all border border-sky-200/70 group"
        >
          <div className="space-y-2 sm:space-y-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-sky-900 text-[10px] sm:text-xs font-extrabold tracking-wider uppercase border border-sky-200">
              <Gamepad2 className="w-3.5 h-3.5 text-indigo-600" /> KIDS & FAMILY
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-gray-950 leading-tight">
              STEM Toys, RC Trucks & Board Games
            </h3>
            <div>
              <Link
                href="/category/toys"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-gray-950 underline hover:text-[#F58220] transition-colors group/toy"
              >
                <span>Shop Toys & Games</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/toy:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="-mb-6 -mx-6 sm:-mb-7 sm:-mx-7 mt-4">
            <img
              src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80"
              alt="Toys & Games"
              className="w-full h-44 sm:h-64 object-cover rounded-b-3xl group-hover:scale-105 transition-transform duration-500 ease-out"
              suppressHydrationWarning
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
