"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import { useProducts } from "@/context/ProductContext";
import { filterProducts } from "@/lib/data";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { products } = useProducts();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");

  const results = filterProducts({
    products,
    query,
    minPrice,
    maxPrice,
    minRating,
    sortBy
  });

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(500);
    setMinRating(0);
    setSortBy("popular");
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Search Results" }, { label: query ? `"${query}"` : "All Products" }]} />

      <div className="bg-white rounded-2xl md:rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900">
            Search Results for "{query}"
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Found {results.length} matching products across Trendy Bazaar catalog
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <FilterSidebar
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
          minRating={minRating}
          onRatingChange={setMinRating}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
        />

        <div className="flex-1 w-full">
          <ProductGrid products={results} columns="3" />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-gray-500">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
