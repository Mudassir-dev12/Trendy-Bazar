"use client";

import React from "react";

export default function AdminTableSkeleton({ rows = 8, type = "products" }) {
  return (
    <div className="w-full animate-pulse">
      {/* Stat Cards Skeleton (if rendered at top) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-2xl shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-20 bg-gray-200 rounded-md" />
              <div className="h-6 w-28 bg-gray-300 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {/* Table Header Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="h-4 w-40 bg-gray-200 rounded-md" />
          <div className="h-4 w-28 bg-gray-100 rounded-md" />
        </div>

        {/* Shimmer Rows */}
        <div className="divide-y divide-gray-100">
          {[...Array(rows)].map((_, idx) => (
            <div
              key={idx}
              className="p-3.5 flex items-center justify-between gap-4"
            >
              {type === "products" ? (
                <>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg shrink-0" />
                    <div className="space-y-1.5 flex-1 max-w-xs">
                      <div className="h-3.5 w-full bg-gray-200 rounded-md" />
                      <div className="h-2.5 w-24 bg-gray-100 rounded-md" />
                    </div>
                  </div>
                  <div className="h-4 w-20 bg-gray-200 rounded-md hidden sm:block" />
                  <div className="h-4 w-16 bg-orange-100 rounded-md" />
                  <div className="h-4 w-12 bg-gray-200 rounded-md hidden md:block" />
                  <div className="h-6 w-16 bg-gray-200 rounded-md shrink-0" />
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-7 h-7 bg-gray-100 rounded-lg" />
                    <div className="w-7 h-7 bg-gray-100 rounded-lg" />
                    <div className="w-7 h-7 bg-gray-100 rounded-lg" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1 w-24">
                    <div className="h-3.5 w-20 bg-gray-200 rounded-md font-mono" />
                    <div className="h-2.5 w-14 bg-gray-100 rounded-md" />
                  </div>
                  <div className="space-y-1 flex-1 max-w-xs">
                    <div className="h-3.5 w-32 bg-gray-200 rounded-md" />
                    <div className="h-2.5 w-40 bg-gray-100 rounded-md" />
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded-md hidden sm:block" />
                  <div className="h-4 w-20 bg-orange-100 rounded-md" />
                  <div className="h-6 w-24 bg-gray-200 rounded-lg" />
                  <div className="w-16 h-7 bg-gray-100 rounded-lg" />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="p-3.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="h-4 w-32 bg-gray-200 rounded-md" />
          <div className="h-7 w-48 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
