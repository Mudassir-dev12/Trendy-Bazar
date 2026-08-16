import React from "react";
import Link from "next/link";
import { UilHome, UilAngleRightB } from "@iconscout/react-unicons";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="flex items-center text-xs text-gray-500 py-3 overflow-x-auto no-scrollbar">
      <Link
        href="/"
        className="flex items-center hover:text-[#F58220] transition-colors gap-1 font-medium"
      >
        <UilHome size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <UilAngleRightB size={14} className="mx-1 text-gray-400 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-gray-800 truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#F58220] transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
