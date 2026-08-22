"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import { useProducts } from "@/context/ProductContext";
import { filterProducts } from "@/lib/data";
import { trackSearch } from "@/lib/pixel";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { products, isLoading } = useProducts();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setPage(1);
    if (query) {
      trackSearch(query);
    }
  }, [query]);

  const results = filterProducts({
    products,
    query,
    minPrice,
    maxPrice,
    minRating,
    sortBy
  });

  const totalPages = Math.ceil(results.length / itemsPerPage) || 1;
  const paginatedResults = results.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(200000);
    setMinRating(0);
    setSortBy("popular");
    setPage(1);
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
            setPage(1);
          }}
          minRating={minRating}
          onRatingChange={(r) => {
            setMinRating(r);
            setPage(1);
          }}
          sortBy={sortBy}
          onSortChange={(s) => {
            setSortBy(s);
            setPage(1);
          }}
          onResetFilters={handleResetFilters}
        />

        <div className="flex-1 w-full">
          <ProductGrid products={paginatedResults} columns="3" isLoading={isLoading && paginatedResults.length === 0} />

          {results.length > itemsPerPage && (
            <div className="mt-8 bg-white rounded-2xl p-4 border border-gray-100 shadow-xs">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={results.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setPage}
                scrollToTop={true}
                className="py-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchClient() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-gray-500">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
