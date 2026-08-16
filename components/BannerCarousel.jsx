"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { UilAngleLeft, UilAngleRight, UilPause, UilPlay } from "@iconscout/react-unicons";
import { TypewriterText, SplitText } from "@/components/AnimatedComponents";
import { buttonPressProps } from "@/lib/motion";

const BANNERS = [
  {
    id: 1,
    tagline: "Members get exclusive rewards & free delivery",
    title: "Save up to 45% with Trendy+ Membership",
    subtitle: "Enjoy free express delivery, exclusive flash deals, and partner streaming perks.",
    ctaText: "Try Trendy+ for Free",
    ctaLink: "/category/smart-gadgets",
    bgImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    tagline: "Mega Electronics & Smart Gadgets",
    title: "Next-Gen Audio Wearables & Fast Charging",
    subtitle: "Noise-cancelling earbuds, smart watches, and ultra-fast GaN chargers at direct bazaar prices.",
    ctaText: "Shop Gadgets Now",
    ctaLink: "/category/smart-gadgets",
    bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    tagline: "Home & Appliance Super Sale",
    title: "Upgrade Kitchen Essentials & Home Living",
    subtitle: "Digital air fryers, espresso machines, ceramic cookware & LiDAR robot vacuums.",
    ctaText: "Explore Essentials",
    ctaLink: "/category/home-appliances",
    bgImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80"
  }
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 7000);
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
    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl my-4">
      {/* Slide Image Container with AnimatePresence Crossfade & Horizontal Slide */}
      <div className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[420px] flex flex-col justify-between p-6 sm:p-10 md:p-12 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={current.bgImage}
              alt={current.title}
              className="w-full h-full object-cover object-center"
              suppressHydrationWarning
            />
            {/* Dark Overlay gradient for crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Top Controls Row */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="text-xs sm:text-sm font-extrabold text-amber-300 tracking-wide">
            {current.tagline}
          </div>

          {/* Controls: Prev <, Pause/Play ||, Next > */}
          <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
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

        {/* Banner Content with Split Text Headline & Typewriter Subtitle */}
        <div className="relative z-10 my-4 max-w-2xl">
          {/* Split Text Dramatic Headline Reveal */}
          <h1 key={`title-${current.id}`} className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3">
            <SplitText text={current.title} staggerDelay={45} />
          </h1>

          {/* Typewriter Effect Text Animation on Description Subtitle */}
          <div key={`sub-${current.id}`} className="text-xs sm:text-sm text-blue-100 font-medium max-w-xl mb-6 min-h-[48px] leading-relaxed">
            <TypewriterText texts={[current.subtitle]} typingSpeed={40} delayAfterText={4000} />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <motion.div {...buttonPressProps}>
              <Link
                href={current.ctaLink}
                className="bg-[#F58220] hover:bg-[#E06D0F] text-white font-black text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                {current.ctaText}
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
                idx === currentIndex ? "w-7 bg-[#F58220]" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
