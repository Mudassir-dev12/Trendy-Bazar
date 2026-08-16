"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { UilAngleRight, UilAngleLeft } from "@iconscout/react-unicons";

export default function QuickCategoryBar() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // One by one item auto scroll effect from right to left
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Step width of 1 category tile (~120px)
        const stepWidth = 140;

        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: stepWidth, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const categoriesList = [
    // Home Essentials & Subcategories
    {
      id: "household-essentials",
      name: "Household Essentials",
      slug: "home-essentials",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "kitchen-dining",
      name: "Kitchen & Dining",
      slug: "kitchen-dining",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "home-organization",
      name: "Home Organization",
      slug: "home-organization",
      image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cleaning-laundry",
      name: "Cleaning & Laundry",
      slug: "cleaning-laundry",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "home-living",
      name: "Home & Living",
      slug: "home-living",
      image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=300&auto=format&fit=crop&q=80"
    },

    // Home Appliances & Subcategories
    {
      id: "home-appliances",
      name: "⚡ Home Appliances",
      slug: "home-appliances",
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "kitchen-appliances",
      name: "Kitchen Appliances",
      slug: "kitchen-appliances",
      image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cleaning-appliances",
      name: "Cleaning Appliances",
      slug: "cleaning-appliances",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "cooling-heating",
      name: "Cooling & Heating",
      slug: "cooling-heating",
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "personal-care-appliances",
      name: "Personal Care Appliances",
      slug: "personal-care-appliances",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80"
    },

    // Smart Gadgets & Subcategories
    {
      id: "smart-gadgets",
      name: "📱 Smart Gadgets",
      slug: "smart-gadgets",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "mobile-charging",
      name: "Mobile & Charging",
      slug: "mobile-charging",
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "audio-wearables",
      name: "Audio & Wearables",
      slug: "audio-wearables",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "smart-home",
      name: "Smart Home",
      slug: "smart-home",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "tech-accessories",
      name: "Tech Accessories",
      slug: "tech-accessories",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&auto=format&fit=crop&q=80"
    },

    // Toys & Subcategories
    {
      id: "toys",
      name: "🧸 Toys",
      slug: "toys",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "educational-toys",
      name: "Educational Toys",
      slug: "educational-toys",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "remote-control-toys",
      name: "Remote Control Toys",
      slug: "remote-control-toys",
      image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "games-puzzles",
      name: "Games & Puzzles",
      slug: "games-puzzles",
      image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=300&auto=format&fit=crop&q=80"
    },
    {
      id: "creative-outdoor-play",
      name: "Creative & Outdoor Play",
      slug: "creative-outdoor-play",
      image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=300&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="my-8">
      {/* Section Title & Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            Get it all right here
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            Explore all main categories and subcategories
          </p>
        </div>
        <Link
          href="/category/smart-gadgets"
          className="text-xs md:text-sm font-bold text-gray-900 underline hover:text-[#F58220] transition-colors"
        >
          View all
        </Link>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        className="relative group/cat"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll categories left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-all opacity-90 sm:opacity-0 sm:group-hover/cat:opacity-100"
        >
          <UilAngleLeft size={22} />
        </button>

        <div
          ref={scrollRef}
          className="flex items-start gap-4 sm:gap-6 overflow-x-auto custom-scrollbar pb-3 pt-1 snap-x scroll-smooth"
        >
          {categoriesList.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2.5 group/tile shrink-0 snap-start w-24 sm:w-28 text-center"
            >
              {/* Category Tile Container */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover/tile:scale-105 shadow-2xs overflow-hidden relative bg-gray-100 text-gray-800 border border-gray-100"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover/tile:scale-110 transition-transform duration-300"
                  loading="lazy"
                  suppressHydrationWarning
                />
              </div>

              {/* Label */}
              <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover/tile:text-[#F58220] line-clamp-2 leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll categories right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-all opacity-90 sm:opacity-0 sm:group-hover/cat:opacity-100"
        >
          <UilAngleRight size={22} />
        </button>
      </div>
    </section>
  );
}
