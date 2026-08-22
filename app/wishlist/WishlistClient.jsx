"use client";

import React from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGrid from "@/components/ProductGrid";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ArrowLeft } from "lucide-react";

export default function WishlistClient() {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "My Wishlist" }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <Heart className="w-7 h-7 text-red-500 fill-red-500" />
          MY SAVED WISHLIST ({wishlistCount})
        </h1>
      </div>

      {wishlistCount === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-md mx-auto my-10">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Your Wishlist is empty</h2>
          <p className="text-xs text-gray-500 mt-2 mb-6">
            Click the heart icon on any product card to save your favorite items here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#F58220] text-white px-6 py-2.5 rounded-xl font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Explore Catalog
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlist} columns="4" />
      )}
    </div>
  );
}
