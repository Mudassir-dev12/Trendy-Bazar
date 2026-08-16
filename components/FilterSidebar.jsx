"use client";

import React, { useState } from "react";
import { UilFilter, UilRedo, UilStar, UilTimes, UilCheck } from "@iconscout/react-unicons";
import { formatPrice } from "@/lib/data";

export default function FilterSidebar({
  category = null,
  selectedSubcategory = "",
  onSubcategoryChange = () => {},
  minPrice = 0,
  maxPrice = 200000,
  onPriceChange = () => {},
  minRating = 0,
  onRatingChange = () => {},
  sortBy = "popular",
  onSortChange = () => {},
  onResetFilters = () => {}
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const subcategories = category?.subcategories || [];

  const handleReset = () => {
    onResetFilters();
    setIsOpenMobile(false);
  };

  const Content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <UilFilter size={16} className="text-[#F58220]" />
          <h3 className="font-bold text-gray-900 text-base">Filter & Sort</h3>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-[#F58220] flex items-center gap-1 font-semibold transition-colors"
        >
          <UilRedo size={12} /> Reset All
        </button>
      </div>

      {/* Sort Selector */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Sort Products By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold rounded-xl p-2.5 focus:border-[#F58220] focus:ring-2 focus:ring-orange-100 outline-hidden"
        >
          <option value="popular">Most Popular & Top Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="discount">Highest Discount Savings</option>
          <option value="rating">Highest Customer Rating</option>
        </select>
      </div>

      {/* Subcategories Filter */}
      {subcategories.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
            Subcategories
          </label>
          <div className="space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar pr-1">
            <button
              onClick={() => onSubcategoryChange("")}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                !selectedSubcategory
                  ? "bg-orange-50 text-[#F58220] border border-orange-200"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <span>All Subcategories</span>
              {!selectedSubcategory && <UilCheck size={14} />}
            </button>
            {subcategories.map((sub) => {
              const isSelected = selectedSubcategory === sub.slug;
              return (
                <button
                  key={sub.id}
                  onClick={() => onSubcategoryChange(sub.slug)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-orange-50 text-[#F58220] border border-orange-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span>{sub.name}</span>
                  {isSelected && <UilCheck size={14} />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Price Range (PKR)
          </label>
          <span className="text-xs font-black text-[#F58220]">
            {formatPrice(minPrice)} - {formatPrice(maxPrice)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <span className="text-[10px] text-gray-400">Min (Rs.)</span>
            <input
              type="number"
              min="0"
              max={maxPrice}
              value={minPrice}
              onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs p-2 font-bold"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-400">Max (Rs.)</span>
            <input
              type="number"
              min={minPrice}
              max="200000"
              value={maxPrice}
              onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs p-2 font-bold"
            />
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="200000"
          step="1000"
          value={maxPrice}
          onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
          className="w-full accent-[#F58220] cursor-pointer"
        />
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Minimum Rating
        </label>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((stars) => {
            const isSelected = minRating === stars;
            return (
              <button
                key={stars}
                onClick={() => onRatingChange(isSelected ? 0 : stars)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors ${
                  isSelected ? "bg-orange-50 border border-orange-200 text-[#F58220]" : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <UilStar
                      key={i}
                      size={14}
                      className={i < stars ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="ml-1.5">& Up</span>
                </div>
                {isSelected && <UilCheck size={14} className="text-[#F58220]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Container */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-2xl p-5 border border-gray-100 shadow-xs h-fit sticky top-24">
        {Content}
      </aside>

      {/* Mobile Drawer Trigger Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpenMobile(true)}
          className="w-full bg-white border border-gray-200 shadow-xs rounded-xl p-3 flex items-center justify-between text-xs font-bold text-gray-800 hover:border-[#F58220]"
        >
          <span className="flex items-center gap-2">
            <UilFilter size={16} className="text-[#F58220]" /> Filter & Sort Products
          </span>
          <span className="bg-orange-50 text-[#F58220] px-2 py-0.5 rounded-full font-extrabold text-[11px]">
            Options
          </span>
        </button>
      </div>

      {/* Mobile Slide-Up Modal */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative custom-scrollbar">
            <button
              onClick={() => setIsOpenMobile(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full"
            >
              <UilTimes size={20} />
            </button>
            {Content}
            <button
              onClick={() => setIsOpenMobile(false)}
              className="w-full mt-6 bg-[#F58220] text-white py-3 rounded-xl font-bold text-sm shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
