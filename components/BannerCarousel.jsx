"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { UilAngleLeft, UilAngleRight, UilPause, UilPlay, UilArrowRight } from "@iconscout/react-unicons";
import { SplitText, TypewriterText } from "@/components/AnimatedComponents";
import { buttonPressProps } from "@/lib/motion";

const BANNERS = [
  {
    id: 1,
    tagline: "Smart Gadgets Collection",
    title: "Tech that keeps up with you.",
    subtitle: "Noise-cancelling earbuds, smart watches, and ultra-fast 100W GaN chargers at direct bazaar prices.",
    ctaText: "Shop Smart Gadgets",
    ctaLink: "/category/smart-gadgets",
    bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    tagline: "Home Essentials Collection",
    title: "Home essentials, sorted.",
    subtitle: "Ceramic cookware, non-stick dining sets, glass food storage containers & home organization.",
    ctaText: "Shop Home Essentials",
    ctaLink: "/category/home-essentials",
    bgImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    tagline: "Home Appliances Collection",
    title: "Appliances that just work.",
    subtitle: "Kitchen Appliances, Cleaning Appliances, Cooling & Heating, and Personal Care Appliances for modern living.",
    ctaText: "Shop Home Appliances",
    ctaLink: "/category/home-appliances",
    bgImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&auto=format&fit=crop&q=80",
    applianceSubcategories: [
      { name: "Kitchen Appliances", slug: "kitchen-appliances" },
      { name: "Cleaning Appliances", slug: "cleaning-appliances" },
      { name: "Cooling & Heating", slug: "cooling-heating" },
      { name: "Personal Care Appliances", slug: "personal-care-appliances" }
    ]
  },
  {
    id: 4,
    tagline: "Toys & Games Collection",
    title: "Playtime made better.",
    subtitle: "360° gesture RC stunt cars, 3D STEM robot building kits, family board games & outdoor play.",
    ctaText: "Shop Toys & Games",
    ctaLink: "/category/toys",
    bgImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1600&auto=format&fit=crop&q=80"
  }
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 9-second autoplay timer for optimal slow writing animation viewing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const current = BANNERS[currentIndex];

  return (
    <div
      className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl my-4"
    >
      {/* Slide Image & Content Box */}
      <div className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-between p-6 sm:p-10 md:p-12 text-white">
        {/* Instant Crossfade Background Image */}
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={current.bgImage}
              alt={current.title}
              className="w-full h-full object-cover object-center"
              suppressHydrationWarning
            />
            {/* Dark Overlay gradient for WCAG AA text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Top Controls Row */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <span
            key={`tagline-${current.id}`}
            className="text-xs sm:text-sm font-extrabold text-[#F58220] uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
          >
            {current.tagline}
          </span>

          {/* Controls: Prev <, Pause/Play ||, Next > */}
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            >
              <UilAngleLeft size={18} />
            </button>
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            >
              {isPlaying ? <UilPause size={14} /> : <UilPlay size={14} />}
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            >
              <UilAngleRight size={18} />
            </button>
          </div>
        </div>

        {/* Banner Content with Slow Deliberate Typewriter Text Animations */}
        <div className="relative z-10 my-4 max-w-3xl">
          {/* 3D Word-by-Word Headline Reveal with Smooth 120ms Stagger */}
          <h1 key={`title-${current.id}`} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white mb-3 sm:mb-4 drop-shadow-md">
            <SplitText text={current.title} staggerDelay={0.12} />
          </h1>

          {/* Slow Deliberate Typewriter Subtitle Animation (45ms per character) */}
          <div key={`sub-${current.id}`} className="text-sm sm:text-lg md:text-xl font-bold text-gray-100 max-w-2xl mb-5 leading-relaxed drop-shadow-sm min-h-[60px]">
            <TypewriterText text={current.subtitle} typingSpeed={45} />
          </div>

          {/* Special Home Appliances Subcategories Pills */}
          {current.applianceSubcategories && (
            <motion.div
              key={`subcats-${current.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5"
            >
              {current.applianceSubcategories.map((sub, idx) => (
                <motion.div
                  key={sub.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <Link
                    href={`/category/home-appliances?sub=${sub.slug}`}
                    className="group flex flex-col bg-white/10 hover:bg-[#F58220] backdrop-blur-md p-2.5 rounded-xl border border-white/20 transition-all duration-200"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-white truncate">
                      {sub.name}
                    </span>
                    <span className="text-[10px] font-extrabold text-amber-300 group-hover:text-white flex items-center gap-0.5 mt-0.5">
                      Explore <UilArrowRight size={10} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="flex items-center gap-4 flex-wrap">
            <motion.div {...buttonPressProps}>
              <Link
                href={current.ctaLink}
                className="bg-[#F58220] hover:bg-[#E06D0F] text-white font-black text-xs sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                {current.ctaText} →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="relative z-10 flex items-center gap-2">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-[#F58220]" : "w-2.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
