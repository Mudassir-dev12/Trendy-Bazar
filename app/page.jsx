"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProducts } from "@/context/ProductContext";
import BannerCarousel from "@/components/BannerCarousel";
import QuickCategoryBar from "@/components/QuickCategoryBar";
import ProductSlider from "@/components/ProductSlider";
import PromoGrid from "@/components/PromoGrid";
import FeaturedSplitSection from "@/components/FeaturedSplitSection";
import FlashDeals from "@/components/FlashDeals";
import ProductGrid from "@/components/ProductGrid";
import { ScrollReveal } from "@/components/AnimatedComponents";
import { getFeaturedProducts } from "@/lib/data";
import { buttonPressProps } from "@/lib/motion";
import { ArrowRight, Award, Star } from "lucide-react";

export default function HomePage() {
  const { products, isLoaded } = useProducts();

  const featured = getFeaturedProducts(16, products);

  // Products tailored for home page sliders
  const greatBrandsProducts = products.slice(0, 8).map((p, idx) => ({
    ...p,
    hasOptions: idx % 3 === 0
  }));

  const techAndHomeProducts = products.slice(4, 12).map((p, idx) => ({
    ...p,
    hasOptions: idx % 2 === 0
  }));

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#F58220] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium text-sm">Loading Trendy Bazaar...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 overflow-x-hidden">
      {/* 1. Hero Banner Carousel */}
      <ScrollReveal direction="down" delay={0}>
        <BannerCarousel />
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 space-y-8 sm:space-y-12">
        {/* 2. Get it all right here */}
        <ScrollReveal direction="up" delay={50}>
          <QuickCategoryBar />
        </ScrollReveal>

        {/* 3. Discover Great Brands Slider */}
        <ScrollReveal direction="up" delay={100}>
          <ProductSlider
            title="Discover Great Brands"
            subtitle="Top rated tech, smart wearables, fast chargers & gadgets"
            products={greatBrandsProducts}
            viewAllLink="/category/smart-gadgets"
          />
        </ScrollReveal>

        {/* 4. Promo Feature Grid */}
        <ScrollReveal direction="up" delay={120}>
          <PromoGrid />
        </ScrollReveal>

        {/* 5. Kitchen & Home Essentials Split Section */}
        <ScrollReveal direction="up" delay={140}>
          <FeaturedSplitSection products={products.filter((p) => p.category === "home-essentials")} />
        </ScrollReveal>

        {/* 6. Save on Tech, Appliances & Home Slider */}
        <ScrollReveal direction="up" delay={160}>
          <ProductSlider
            title="Save on Tech, Appliances & Home"
            subtitle="Massive direct bazaar prices on vacuum cleaners, air coolers & home gadgets"
            products={techAndHomeProducts}
            viewAllLink="/category/home-appliances"
          />
        </ScrollReveal>

        {/* 7. Flash Deals Section */}
        <ScrollReveal direction="up" delay={180}>
          <FlashDeals />
        </ScrollReveal>

        {/* 8. Guarantee Banner Box */}
        <ScrollReveal direction="zoom" delay={100}>
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden my-4 border border-gray-800">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none bg-[radial-gradient(#F58220_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="bg-[#F58220]/20 text-[#F58220] text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-[#F58220]/30">
                  <Award className="w-4 h-4" /> Direct Bazaar Guarantee
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight">
                  Quality Guaranteed & Direct Manufacturer Warranty
                </h2>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  Shop over 100+ high quality items across 16 subcategories with express dispatch and direct manufacturer support.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <motion.div {...buttonPressProps}>
                  <Link
                    href="/category/smart-gadgets"
                    className="bg-[#F58220] hover:bg-[#E06D0F] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    Explore All Items <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 9. Top Picks Grid (Shows Exactly 16 Products) */}
        <ScrollReveal direction="up" delay={150}>
          <section id="top-picks" className="pt-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <Star className="w-6 h-6 text-[#F58220] fill-[#F58220]" />
                  TOP PICKS FOR YOU
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Showing 16 customer favorites with verified 4.5+ star reviews
                </p>
              </div>
            </div>

            <ProductGrid products={featured.slice(0, 16)} columns="4" />
          </section>
        </ScrollReveal>

        {/* 10. Bottom Catalog CTA */}
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center pt-6 pb-4">
            <motion.div {...buttonPressProps} className="inline-block">
              <Link
                href="/category/smart-gadgets"
                className="bg-gray-900 hover:bg-black text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
              >
                Browse Complete Catalog <ArrowRight className="w-4 h-4 text-[#F58220]" />
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
