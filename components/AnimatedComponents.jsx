"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * 1. Typewriter Effect Component
 * Types out sentences letter-by-letter with a blinking cursor.
 */
export function TypewriterText({ texts = [], typingSpeed = 50, delayAfterText = 3000, className = "" }) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const textList = Array.isArray(texts) ? texts : [texts];

  useEffect(() => {
    if (!textList || textList.length === 0) return;

    const currentFullText = textList[textIndex % textList.length] || "";

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 >= currentFullText.length) {
          if (textList.length > 1) {
            setTimeout(() => setIsDeleting(true), delayAfterText);
          }
        }
      } else {
        setDisplayText(currentFullText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 <= 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textList.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? typingSpeed / 2 : typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, textList, typingSpeed, delayAfterText]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayText}</span>
      <span className="typewriter-cursor" />
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
 * 3. Split Text Animation Component
 * Breaks text into words for dramatic hero reveals.
 */
export function SplitText({ text = "", className = "", wordClassName = "", staggerDelay = 50 }) {
  if (!text) return null;
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`animate-split-word mr-[0.25em] ${wordClassName}`}
          style={{ animationDelay: `${index * staggerDelay}ms` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
