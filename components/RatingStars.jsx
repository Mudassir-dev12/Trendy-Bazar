import React from "react";
import { UilStar } from "@iconscout/react-unicons";

export default function RatingStars({ rating = 5.0, count = null, size = "sm" }) {
  const starSizes = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24
  };

  const currentSize = starSizes[size] || starSizes.sm;
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-amber-400">
        {[...Array(5)].map((_, i) => (
          <UilStar
            key={i}
            size={currentSize}
            className={i < fullStars ? "text-amber-400 fill-amber-400" : "text-gray-300"}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-gray-700 ml-1">
        {rating.toFixed(1)}
      </span>
      {count !== null && (
        <span className="text-xs text-gray-400 ml-0.5">({count})</span>
      )}
    </div>
  );
}
