"use client";

import React from "react";
import Link from "next/link";
import {
  UilTruck,
  UilShieldCheck,
  UilSync,
  UilHeadphones,
  UilEnvelope,
  UilHeart,
  UilCreditCard,
  UilCheckCircle,
  UilShield
} from "@iconscout/react-unicons";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-12 pb-8 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-gray-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
            <div className="p-3 bg-orange-500/10 text-[#F58220] rounded-xl shrink-0">
              <UilTruck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Free Delivery</h4>
              <p className="text-xs text-gray-400 mt-0.5">On all orders over Rs. 5,000</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
            <div className="p-3 bg-orange-500/10 text-[#F58220] rounded-xl shrink-0">
              <UilShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Authentic</h4>
              <p className="text-xs text-gray-400 mt-0.5">Verified genuine products</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
            <div className="p-3 bg-orange-500/10 text-[#F58220] rounded-xl shrink-0">
              <UilSync size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Direct Warranty</h4>
              <p className="text-xs text-gray-400 mt-0.5">100% manufacturer warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
            <div className="p-3 bg-orange-500/10 text-[#F58220] rounded-xl shrink-0">
              <UilHeadphones size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Live Support</h4>
              <p className="text-xs text-gray-400 mt-0.5">Ready to assist anytime</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#F58220] rounded-xl p-1 flex items-center justify-center shadow-md">
                <img src="/logo.svg" alt="Trendy Bazaar" className="w-full h-full" suppressHydrationWarning />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">
                  TRENDY <span className="text-[#F58220]">BAZAAR</span>
                </span>
                <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Catch the Trend, Love the Price
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Your trusted online destination for modern smart gadgets, kitchen & home essentials, electrical appliances, and educational toys at unbeatable direct bazaar pricing.
            </p>

            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-[#F58220] text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                <UilShield size={14} /> Access Admin Inventory Panel
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#F58220] pl-2.5">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/category/smart-gadgets" className="hover:text-[#F58220] transition-colors">
                  📱 Smart Gadgets
                </Link>
              </li>
              <li>
                <Link href="/category/home-essentials" className="hover:text-[#F58220] transition-colors">
                  🏠 Home Essentials
                </Link>
              </li>
              <li>
                <Link href="/category/home-appliances" className="hover:text-[#F58220] transition-colors">
                  ⚡ Home Appliances
                </Link>
              </li>
              <li>
                <Link href="/category/toys" className="hover:text-[#F58220] transition-colors">
                  🧸 Toys & Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#F58220] pl-2.5">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/account" className="hover:text-[#F58220] transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#F58220] transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#F58220] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#F58220] transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-[#F58220] pl-2.5">
              Stay Updated
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe for weekly flash deal alerts & exclusive discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-[#F58220] outline-hidden"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#F58220] hover:bg-[#E06D0F] text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-sm"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Trendy Bazaar. All rights reserved. Built with Next.js & IconScout Unicons.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-gray-400">
              <UilCreditCard size={14} /> Visa / Mastercard / COD / JazzCash
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
