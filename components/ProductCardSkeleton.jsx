"use client";

import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-xs flex flex-col h-full overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full pt-[85%] bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Card Content Skeleton */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-grow justify-between bg-white space-y-3">
        <div className="space-y-2">
          {/* Subcategory tag */}
          <div className="h-3 w-1/3 bg-gray-200 rounded-md" />

          {/* Title 2 lines */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-full bg-gray-200 rounded-md" />
            <div className="h-3.5 w-4/5 bg-gray-200 rounded-md" />
          </div>

          {/* Star rating placeholder */}
          <div className="h-2.5 w-1/4 bg-gray-100 rounded-md mt-1" />
        </div>

        {/* Footer Price & Action */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="h-5 w-20 bg-gray-200 rounded-md" />
          <div className="h-7 w-16 bg-gray-200 rounded-lg shrink-0" />
        </div>
      </div>
    </div>
  );
}
