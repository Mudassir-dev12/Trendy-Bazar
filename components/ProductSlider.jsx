"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UilHeart, UilAngleLeft, UilAngleRight, UilCheck } from "@iconscout/react-unicons";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/data";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

export default function ProductSlider({ title, subtitle, products = [], viewAllLink = "/category/smart-gadgets", isLoading = false }) {
  const sliderRef = useRef(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedMap, setAddedMap] = useState({});
  const [imgSrcMap, setImgSrcMap] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  // Reset error image map when products update from database
  useEffect(() => {
    setImgSrcMap({});
  }, [products]);

  // One by one item auto scroll effect from right to left
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        // Step width of 1 product card (~180px on mobile, ~260px on sm)
        const stepWidth = clientWidth < 640 ? clientWidth / 2 : 260;

        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: stepWidth, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (isLoading || !products || products.length === 0) {
    return (
      <section className="my-6 sm:my-8 animate-pulse">
        {/* Section Header Skeleton */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <div className="h-6 w-48 bg-gray-200 rounded-md mb-1" />
            {subtitle && <div className="h-3.5 w-64 bg-gray-100 rounded-md" />}
          </div>
        </div>

        {/* Shimmer Cards Track */}
        <div className="flex gap-2.5 sm:gap-4 overflow-hidden py-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="w-[calc(50%-5px)] sm:w-60 md:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3.5 space-y-3"
            >
              <div className="w-full pt-[85%] bg-gray-200 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
              <div className="h-3.5 w-1/2 bg-gray-100 rounded-md" />
              <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                <div className="h-5 w-16 bg-gray-200 rounded-md" />
                <div className="h-7 w-14 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-xs md:text-sm font-bold text-gray-900 underline hover:text-[#F58220] transition-colors shrink-0"
          >
            Shop all
          </Link>
        )}
      </div>

      {/* Slider Container with Hover Nav Buttons & Auto Scroll Pause */}
      <div
        className="relative group/slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-all opacity-90 sm:opacity-0 sm:group-hover/slider:opacity-100"
        >
          <UilAngleLeft size={20} />
        </button>

        {/* Horizontal Scroll Track (2 cards fully visible on mobile) */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-2.5 sm:gap-4 overflow-x-auto custom-scrollbar pb-3 pt-1 snap-x scroll-smooth"
        >
          {products.map((product) => {
            const isFavorited = isInWishlist(product.id);
            const isAdded = addedMap[product.id];
            const price = product.price || 0;
            const originalPrice = product.originalPrice && product.originalPrice > price ? product.originalPrice : null;
            const hasDiscount = Boolean(originalPrice);
            const imgSrc = imgSrcMap[product.id] || product.image || FALLBACK_IMAGE;

            return (
              <div
                key={product.id}
                className="w-[calc(50%-5px)] sm:w-60 md:w-64 shrink-0 snap-start bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between p-2.5 sm:p-3.5 relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => handleToggleWishlist(e, product)}
                  aria-label="Toggle Wishlist"
                  className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 shadow-xs border border-gray-100 flex items-center justify-center hover:bg-white transition-colors"
                >
                  <UilHeart
                    size={16}
                    className={isFavorited ? "text-red-500 fill-red-500" : "text-gray-700"}
                  />
                </button>

                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="block w-full pt-[85%] relative overflow-hidden rounded-xl bg-gray-50 mb-2 sm:mb-3">
                  <img
                    src={imgSrc}
                    alt={product.name}
                    onError={() => setImgSrcMap((prev) => ({ ...prev, [product.id]: FALLBACK_IMAGE }))}
                    className="absolute inset-0 w-full h-full object-contain p-1.5 sm:p-2 hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    suppressHydrationWarning
                  />
                </Link>

                {/* Title & Options */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Price Display */}
                    <div className="mb-1" suppressHydrationWarning>
                      {hasDiscount ? (
                        <div className="flex items-baseline gap-1.5 flex-wrap" suppressHydrationWarning>
                          <span className="text-sm sm:text-lg font-black text-gray-900" suppressHydrationWarning>
                            {formatPrice(price)}
                          </span>
                          <span className="text-[10px] sm:text-xs text-gray-400 line-through" suppressHydrationWarning>
                            {formatPrice(originalPrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm sm:text-lg font-black text-gray-900" suppressHydrationWarning>
                          {formatPrice(price)}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/product/${product.id}`}
                      className="text-[11px] sm:text-sm font-semibold text-gray-800 hover:text-[#F58220] line-clamp-2 leading-tight mb-2 sm:mb-3 block"
                      suppressHydrationWarning
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Walmart-style Pill Action Button */}
                  <div className="pt-1">
                    {product.hasOptions ? (
                      <Link
                        href={`/product/${product.id}`}
                        className="w-full inline-block text-center border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 text-[10px] sm:text-xs font-extrabold py-1.5 px-3 rounded-full transition-colors"
                      >
                        Options
                      </Link>
                    ) : (
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={product.stock === 0}
                        className={`w-full flex items-center justify-center gap-1 border-2 text-[10px] sm:text-xs font-extrabold py-1.5 px-3 rounded-full transition-all ${
                          isAdded
                            ? "border-green-600 bg-green-600 text-white"
                            : product.stock === 0
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <UilCheck size={14} /> Added
                          </>
                        ) : (
                          `+ Add`
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-all opacity-90 sm:opacity-0 sm:group-hover/slider:opacity-100"
        >
          <UilAngleRight size={20} />
        </button>
      </div>
    </section>
  );
}
