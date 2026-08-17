"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { formatPrice } from "@/lib/data";

export default function CountUpPrice({ targetPrice, originalPrice, duration = 600, className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const numTarget = Math.round(Number(targetPrice) || 0);
  const numOriginal = originalPrice ? Math.round(Number(originalPrice)) : 0;
  const hasDiscount = numOriginal > numTarget;

  const [currentValue, setCurrentValue] = useState(numTarget);

  useEffect(() => {
    if (prefersReducedMotion || !hasDiscount) {
      setCurrentValue(numTarget);
      return;
    }

    const startValue = numOriginal;
    const endValue = numTarget;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const val = Math.round(startValue + (endValue - startValue) * easedProgress);

      setCurrentValue(val);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const animId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animId);
  }, [numTarget, numOriginal, duration, prefersReducedMotion, hasDiscount]);

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`} suppressHydrationWarning>
      {/* Active Price */}
      <span className="text-lg font-black text-gray-900" suppressHydrationWarning>
        {formatPrice(currentValue)}
      </span>

      {/* Strikethrough Original Price */}
      {hasDiscount && (
        <span className="text-xs text-gray-400 font-normal line-through" suppressHydrationWarning>
          {formatPrice(numOriginal)}
        </span>
      )}
    </div>
  );
}
