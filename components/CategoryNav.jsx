"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  UilAngleDown,
  UilFire,
  UilSun,
  UilTagAlt,
  UilArrowRight
} from "@iconscout/react-unicons";
import { categories } from "@/data/categories";

export default function CategoryNav() {
  const [activeHoverCategory, setActiveHoverCategory] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav className="bg-white border-b border-gray-100 hidden lg:block relative z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Categories Horizontal Menu Bar */}
          <div className="flex items-center gap-1">
            {categories.map((cat) => {
              const isHovered = activeHoverCategory === cat.slug;
              return (
                <div
                  key={cat.id}
                  className="relative group py-2.5"
                  onMouseEnter={() => setActiveHoverCategory(cat.slug)}
                  onMouseLeave={() => setActiveHoverCategory(null)}
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`relative px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 ${
                      isHovered
                        ? "bg-orange-50 text-[#F58220]"
                        : "text-gray-700 hover:text-[#F58220] hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <UilAngleDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-200 ${
                        isHovered ? "rotate-180 text-[#F58220]" : ""
                      }`}
                    />
                    {/* Animated Underline Slide */}
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#F58220] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                  </Link>

                  {/* Mega-Menu Dropdown Panel with AnimatePresence & Stagger */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 overflow-hidden"
                      >
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                          <span className="font-extrabold text-xs text-gray-900">
                            {cat.name} Subcategories
                          </span>
                          <Link
                            href={`/category/${cat.slug}`}
                            className="text-[11px] font-bold text-[#F58220] hover:underline flex items-center gap-0.5"
                          >
                            View All <UilArrowRight size={12} />
                          </Link>
                        </div>

                        {/* Staggered Subcategory Links */}
                        <div className="space-y-1">
                          {cat.subcategories.map((sub, idx) => (
                            <motion.div
                              key={sub.id}
                              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
                              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: idx * 0.03 }}
                            >
                              <Link
                                href={`/category/${cat.slug}?sub=${sub.slug}`}
                                className="block p-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-[#F58220] hover:bg-orange-50/70 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <span>{sub.name}</span>
                                  <span className="text-[10px] text-gray-400 font-normal">
                                    Explore
                                  </span>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Right Shortcuts */}
          <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
            <Link
              href="/category/smart-gadgets"
              className="flex items-center gap-1 text-[#F58220] hover:underline"
            >
              <UilFire size={15} /> Flash Deals
            </Link>
            <Link
              href="/category/home-appliances"
              className="flex items-center gap-1 hover:text-[#F58220] transition-colors"
            >
              <UilSun size={15} /> Super Savers
            </Link>
            <Link
              href="/category/home-essentials"
              className="flex items-center gap-1 hover:text-[#F58220] transition-colors"
            >
              <UilTagAlt size={15} /> Clearance
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
