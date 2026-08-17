"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { fadeUp } from "@/lib/motion";

export default function ProductGrid({ products = [], title = "", subtitle = "", columns = "4", isLoading = false }) {
  const prefersReducedMotion = useReducedMotion();

  const colClassMap = {
    "2": "grid-cols-2 sm:grid-cols-2",
    "3": "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    "5": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  };

  const gridCols = colClassMap[columns] || colClassMap["4"];

  const skeletonCount = columns === "3" ? 6 : columns === "2" ? 4 : 8;

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={prefersReducedMotion ? {} : fadeUp}
          className="mb-4 sm:mb-6"
        >
          {title && (
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </motion.div>
      )}

      {isLoading ? (
        <div className={`grid ${gridCols} gap-2.5 sm:gap-4 md:gap-6`}>
          {[...Array(skeletonCount)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-gray-100 shadow-xs my-4">
          <div className="w-14 h-14 bg-orange-50 text-[#F58220] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
            🔍
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800">No products found</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
            Try adjusting your search term or filters to find what you are looking for.
          </p>
        </div>
      ) : (
        <div className={`grid ${gridCols} gap-2.5 sm:gap-4 md:gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
