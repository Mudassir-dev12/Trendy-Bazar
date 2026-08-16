"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data";
import {
  UilShoppingBag,
  UilTrashAlt,
  UilPlus,
  UilMinus,
  UilArrowRight,
  UilShieldCheck,
  UilArrowLeft
} from "@iconscout/react-unicons";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    if (promoCode.trim().toUpperCase() === "TRENDY2026") {
      setAppliedDiscount(4000);
      setPromoSuccess(`Promo code TRENDY2026 applied! ${formatPrice(4000)} discount.`);
    } else {
      setPromoError("Invalid code. Try TRENDY2026");
    }
  };

  const freeShipping = subtotal >= 15000;
  const shippingCost = freeShipping ? 0 : 499;
  const estimatedTax = subtotal * 0.08;
  const total = Math.max(0, subtotal + shippingCost + estimatedTax - appliedDiscount);

  if (cart.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: "Shopping Cart" }]} />
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-xl mx-auto my-10">
          <div className="w-20 h-20 bg-orange-50 text-[#F58220] rounded-full flex items-center justify-center mx-auto mb-4">
            <UilShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Your Shopping Cart is Empty</h2>
          <p className="text-sm text-gray-500 mt-2 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#F58220] hover:bg-[#E06D0F] text-white px-8 py-3 rounded-xl font-extrabold text-sm shadow-md transition-all"
          >
            <UilArrowLeft size={18} /> Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Shopping Cart" }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
          SHOPPING CART ({cart.length} item{cart.length > 1 ? "s" : ""})
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
        >
          <UilTrashAlt size={14} /> Empty Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-2xl md:rounded-3xl p-6 border border-gray-100 shadow-xs space-y-6">
          <div className="divide-y divide-gray-100">
            {cart.map((item) => {
              const itemPrice = item.discountPrice || item.price;
              return (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || FALLBACK_IMAGE}
                      alt={item.name}
                      onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      className="w-20 h-20 object-cover rounded-xl border border-gray-100 shrink-0 bg-gray-50"
                      suppressHydrationWarning
                    />
                    <div>
                      <Link
                        href={`/product/${item.id}`}
                        className="font-bold text-gray-900 text-sm hover:text-[#F58220] transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <span className="text-xs text-gray-400 capitalize block mt-1">
                        Category: {item.category?.replace(/-/g, " ")}
                      </span>
                      <span className="font-extrabold text-[#F58220] text-sm sm:hidden block mt-1">
                        {formatPrice(itemPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="hidden sm:block text-right">
                      <span className="font-extrabold text-gray-900 text-sm block">
                        {formatPrice(itemPrice)}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-gray-600 hover:bg-gray-200"
                      >
                        <UilMinus size={14} />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-gray-600 hover:bg-gray-200"
                      >
                        <UilPlus size={14} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <span className="font-black text-gray-900 text-base">
                      {formatPrice(itemPrice * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                      title="Remove Item"
                    >
                      <UilTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Summary & Promo Code */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="font-black text-gray-900 text-lg border-b border-gray-100 pb-3">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. TRENDY2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-gray-50 border border-gray-200 text-xs font-bold rounded-xl px-3 py-2.5 flex-1 uppercase focus:border-[#F58220] outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-bold text-xs"
                >
                  Apply
                </button>
              </div>
              {promoSuccess && <p className="text-[11px] text-green-600 font-bold">{promoSuccess}</p>}
              {promoError && <p className="text-[11px] text-red-500 font-bold">{promoError}</p>}
            </form>

            <div className="space-y-2.5 text-sm pt-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Promo Discount</span>
                  <span>-{formatPrice(appliedDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-bold text-gray-900">
                  {freeShipping ? <span className="text-green-600 font-bold">FREE</span> : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-bold text-gray-900">{formatPrice(estimatedTax)}</span>
              </div>

              <div className="flex justify-between text-lg font-black text-gray-900 pt-3 border-t border-gray-100">
                <span>Order Total</span>
                <span className="text-[#F58220]">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-[#F58220] hover:bg-[#E06D0F] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout <UilArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 pt-2">
              <UilShieldCheck size={16} className="text-green-500" /> 100% Safe Mock Payment Flow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
