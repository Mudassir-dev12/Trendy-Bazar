"use client";

import React from "react";
import { UilAngleLeft, UilAngleRight } from "@iconscout/react-unicons";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 12,
  onPageChange,
  scrollToTop = false,
  alwaysShow = false,
  className = ""
}) {
  if (totalPages <= 1 && !alwaysShow) return null;

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    if (scrollToTop && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate windowed page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || currentPage * itemsPerPage);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 select-none ${className}`}
    >
      {/* Item Range Counter */}
      {totalItems > 0 && (
        <p className="text-xs sm:text-sm text-gray-500 font-medium order-2 sm:order-1">
          Showing <span className="font-bold text-gray-900">{startItem}</span> -{" "}
          <span className="font-bold text-gray-900">{endItem}</span> of{" "}
          <span className="font-bold text-gray-900">{totalItems}</span> items
        </p>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-1 sm:gap-1.5 order-1 sm:order-2">
        {/* Prev Button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous Page"
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
        >
          <UilAngleLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, idx) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center text-xs text-gray-400 font-bold"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                aria-current={isActive ? "page" : undefined}
                className={`w-7 sm:w-8.5 h-7 sm:h-8.5 rounded-lg text-xs sm:text-sm font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#F58220] text-white shadow-xs scale-105"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next Page"
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
        >
          <span className="hidden sm:inline">Next</span>
          <UilAngleRight size={16} />
        </button>
      </div>
    </div>
  );
}
