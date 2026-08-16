"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * 1. Typewriter Effect Component
 * Types out text letter-by-letter live with a blinking cursor whenever text changes.
 */
export function TypewriterText({ text = "", typingSpeed = 45, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    if (!text) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.substring(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed]);

  return (
    <span className={`inline-flex items-center flex-wrap ${className}`}>
      <span>{displayed}</span>
      <span className="inline-block w-2.5 h-[1.15em] bg-[#F58220] animate-pulse ml-1 rounded-xs align-middle shrink-0" />
    </span>
  );
}

/**
 * 2. Scroll-Triggered Animation Component using Framer Motion
 * Materializes / slides into view when user scrolls down.
 */
export function ScrollReveal({ children, direction = "up", delay = 0, className = "" }) {
  const directions = {
    up: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    zoom: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }
  };

  const variants = directions[direction] || directions.up;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 3. Split Text Animation Component (Framer Motion Physics)
 * Breaks text into words for dramatic sequential staggered hero reveals.
 */
export function SplitText({ text = "", className = "", wordClassName = "", staggerDelay = 0.12 }) {
  if (!text) return null;
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 25, rotateX: -30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className={`inline-block mr-[0.25em] ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
