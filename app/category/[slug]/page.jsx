"use client";

import React, { useState, use, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import { useProducts } from "@/context/ProductContext";
import { getCategoryBySlug, filterProducts } from "@/lib/data";

function CategoryContent({ slug }) {
  const searchParams = useSearchParams();
  const subQuery = searchParams.get("sub") || "";

  const { products, isLoading } = useProducts();
  const category = getCategoryBySlug(slug);

  const [selectedSubcategory, setSelectedSubcategory] = useState(subQuery);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  React.useEffect(() => {
    if (subQuery) {
      setSelectedSubcategory(subQuery);
      setPage(1);
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

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const visibleProducts = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleResetFilters = () => {
    setSelectedSubcategory("");
    setMinPrice(0);
    setMaxPrice(200000);
    setMinRating(0);
    setSortBy("popular");
    setPage(1);
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
          <ProductGrid products={visibleProducts} columns="3" isLoading={isLoading && visibleProducts.length === 0} />

          {/* Pagination Controls */}
          {filtered.length > itemsPerPage && (
            <div className="mt-8 bg-white rounded-2xl p-4 border border-gray-100 shadow-xs">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={filtered.length}
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

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold text-gray-500">Loading category products...</div>}>
      <CategoryContent slug={slug} />
    </Suspense>
  );
}
