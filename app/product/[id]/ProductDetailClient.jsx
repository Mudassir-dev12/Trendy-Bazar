"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import RatingStars from "@/components/RatingStars";
import ProductGrid from "@/components/ProductGrid";
import CountUpPrice from "@/components/CountUpPrice";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useProducts } from "@/context/ProductContext";
import { getProductById, getRelatedProducts, formatPrice } from "@/lib/data";
import { buttonPressProps, springBounce } from "@/lib/motion";
import { trackViewContent } from "@/lib/pixel";
import {
  UilHeart,
  UilShoppingBag,
  UilCheck,
  UilTruck,
  UilShieldCheck,
  UilSync,
  UilBolt,
  UilPlus,
  UilMinus
} from "@iconscout/react-unicons";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

export default function ProductDetailClient({ id }) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = getProductById(id, products);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product?.image || FALLBACK_IMAGE);

  useEffect(() => {
    if (product?.image) {
      setImgSrc(product.image);
    }
  }, [product?.image]);

  useEffect(() => {
    if (product) {
      trackViewContent(product);
    }
  }, [product?.id]);

  if (!product) {
    if (isLoading) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProductDetailSkeleton />
        </div>
      );
    }

    return (
      <div className="text-center py-20 bg-white rounded-2xl p-8 border border-gray-100 shadow-xs my-8">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-500 mt-2">The product you are looking for is unavailable or has been removed.</p>
        <Link
          href="/"
          className="inline-block mt-6 bg-[#F58220] text-white px-6 py-2.5 rounded-xl font-bold text-sm"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const price = product.price || 0;
  const originalPrice = product.originalPrice && product.originalPrice > price ? product.originalPrice : (product.price && product.original_price && product.original_price > product.price ? product.original_price : 0);
  const hasDiscount = originalPrice > price;
  const discountAmount = hasDiscount ? originalPrice - price : 0;
  const discountPercent = hasDiscount ? Math.round((discountAmount / originalPrice) * 100) : 0;

  const related = getRelatedProducts(product.id, product.subcategory, product.category, 4, products);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    if (showToast) showToast(`Added ${quantity} x ${product.name} to Cart`, "success");
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (showToast) {
      showToast(
        isFavorited ? `Removed from Wishlist` : `Saved ${product.name} to Wishlist`,
        isFavorited ? "info" : "success"
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: product.category?.replace(/-/g, " "), href: `/category/${product.category}` },
          { label: product.name }
        ]}
      />

      {/* Main Product Hero Grid */}
      <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-100 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Display with Crossfade */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 w-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={imgSrc}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={imgSrc}
                alt={product.name}
                onError={() => setImgSrc(FALLBACK_IMAGE)}
                className="w-full h-full object-cover object-center"
                suppressHydrationWarning
              />
            </AnimatePresence>

            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-[#F58220] text-white text-xs font-black px-3 py-1 rounded-lg shadow-md uppercase">
                Save {formatPrice(discountAmount)} ({discountPercent}% OFF)
              </span>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isFavorited
                  ? "bg-red-50 text-red-500 shadow-md"
                  : "bg-white/80 text-gray-400 hover:text-red-500"
              }`}
            >
              <UilHeart size={20} className={isFavorited ? "fill-red-500 text-red-500" : ""} />
            </motion.button>
          </div>

          {/* Multi-Image Thumbnail Gallery */}
          {Array.isArray(product.images) && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2.5 pt-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImgSrc(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    imgSrc === img
                      ? "border-[#F58220] ring-2 ring-orange-200 shadow-md scale-105"
                      : "border-gray-200 hover:border-gray-300 opacity-75 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img || FALLBACK_IMAGE}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Purchasing */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F58220] bg-orange-50 px-2.5 py-1 rounded-md">
              {product.subcategory?.replace(/-/g, " ")}
            </span>

            <h1 className="text-xl md:text-3xl font-black text-gray-900 mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Stock row */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <RatingStars rating={product.rating || 4.8} count={product.reviewCount || 120} size="sm" />
              <span className="text-gray-300">|</span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                product.stock > 10
                  ? "bg-green-100 text-green-800"
                  : product.stock > 0
                  ? "bg-amber-100 text-amber-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Low Stock (${product.stock} left)` : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 flex items-baseline gap-3">
            <CountUpPrice targetPrice={price} originalPrice={hasDiscount ? originalPrice : null} />
          </div>

          {/* Short Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-700 uppercase">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <UilMinus size={16} />
                </button>
                <motion.span
                  key={quantity}
                  initial={prefersReducedMotion ? {} : { scale: 0.8 }}
                  animate={prefersReducedMotion ? {} : { scale: 1 }}
                  transition={springBounce}
                  className="px-4 font-bold text-sm text-gray-900"
                >
                  {quantity}
                </motion.span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <UilPlus size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                {...buttonPressProps}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`py-3.5 px-6 rounded-xl font-extrabold text-sm transition-colors shadow-md flex items-center justify-center gap-2 ${
                  added
                    ? "bg-green-600 text-white"
                    : "bg-[#F58220] hover:bg-[#E06D0F] text-white shadow-md hover:shadow-lg"
                }`}
              >
                {added ? (
                  <>
                    <UilCheck size={20} /> Added to Cart
                  </>
                ) : (
                  <>
                    <UilShoppingBag size={20} /> Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                {...buttonPressProps}
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="py-3.5 px-6 bg-gray-900 hover:bg-black text-white rounded-xl font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <UilBolt size={20} className="text-amber-400" /> Buy Now
              </motion.button>
            </div>
          </div>

          {/* Assurance Trust Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-center">
            <div className="p-3 bg-gray-50 rounded-xl">
              <UilTruck size={20} className="text-[#F58220] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-gray-700 block">Fast Delivery</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <UilShieldCheck size={20} className="text-[#F58220] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-gray-700 block">2-Yr Warranty</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <UilSync size={20} className="text-[#F58220] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-gray-700 block">30-Day Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Specs / Reviews with Sliding Underline Indicator */}
      <div className="bg-white rounded-2xl md:rounded-3xl p-6 border border-gray-100 shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 gap-8 overflow-x-auto no-scrollbar relative">
          {[
            { id: "details", label: "Product Overview" },
            { id: "specs", label: "Technical Specifications" },
            { id: "reviews", label: `Customer Reviews (${product.reviewCount || 0})` }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-bold relative transition-colors whitespace-nowrap ${
                  isActive ? "text-[#F58220]" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F58220] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Crossfade */}
        <div className="py-6 min-h-[140px]">
          <AnimatePresence mode="wait">
            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 text-sm text-gray-600 leading-relaxed"
              >
                <p>{product.description}</p>
                <p>
                  Crafted with top-tier materials and rigorous quality testing, this product brings supreme efficiency and durability to your daily routine. Designed with direct customer feedback to ensure maximum utility and long-lasting satisfaction.
                </p>
              </motion.div>
            )}

            {activeTab === "specs" && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-gray-100 text-sm"
              >
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map((spec, i) => (
                    <div key={i} className="py-3 flex justify-between">
                      <span className="font-semibold text-gray-500">{spec.label}</span>
                      <span className="font-bold text-gray-900">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2 py-2">
                    <div className="py-2 flex justify-between">
                      <span className="font-semibold text-gray-500">Category</span>
                      <span className="font-bold text-gray-900 capitalize">{product.category}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="font-semibold text-gray-500">Subcategory</span>
                      <span className="font-bold text-gray-900 capitalize">{product.subcategory?.replace(/-/g, " ")}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="font-semibold text-gray-500">Stock SKU</span>
                      <span className="font-bold text-gray-900">{product.id.toUpperCase()}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-6 p-4 bg-orange-50/60 rounded-2xl border border-orange-100">
                  <div className="text-center">
                    <span className="text-4xl font-black text-gray-900">
                      {(product.rating || 4.8).toFixed(1)}
                    </span>
                    <p className="text-xs text-gray-500">Out of 5 Stars</p>
                  </div>
                  <div>
                    <RatingStars rating={product.rating || 4.8} size="md" />
                    <p className="text-xs text-gray-600 mt-1">
                      Based on {product.reviewCount || 120} verified customer reviews
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-gray-800">Alex M. — Verified Buyer</span>
                      <span className="text-[10px] text-gray-400">2 days ago</span>
                    </div>
                    <RatingStars rating={5} size="xs" />
                    <p className="text-xs text-gray-600 mt-2">
                      Exceeded my expectations! High quality build, fast delivery, and works perfectly. Highly recommend Trendy Bazaar.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">YOU MAY ALSO LIKE</h2>
          <ProductGrid products={related} columns="4" />
        </section>
      )}
    </div>
  );
}
