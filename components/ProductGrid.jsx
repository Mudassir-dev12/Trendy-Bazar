"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { fadeUp } from "@/lib/motion";

export default function ProductGrid({
  products = [],
  title = "",
  subtitle = "",
  columns = "4",
  isLoading = false,
  onLoadMore = null,
  hasMore = false,
  isLoadingMore = false
}) {
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
        <>
          <div className={`grid ${gridCols} gap-2.5 sm:gap-4 md:gap-6`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          {onLoadMore && hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-black hover:to-black text-white px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                {isLoadingMore ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading More...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Products</span>
                    <span className="text-[#F58220] font-black text-sm">↓</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
