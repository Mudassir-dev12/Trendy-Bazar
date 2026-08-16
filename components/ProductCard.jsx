"use client";

import React, { useState } from "react";
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

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const price = product.price || 0;
  const discountPrice = product.discountPrice || price;

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
      className="group relative bg-white rounded-xl border border-gray-100 hover:border-orange-200 shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Wishlist Heart Button with Scale-Pop Animation */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        transition={springBounce}
        onClick={handleToggleWishlist}
        aria-label={isFavorited ? "Remove from Wishlist" : "Add to Wishlist"}
        className={`absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors duration-200 ${
          isFavorited
            ? "bg-red-50 text-red-500 shadow-md"
            : "bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white shadow-xs"
        }`}
      >
        <motion.div
          animate={isFavorited ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={springBounce}
        >
          <UilHeart
            size={15}
            className={`transition-colors duration-200 ${
              isFavorited ? "text-red-500 fill-red-500" : ""
            }`}
          />
        </motion.div>
      </motion.button>

      {/* Product Image Container with Subtle Zoom */}
      <Link
        href={`/product/${product.id}`}
        className="relative block w-full pt-[85%] bg-gray-50 overflow-hidden"
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
          <span className="bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <UilEye size={13} className="text-[#F58220]" /> Quick View
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Subcategory / Stock Tag */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 mb-0.5">
            <span className="capitalize truncate font-medium">
              {product.subcategory?.replace(/-/g, " ") || product.category?.replace(/-/g, " ")}
            </span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-amber-600 font-semibold text-[9px] sm:text-[10px] shrink-0 ml-1">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Title */}
          <Link
            href={`/product/${product.id}`}
            className="font-semibold text-gray-800 text-xs sm:text-sm hover:text-[#F58220] transition-colors line-clamp-2 leading-tight mb-1 sm:mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="mb-2">
            <RatingStars rating={product.rating || 4.8} count={product.reviewCount || 45} size="xs" />
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-1.5 sm:pt-2 border-t border-gray-100 flex items-center justify-between gap-1.5 relative">
          <div className="min-w-0">
            <CountUpPrice targetPrice={discountPrice} originalPrice={price > discountPrice ? price : null} />
          </div>

          <motion.button
            {...buttonPressProps}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-bold text-[11px] sm:text-xs transition-colors duration-200 flex items-center gap-1 shrink-0 ${
              added
                ? "bg-green-600 text-white shadow-xs"
                : product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed text-[10px]"
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
                  className="flex items-center gap-0.5"
                >
                  <UilCheck size={13} /> Added
                </motion.span>
              ) : product.stock === 0 ? (
                "Out of Stock"
              ) : (
                <motion.span key="add" className="flex items-center gap-0.5">
                  <UilShoppingBag size={13} /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
