"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { UilHeart, UilShoppingBag, UilCheck, UilEye } from "@iconscout/react-unicons";
import RatingStars from "./RatingStars";
import CountUpPrice from "./CountUpPrice";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { springBounce, buttonPressProps } from "@/lib/motion";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product?.image || FALLBACK_IMAGE);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (product?.image) {
      setImgSrc(product.image);
    }
  }, [product?.image]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const price = product.price || 0;
  const originalPrice = product.originalPrice && product.originalPrice > price ? product.originalPrice : null;

  // Format category/subcategory for subtitle display
  const rawCat = product.subcategory || product.category || "General";
  const displayCategory = rawCat
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    if (showToast) showToast(`Added ${product.name} to Cart`, "success");
    setTimeout(() => setAdded(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (showToast) {
      showToast(
        isFavorited ? `Removed from Wishlist` : `Saved ${product.name} to Wishlist`,
        isFavorited ? "info" : "success"
      );
    }
  };

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl border border-gray-100 hover:border-orange-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Wishlist Heart Button - White circle floating top right */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        transition={springBounce}
        onClick={handleToggleWishlist}
        aria-label={isFavorited ? "Remove from Wishlist" : "Add to Wishlist"}
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
          isFavorited
            ? "bg-red-50 text-red-500 shadow-sm border border-red-100"
            : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white shadow-xs border border-gray-100"
        }`}
      >
        <motion.div
          animate={isFavorited ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={springBounce}
        >
          <UilHeart
            size={16}
            className={`transition-colors duration-200 ${
              isFavorited ? "text-red-500 fill-red-500" : ""
            }`}
          />
        </motion.div>
      </motion.button>

      {/* Product Image Container */}
      <Link
        href={`/product/${product.id}`}
        className="relative block w-full pt-[85%] bg-gray-50/50 overflow-hidden"
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          suppressHydrationWarning
        />

        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <UilEye size={14} className="text-[#F58220]" /> Quick View
          </span>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Subcategory / Category Header */}
          <div className="text-[11px] sm:text-xs text-gray-400 font-medium mb-1 truncate capitalize">
            {displayCategory}
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.id}`}
            className="font-semibold text-gray-800 text-xs sm:text-sm hover:text-[#F58220] transition-colors line-clamp-2 leading-snug mb-1.5 block min-h-[2.4rem]"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="mb-2.5">
            <RatingStars rating={product.rating || 4.8} count={product.reviewCount || 45} size="xs" />
          </div>
        </div>

        {/* Price & Action Button Row */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1.5 relative mt-auto">
          <div className="min-w-0">
            <CountUpPrice targetPrice={price} originalPrice={originalPrice} />
          </div>

          <motion.button
            {...buttonPressProps}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
              added
                ? "bg-green-600 text-white shadow-xs"
                : product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed text-xs"
                : "bg-[#F58220] hover:bg-[#E06D0F] text-white shadow-xs hover:shadow-md"
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="flex items-center gap-1"
                >
                  <UilCheck size={15} /> Added
                </motion.span>
              ) : product.stock === 0 ? (
                "Out of Stock"
              ) : (
                <motion.span key="add" className="flex items-center gap-1">
                  <UilShoppingBag size={15} /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
