"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return (
      <main className="w-full min-h-screen bg-gray-50 text-gray-900 p-4 md:p-6 max-w-7xl mx-auto">
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <CategoryNav />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-4 md:py-6">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <ScrollToTopButton />
    </>
  );
}
