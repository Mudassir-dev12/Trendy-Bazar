"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  UilShoppingBag,
  UilHeart,
  UilSearch,
  UilTimes,
  UilBars,
  UilPhone,
  UilAngleDown,
  UilAngleUp,
  UilArrowRight,
  UilFire,
  UilTagAlt
} from "@iconscout/react-unicons";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useProducts } from "@/context/ProductContext";
import { formatPrice } from "@/lib/data";
import { slideInLeft, buttonPressProps } from "@/lib/motion";
import { categories } from "@/data/categories";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

const TRENDING_KEYWORDS = [
  "Wireless Earbuds",
  "Fast Charger",
  "Cookware Set",
  "Tissue Box Holder",
  "Massage Device",
  "Smart Clock"
];

export default function Header() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { products } = useProducts();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState("smart-gadgets");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchContainerRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-focus mobile search input when opened
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
    }
  }, [isMobileSearchOpen]);

  // Click outside listener to dismiss search dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideDesktop = searchContainerRef.current && searchContainerRef.current.contains(e.target);
      const isInsideMobile = mobileSearchRef.current && mobileSearchRef.current.contains(e.target);
      if (!isInsideDesktop && !isInsideMobile) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Dynamic live search results from active product catalog
  const liveResults = cleanQuery
    ? products
        .filter((p) => {
          const name = (p.name || p.title || "").toLowerCase();
          const cat = (p.category || "").toLowerCase();
          const sub = (p.subcategory || "").toLowerCase();
          const desc = (p.description || "").toLowerCase();
          const tags = Array.isArray(p.tags) ? p.tags.join(" ").toLowerCase() : "";
          return (
            name.includes(cleanQuery) ||
            cat.includes(cleanQuery) ||
            sub.includes(cleanQuery) ||
            desc.includes(cleanQuery) ||
            tags.includes(cleanQuery)
          );
        })
        .slice(0, 5)
    : [];

  // Matching categories / subcategories
  const matchedCategories = cleanQuery
    ? categories
        .filter(
          (c) =>
            c.name.toLowerCase().includes(cleanQuery) ||
            c.subcategories?.some((s) => s.name.toLowerCase().includes(cleanQuery))
        )
        .slice(0, 2)
    : [];

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectProduct = (productId) => {
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    setSearchQuery("");
    router.push(`/product/${productId}`);
  };

  const handleSelectKeyword = (kw) => {
    setSearchQuery(kw);
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(kw)}`);
  };

  const toggleCategoryExpand = (catSlug) => {
    setExpandedCat((prev) => (prev === catSlug ? null : catSlug));
  };

  const renderDropdownContent = () => (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-3.5 z-50 max-h-[75vh] overflow-y-auto custom-scrollbar"
    >
      {/* 1. Empty State: Trending Search Suggestions */}
      {!cleanQuery && (
        <div className="space-y-3 p-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <UilFire size={15} className="text-[#F58220]" />
            <span>Trending Popular Searches</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TRENDING_KEYWORDS.map((kw, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectKeyword(kw)}
                className="bg-gray-100 hover:bg-orange-50 hover:text-[#F58220] text-gray-700 font-semibold text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
              >
                <UilSearch size={12} className="text-gray-400" />
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Matched Categories Quick Jump */}
      {cleanQuery && matchedCategories.length > 0 && (
        <div className="mb-3 pb-2.5 border-b border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
            Matching Categories
          </span>
          <div className="flex flex-wrap gap-1.5">
            {matchedCategories.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                onClick={() => {
                  setIsSearchFocused(false);
                  setIsMobileSearchOpen(false);
                }}
                className="bg-orange-50 hover:bg-orange-100 text-[#F58220] font-bold text-xs px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                <UilTagAlt size={12} />
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. Live Matching Products */}
      {cleanQuery && liveResults.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center justify-between px-1 mb-1 text-[11px] font-bold text-gray-400 uppercase">
            <span>Products ({liveResults.length})</span>
            <span className="text-[#F58220] font-normal lowercase">click to view</span>
          </div>

          {liveResults.map((p) => {
            const price = p.price || 0;
            const origPrice = p.originalPrice && p.originalPrice > price ? p.originalPrice : null;
            const discountPct = origPrice ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

            return (
              <div
                key={p.id}
                onClick={() => handleSelectProduct(p.id)}
                className="p-2 rounded-xl hover:bg-orange-50/70 transition-all flex items-center gap-3 cursor-pointer group"
              >
                <img
                  src={p.image || FALLBACK_IMAGE}
                  alt={p.name}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  className="w-12 h-12 object-cover rounded-lg border border-gray-100 bg-gray-50 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-gray-900 truncate group-hover:text-[#F58220] transition-colors">
                    {p.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-gray-400 capitalize truncate">
                      {p.subcategory?.replace(/-/g, " ") || p.category?.replace(/-/g, " ")}
                    </span>
                    {discountPct > 0 && (
                      <span className="bg-green-100 text-green-800 text-[9px] font-black px-1.5 rounded-xs">
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-extrabold text-xs text-gray-900 block">
                    {formatPrice(price)}
                  </span>
                  {origPrice && (
                    <span className="text-[10px] text-gray-400 line-through block">
                      {formatPrice(origPrice)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* View All Search Results Button */}
          <button
            type="button"
            onClick={handleSearchSubmit}
            className="w-full mt-2 pt-2.5 border-t border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 text-[#F58220] p-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <span>View all search results for &ldquo;{searchQuery}&rdquo;</span>
            <UilArrowRight size={14} />
          </button>
        </div>
      )}

      {/* 4. No Results Found State */}
      {cleanQuery && liveResults.length === 0 && (
        <div className="py-6 text-center space-y-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <UilSearch size={20} />
          </div>
          <p className="text-xs font-bold text-gray-700">
            No products found for &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
            Try checking for spelling mistakes, using broader terms, or click a popular keyword below.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {TRENDING_KEYWORDS.slice(0, 4).map((kw, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectKeyword(kw)}
                className="bg-gray-50 hover:bg-orange-50 hover:text-[#F58220] text-gray-600 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-gray-200 transition-colors cursor-pointer"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-[#F58220] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase font-bold tracking-wider shrink-0">
              Flash Offer
            </span>
            <span className="truncate">
              ⚡ Free Delivery over Rs. 5,000! Code: <strong className="underline">TRENDY2026</strong>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[11px] opacity-90 shrink-0">
            <a href="tel:+923402856453" className="flex items-center gap-1 hover:underline font-semibold">
              <UilPhone size={14} /> Support / WhatsApp: 0340-2856453
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Hamburger & Logo Container */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <motion.button
              {...buttonPressProps}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-gray-700 hover:text-[#F58220] rounded-lg focus:outline-hidden shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <UilTimes size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="hamburger"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <UilBars size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#F58220] rounded-xl p-1 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                <img
                  src="/logo.png"
                  alt="Trendy Bazaar Logo"
                  className="w-full h-full object-contain"
                  suppressHydrationWarning
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm sm:text-lg md:text-2xl text-gray-900 tracking-tight leading-none group-hover:text-[#F58220] transition-colors">
                  TRENDY <span className="text-[#F58220]">BAZAAR</span>
                </span>
                <span className="hidden sm:block text-[9px] md:text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">
                  Catch the Trend, Love the Price
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP / TABLET DYNAMIC SEARCH BAR WITH INSTANT LIVE RESULTS */}
          <div ref={searchContainerRef} className="hidden md:block flex-1 max-w-xl mx-3 sm:mx-6 relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <UilSearch size={18} className="text-gray-400 absolute left-3.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, categories, deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-gray-50 hover:bg-gray-100/80 focus:bg-white border-2 border-gray-200 focus:border-[#F58220] rounded-full pl-10 pr-28 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-2xs focus:shadow-md outline-hidden text-gray-900"
                />

                {/* Clear Input Button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-22 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    title="Clear search"
                  >
                    <UilTimes size={16} />
                  </button>
                )}

                {/* Dynamic Search Action Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="absolute right-1 bg-[#F58220] hover:bg-[#E06D0F] text-white px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <UilSearch size={14} />
                  <span>Search</span>
                </motion.button>
              </div>
            </form>

            {/* Live Autocomplete Suggestions Dropdown */}
            <AnimatePresence>
              {isSearchFocused && renderDropdownContent()}
            </AnimatePresence>
          </div>

          {/* User Action Buttons (Mobile Search Toggle, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Mobile Search Toggle Button */}
            <motion.button
              {...buttonPressProps}
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                isMobileSearchOpen ? "bg-orange-100 text-[#F58220]" : "text-gray-600 hover:text-[#F58220] hover:bg-orange-50"
              }`}
              aria-label="Search Products"
            >
              <UilSearch size={20} />
            </motion.button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-gray-600 hover:text-[#F58220] hover:bg-orange-50 rounded-full transition-colors relative"
              aria-label="Wishlist"
            >
              <UilHeart size={20} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger with Spring Bounce */}
            <motion.button
              {...buttonPressProps}
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 sm:px-3 sm:py-2 bg-orange-50 hover:bg-orange-100 text-[#F58220] rounded-full transition-colors relative flex items-center gap-1.5"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <UilShoppingBag size={20} />
                {mounted && totalItems > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={totalItems}
                      initial={prefersReducedMotion ? {} : { scale: 0.5, opacity: 0 }}
                      animate={prefersReducedMotion ? {} : { scale: 1.25, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-2 -right-2 bg-[#F58220] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white"
                    >
                      {totalItems}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              <span className="text-xs font-bold pr-0.5 text-gray-800 hidden sm:inline">
                Cart
              </span>
            </motion.button>
          </div>
        </div>

        {/* MOBILE DYNAMIC EXPANDABLE SEARCH BAR */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              ref={mobileSearchRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-visible pt-2 relative"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                  <UilSearch size={16} className="text-gray-400 absolute left-3 pointer-events-none" />
                  <input
                    ref={mobileSearchInputRef}
                    type="text"
                    placeholder="Search products, brands, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full bg-gray-50 border-2 border-[#F58220] rounded-full pl-9 pr-24 py-2 text-xs font-semibold shadow-md outline-hidden text-gray-900"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        mobileSearchInputRef.current?.focus();
                      }}
                      className="absolute right-20 text-gray-400 p-1"
                    >
                      <UilTimes size={15} />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="absolute right-1 bg-[#F58220] text-white px-3.5 py-1.5 rounded-full font-bold text-xs shadow-xs"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Mobile Search Dropdown */}
              <AnimatePresence>
                {isSearchFocused && renderDropdownContent()}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Drawer Overlay with Category & Subcategory Accordion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-5/6 max-w-xs bg-white h-full shadow-2xl p-4 sm:p-5 overflow-y-auto flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Header title */}
                <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#F58220] rounded-lg p-1 flex items-center justify-center">
                      <img src="/logo.png" alt="Logo" className="w-full h-full" suppressHydrationWarning />
                    </div>
                    <span className="font-bold text-gray-900 text-base">Trendy Bazaar</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                    <UilTimes size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Top quick links */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 bg-orange-50 text-[#F58220] rounded-xl font-bold text-xs"
                    >
                      <span className="flex items-center gap-1.5"><UilShoppingBag size={15} /> Cart</span>
                      {mounted && <span className="bg-[#F58220] text-white text-[10px] px-1.5 py-0.2 rounded-full">{totalItems}</span>}
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 bg-gray-50 text-gray-800 rounded-xl font-bold text-xs"
                    >
                      <span className="flex items-center gap-1.5"><UilHeart size={15} className="text-red-500" /> Wishlist</span>
                      {mounted && <span className="bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.2 rounded-full">{wishlistCount}</span>}
                    </Link>
                  </div>

                  {/* Categories & Subcategories Accordion */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                      Categories & Subcategories
                    </p>
                    <div className="space-y-2">
                      {categories.map((cat) => {
                        const isExpanded = expandedCat === cat.slug;
                        return (
                          <div key={cat.id} className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50">
                            {/* Category Header */}
                            <div className="flex items-center justify-between p-2.5 bg-white">
                              <Link
                                href={`/category/${cat.slug}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-extrabold text-xs text-gray-900 hover:text-[#F58220] transition-colors flex-1"
                              >
                                {cat.name}
                              </Link>
                              <button
                                onClick={() => toggleCategoryExpand(cat.slug)}
                                className="p-1 text-gray-400 hover:text-gray-700"
                                aria-label="Toggle subcategories"
                              >
                                {isExpanded ? <UilAngleUp size={18} /> : <UilAngleDown size={18} />}
                              </button>
                            </div>

                            {/* Subcategories Collapsible List */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden bg-gray-50 border-t border-gray-100 px-3 py-1.5"
                                >
                                  <div className="space-y-1 py-1">
                                    {cat.subcategories.map((sub) => (
                                      <Link
                                        key={sub.id}
                                        href={`/category/${cat.slug}?sub=${sub.slug}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-[#F58220] hover:bg-orange-50 transition-colors"
                                      >
                                        • {sub.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
