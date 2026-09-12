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

  const { fetchProductsPage } = useProducts();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (query) {
      trackSearch(query);
    }
  }, [query]);

  // Load initial page of 10 search items
  useEffect(() => {
    let isMounted = true;
    async function loadSearchPage() {
      setIsLoading(true);
      setPage(1);
      const res = await fetchProductsPage({
        query,
        page: 1,
        pageSize: 10,
        minPrice,
        maxPrice,
        minRating,
        sortBy
      });

      if (isMounted) {
        setResults(res.products || []);
        setHasMore(res.hasMore || false);
        setIsLoading(false);
      }
    }

    loadSearchPage();
    return () => {
      isMounted = false;
    };
  }, [query, minPrice, maxPrice, minRating, sortBy]);

  // Load next batch of 10 items
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    const res = await fetchProductsPage({
      query,
      page: nextPage,
      pageSize: 10,
      minPrice,
      maxPrice,
      minRating,
      sortBy
    });

    setResults((prev) => [...prev, ...(res.products || [])]);
    setHasMore(res.hasMore || false);
    setPage(nextPage);
    setIsLoadingMore(false);
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(200000);
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
            Showing {results.length} matching products across Trendy Bazaar catalog
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
          onRatingChange={(r) => {
            setMinRating(r);
          }}
          sortBy={sortBy}
          onSortChange={(s) => {
            setSortBy(s);
          }}
          onResetFilters={handleResetFilters}
        />

        <div className="flex-1 w-full">
          <ProductGrid
            products={results}
            columns="3"
            isLoading={isLoading}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
          />
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
