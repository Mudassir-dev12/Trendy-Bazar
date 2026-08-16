"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { formatPrice } from "@/lib/data";

export default function CountUpPrice({ targetPrice, originalPrice, duration = 600, className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState(originalPrice && originalPrice > targetPrice ? originalPrice : targetPrice);

  useEffect(() => {
    if (prefersReducedMotion || !originalPrice || originalPrice <= targetPrice) {
      setCurrentValue(targetPrice);
      return;
    }

    const startValue = originalPrice;
    const endValue = targetPrice;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const val = Math.round(startValue + (endValue - startValue) * easedProgress);

      setCurrentValue(val);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const animId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animId);
  }, [targetPrice, originalPrice, duration, prefersReducedMotion]);

  const hasDiscount = originalPrice && originalPrice > targetPrice;

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      {/* Animated Sale Price */}
      <span className="text-lg font-black text-gray-900">
        {formatPrice(currentValue)}
      </span>

      {/* Strikethrough Original Price with Animated Line */}
      {hasDiscount && (
        <span className="relative text-xs text-gray-400 font-normal inline-block">
          {formatPrice(originalPrice)}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-1/2 w-full h-[1.5px] bg-gray-400 origin-left"
          />
        </span>
      )}
    </div>
  );
}
