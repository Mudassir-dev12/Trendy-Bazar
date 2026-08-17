"use client";

import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="h-4 w-48 bg-gray-200 rounded-md" />

      {/* Main Product Hero Grid Skeleton */}
      <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-100 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 w-full bg-gray-200 rounded-2xl overflow-hidden" />
          <div className="grid grid-cols-5 gap-2.5 pt-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="aspect-square bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Right Column: Info Skeleton */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-orange-100 rounded-md" />
            <div className="h-7 w-5/6 bg-gray-200 rounded-md" />
            <div className="h-7 w-3/4 bg-gray-200 rounded-md" />
            <div className="h-4 w-32 bg-gray-100 rounded-md mt-2" />
          </div>

          {/* Pricing Box Skeleton */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="h-8 w-36 bg-gray-200 rounded-lg" />
          </div>

          {/* Short Description Skeleton */}
          <div className="space-y-2 py-2">
            <div className="h-3.5 w-full bg-gray-200 rounded-md" />
            <div className="h-3.5 w-full bg-gray-200 rounded-md" />
            <div className="h-3.5 w-2/3 bg-gray-200 rounded-md" />
          </div>

          {/* Buttons Skeleton */}
          <div className="space-y-3 pt-2">
            <div className="h-12 w-full bg-orange-200 rounded-xl" />
            <div className="h-12 w-full bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
