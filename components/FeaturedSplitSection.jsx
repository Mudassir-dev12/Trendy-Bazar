"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UilAngleRight, UilHeart } from "@iconscout/react-unicons";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/data";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80";

export default function FeaturedSplitSection({ products = [] }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedMap, setAddedMap] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  // One by one item auto scroll effect from right to left
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const stepWidth = clientWidth < 640 ? clientWidth / 2 : 240;

        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({ left: stepWidth, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 240, behavior: "smooth" });
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

  const tableProducts = products.slice(0, 6);

  return (
    <section className="my-6 sm:my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            Kitchen & Home Essentials
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 font-medium mt-0.5">
            Cookware, ceramic dinnerware, glass containers & organizers.
          </p>
        </div>
        <Link
          href="/category/home-essentials"
          className="text-xs md:text-sm font-bold text-gray-900 underline hover:text-[#F58220]"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* Left Side: Product Slider (7 cols on lg, 2 cards visible on mobile) */}
        <div
          className="lg:col-span-7 relative group/table"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            ref={sliderRef}
            className="flex items-stretch gap-2.5 sm:gap-4 overflow-x-auto custom-scrollbar pb-3 snap-x scroll-smooth"
          >
            {tableProducts.map((product) => {
              const isFavorited = isInWishlist(product.id);
              const isAdded = addedMap[product.id];
              const price = product.price || 0;
              const discountPrice = product.discountPrice || price;
              const hasDiscount = discountPrice < price;

              return (
                <div
                  key={product.id}
                  className="w-[calc(50%-5px)] sm:w-56 shrink-0 snap-start bg-white rounded-2xl border border-gray-200 p-2.5 sm:p-3.5 flex flex-col justify-between relative hover:shadow-md transition-all"
                >
                  {/* Wishlist button */}
                  <button
                    onClick={(e) => handleToggleWishlist(e, product)}
                    aria-label="Toggle Wishlist"
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 shadow-xs border border-gray-100 flex items-center justify-center"
                  >
                    <UilHeart
                      size={15}
                      className={isFavorited ? "text-red-500 fill-red-500" : "text-gray-700"}
                    />
                  </button>

                  {/* Image */}
                  <Link href={`/product/${product.id}`} className="block w-full pt-[85%] relative overflow-hidden rounded-xl bg-gray-50 mb-2 sm:mb-3">
                    <img
                      src={product.image || FALLBACK_IMAGE}
                      alt={product.name}
                      onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      className="absolute inset-0 w-full h-full object-contain p-1.5 sm:p-2 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      suppressHydrationWarning
                    />
                  </Link>

                  {/* Pricing & Add Button */}
                  <div>
                    <div className="mb-1">
                      <span className="text-sm sm:text-base font-black text-gray-900">
                        {formatPrice(discountPrice)}
                      </span>
                      {hasDiscount && (
                        <p className="text-[10px] sm:text-[11px] text-gray-500 font-bold">
                          <span className="line-through">{formatPrice(price)}</span>
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/product/${product.id}`}
                      className="text-[11px] sm:text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-2 sm:mb-3 block hover:text-[#F58220]"
                    >
                      {product.name}
                    </Link>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={product.stock === 0}
                      className={`w-full text-center border-2 text-[10px] sm:text-xs font-extrabold py-1.5 px-2.5 rounded-full transition-all ${
                        isAdded
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900"
                      }`}
                    >
                      {isAdded ? "Added" : "Options"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Carousel Scroll Arrow */}
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-all opacity-90 sm:opacity-0 sm:group-hover/table:opacity-100"
          >
            <UilAngleRight size={20} />
          </button>
        </div>

        {/* Right Side: Featured Highlight Banner Box (5 cols on lg) */}
        <div className="lg:col-span-5 bg-[#7c4d25] text-white rounded-3xl p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[240px] sm:min-h-[300px] shadow-xs">
          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-xs">
            <h3 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
              Durable dinnerware & glassware
            </h3>

            <Link
              href="/category/home-essentials"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-black text-xs px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all shadow-md transform hover:-translate-y-0.5"
            >
              Shop now
            </Link>

            <div className="pt-2 sm:pt-4">
              <span className="text-[11px] sm:text-xs font-medium text-amber-200 block">From</span>
              <span className="text-xl sm:text-2xl font-black text-white">Rs. 499</span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-1/2 sm:w-3/5 h-full opacity-90 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80"
              alt="Dinnerware & Glassware"
              className="w-full h-full object-cover object-center rounded-r-3xl"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
    </section>
  );
}
