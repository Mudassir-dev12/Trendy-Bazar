"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  UilShoppingBag,
  UilHeart,
  UilShield,
  UilBars,
  UilTimes,
  UilPhone
} from "@iconscout/react-unicons";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { slideInLeft, buttonPressProps } from "@/lib/motion";

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

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
              ⚡ Free Delivery over Rs. 15,000! Code: <strong className="underline">TRENDY2026</strong>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[11px] opacity-90 shrink-0">
            <Link href="/admin" className="hover:underline flex items-center gap-1 font-semibold bg-white/10 px-2 py-0.5 rounded-sm">
              <UilShield size={14} /> Admin Panel
            </Link>
            <span className="flex items-center gap-1">
              <UilPhone size={14} /> Support: 1-800-TRENDY
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Mobile Hamburger & Logo Container */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
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
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#F58220] rounded-xl p-1 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shrink-0">
                <img
                  src="/logo.svg"
                  alt="Trendy Bazaar Logo"
                  className="w-full h-full object-contain"
                  suppressHydrationWarning
                />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-black text-sm sm:text-lg md:text-2xl text-gray-900 tracking-tight leading-none group-hover:text-[#F58220] transition-colors truncate">
                  TRENDY <span className="text-[#F58220]">BAZAAR</span>
                </span>
                <span className="hidden sm:block text-[9px] md:text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-0.5 truncate">
                  Catch the Trend, Love the Price
                </span>
              </div>
            </Link>
          </div>

          {/* User Action Buttons (Wishlist, Cart, Admin) */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Admin link */}
            <Link
              href="/admin"
              className="p-1.5 text-gray-600 hover:text-[#F58220] hover:bg-orange-50 rounded-full transition-colors relative flex items-center gap-1 text-xs font-semibold"
              title="Admin Panel"
            >
              <UilShield size={19} className="text-gray-700 hover:text-[#F58220]" />
              <span className="hidden md:inline">Admin</span>
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-1.5 text-gray-600 hover:text-[#F58220] hover:bg-orange-50 rounded-full transition-colors relative"
              aria-label="Wishlist"
            >
              <UilHeart size={19} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
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
                <UilShoppingBag size={19} />
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
      </div>

      {/* Mobile Navigation Drawer Overlay */}
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
              className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-5 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#F58220] rounded-lg p-1 flex items-center justify-center">
                    <img src="/logo.svg" alt="Logo" className="w-full h-full" suppressHydrationWarning />
                  </div>
                  <span className="font-bold text-gray-900 text-base">Trendy Bazaar</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <UilTimes size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 bg-orange-50 text-[#F58220] rounded-xl font-bold text-sm"
                >
                  <UilShield size={16} /> Admin Management Panel
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-xl font-semibold text-sm text-gray-800"
                >
                  <span className="flex items-center gap-2"><UilShoppingBag size={16} className="text-[#F58220]" /> Shopping Cart</span>
                  {mounted && <span className="bg-[#F58220] text-white text-xs px-2 py-0.5 rounded-full">{totalItems}</span>}
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-xl font-semibold text-sm text-gray-800"
                >
                  <span className="flex items-center gap-2"><UilHeart size={16} className="text-red-500" /> Saved Wishlist</span>
                  {mounted && <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                </Link>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shop Categories</p>
                  <div className="space-y-1">
                    <Link href="/category/smart-gadgets" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-semibold text-gray-700 hover:text-[#F58220]">📱 Smart Gadgets</Link>
                    <Link href="/category/home-essentials" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-semibold text-gray-700 hover:text-[#F58220]">🏠 Home Essentials</Link>
                    <Link href="/category/home-appliances" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-semibold text-gray-700 hover:text-[#F58220]">⚡ Home Appliances</Link>
                    <Link href="/category/toys" onClick={() => setIsMobileMenuOpen(false)} className="block p-2 text-sm font-semibold text-gray-700 hover:text-[#F58220]">🧸 Toys</Link>
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
