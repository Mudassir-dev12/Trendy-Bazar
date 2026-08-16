"use client";

import React, { useState, use, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import { useProducts } from "@/context/ProductContext";
import { getCategoryBySlug, filterProducts } from "@/lib/data";

function CategoryContent({ slug }) {
  const searchParams = useSearchParams();
  const subQuery = searchParams.get("sub") || "";

  const { products } = useProducts();
  const category = getCategoryBySlug(slug);

  const [selectedSubcategory, setSelectedSubcategory] = useState(subQuery);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [displayCount, setDisplayCount] = useState(12);

  React.useEffect(() => {
    if (subQuery) {
      setSelectedSubcategory(subQuery);
    }
  }, [subQuery]);

  if (!category) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Category Not Found</h2>
        <p className="text-gray-500 mt-2">The category you requested does not exist.</p>
      </div>
    );
  }

  const filtered = filterProducts({
    products,
    category: slug,
    subcategory: selectedSubcategory,
    minPrice,
    maxPrice,
    minRating,
    sortBy
  });

  const visibleProducts = filtered.slice(0, displayCount);

  const handleResetFilters = () => {
    setSelectedSubcategory("");
    setMinPrice(0);
    setMaxPrice(500);
    setMinRating(0);
    setSortBy("popular");
    setDisplayCount(12);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: category.name, href: `/category/${category.slug}` },
          ...(selectedSubcategory
            ? [
                {
                  label:
                    category.subcategories.find((s) => s.slug === selectedSubcategory)?.name ||
                    selectedSubcategory
                }
              ]
            : [])
        ]}
      />

      {/* Category Banner Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-orange-950 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">{category.name}</h1>
            <span className="bg-[#F58220] text-white text-xs font-bold px-2.5 py-0.5 rounded-full ml-2">
              {category.badge}
            </span>
          </div>
          <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-amber-200">
          Showing {filtered.length} products
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Filter Sidebar */}
        <FilterSidebar
          category={category}
          selectedSubcategory={selectedSubcategory}
          onSubcategoryChange={setSelectedSubcategory}
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

        {/* Product Grid Area */}
        <div className="flex-1 w-full">
          <ProductGrid products={visibleProducts} columns="3" />

          {/* Load More Button */}
          {displayCount < filtered.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setDisplayCount((prev) => prev + 12)}
                className="bg-[#F58220] hover:bg-[#E06D0F] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-200"
              >
                Load More Products ({filtered.length - displayCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-gray-500">Loading category products...</div>}>
      <CategoryContent slug={slug} />
    </Suspense>
  );
}
