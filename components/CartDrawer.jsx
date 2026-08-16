"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  UilTimes,
  UilShoppingBag,
  UilTrashAlt,
  UilPlus,
  UilMinus,
  UilArrowRight,
  UilShieldCheck
} from "@iconscout/react-unicons";
import { useCart } from "@/context/CartContext";
import CountUpPrice from "./CountUpPrice";
import { formatPrice } from "@/lib/data";
import { slideInRight, fadeIn, springBounce } from "@/lib/motion";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems
  } = useCart();
  const prefersReducedMotion = useReducedMotion();

  const freeShippingThreshold = 5000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 text-[#F58220] rounded-lg">
                    <UilShoppingBag size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">Shopping Cart</h2>
                    <p className="text-xs text-gray-500">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
                >
                  <UilTimes size={20} />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="bg-orange-50/70 p-3 px-4 border-b border-orange-100/60">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-800 mb-1.5">
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      Add <span className="text-[#F58220] font-bold">{formatPrice(remainingForFreeShipping)}</span> more for <span className="text-green-600 font-bold">FREE Shipping</span>
                    </span>
                  ) : (
                    <span className="text-green-700 font-bold flex items-center gap-1">
                      🎉 You unlocked FREE Express Shipping!
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-[#F58220] h-full rounded-full"
                  />
                </div>
              </div>

              {/* Cart Item List with AnimatePresence for item removal */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-[#F58220] mb-4">
                      <UilShoppingBag size={40} className="stroke-1" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">Your cart is empty</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-6 max-w-xs">
                      Looks like you haven't added any items to your shopping cart yet.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-[#F58220] hover:bg-[#E06D0F] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all duration-200"
                    >
                      Start Shopping Now
                    </button>
                  </motion.div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => {
                      const itemPrice = item.discountPrice || item.price;
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -10 }}
                          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto", y: 0 }}
                          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, overflow: "hidden" }}
                          transition={{ duration: 0.25 }}
                          className="pt-4 first:pt-0 border-b border-gray-100 pb-4 flex gap-3"
                        >
                          <img
                            src={item.image || FALLBACK_IMAGE}
                            alt={item.name}
                            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-100 shrink-0 bg-gray-50"
                            suppressHydrationWarning
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <Link
                                  href={`/product/${item.id}`}
                                  onClick={() => setIsCartOpen(false)}
                                  className="font-semibold text-gray-900 text-sm hover:text-[#F58220] transition-colors line-clamp-2"
                                >
                                  {item.name}
                                </Link>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                                  title="Remove item"
                                >
                                  <UilTrashAlt size={16} />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity Stepper with Number Scale-Pop */}
                              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                  <UilMinus size={14} />
                                </button>
                                <motion.span
                                  key={item.quantity}
                                  initial={prefersReducedMotion ? {} : { scale: 0.7 }}
                                  animate={prefersReducedMotion ? {} : { scale: 1 }}
                                  transition={springBounce}
                                  className="px-2.5 text-xs font-bold text-gray-800"
                                >
                                  {item.quantity}
                                </motion.span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                                >
                                  <UilPlus size={14} />
                                </button>
                              </div>

                              <span className="font-bold text-gray-900 text-sm">
                                {formatPrice(itemPrice * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer Summary */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-200 bg-white space-y-3">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Estimated Shipping</span>
                      <span>
                        {remainingForFreeShipping === 0 ? (
                          <span className="text-green-600 font-bold">FREE</span>
                        ) : (
                          formatPrice(499)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span className="text-[#F58220]">
                        <CountUpPrice targetPrice={subtotal + (remainingForFreeShipping === 0 ? 0 : 499)} />
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-bold text-xs transition-colors"
                    >
                      View Full Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full text-center bg-[#F58220] hover:bg-[#E06D0F] text-white py-3 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                    >
                      Checkout <UilArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                    <UilShieldCheck size={14} className="text-green-500" /> Safe & Secure Checkout
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
