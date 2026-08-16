"use client";

import React from "react";
import Link from "next/link";
import { UilArrowRight, UilSun } from "@iconscout/react-unicons";
import { categories } from "@/data/categories";

export default function CategoryGrid() {
  return (
    <section className="my-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-100 text-[#F58220] rounded-xl">
            <UilSun size={18} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              SHOP BY CATEGORY
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Explore our wide variety of top-rated lifestyle collections
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group relative bg-white border border-gray-100 hover:border-orange-200 rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Soft background accent blob */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-gray-50 group-hover:bg-[#F58220] group-hover:text-white text-gray-800 rounded-2xl flex items-center justify-center text-2xl shadow-xs transition-colors duration-300 mb-4">
                {cat.icon}
              </div>

              <h3 className="font-extrabold text-gray-900 text-base group-hover:text-[#F58220] transition-colors mb-1">
                {cat.name}
              </h3>

              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                {cat.description}
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-gray-100/80 flex items-center justify-between text-xs font-bold text-[#F58220]">
              <span>{cat.subcategories?.length || 4} Subcategories</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <UilArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
