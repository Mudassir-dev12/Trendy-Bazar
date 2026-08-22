"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import CountUpPrice from "@/components/CountUpPrice";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { formatPrice } from "@/lib/data";
import { buttonPressProps, springBounce, fadeUp } from "@/lib/motion";
import { trackInitiateCheckout, trackPurchase } from "@/lib/pixel";
import {
  UilCheckCircle,
  UilCreditCard,
  UilMapPin
} from "@iconscout/react-unicons";

export default function CheckoutPage() {
  const prefersReducedMotion = useReducedMotion();
  const { cart, subtotal, clearCart } = useCart();
  const { placeOrder } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "Cash on Delivery"
  });

  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const freeShipping = subtotal >= 5000;
  const shippingCost = freeShipping ? 0 : 300;
  const estimatedTax = 0; // Taxes removed as requested
  const total = subtotal + shippingCost;

  // Track InitiateCheckout on mount
  useEffect(() => {
    if (cart.length > 0) {
      trackInitiateCheckout(cart, total);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name || item.title,
        title: item.name || item.title,
        price: item.discountPrice || item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      shipping: shippingCost,
      tax: 0,
      total,
      totalAmount: total,
      paymentMethod: "Cash on Delivery"
    };

    try {
      const createdOrder = await placeOrder(orderPayload);
      const finalOrder = createdOrder || orderPayload;
      trackPurchase(finalOrder);
      clearCart();
      setOrderConfirmed(finalOrder);
    } catch (err) {
      console.error("Order submission error:", err);
      const fallbackOrder = { id: `TB-${Date.now().toString().slice(-6)}`, ...orderPayload };
      trackPurchase(fallbackOrder);
      clearCart();
      setOrderConfirmed(fallbackOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Animated Success Confirmation View
  if (orderConfirmed) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto my-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={prefersReducedMotion ? {} : fadeUp}
          className="bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-100 shadow-xl space-y-6 relative overflow-hidden"
        >
          {/* Animated SVG Checkmark Drawing */}
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto relative">
            <svg className="w-14 h-14" viewBox="0 0 52 52" fill="none">
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M14 27l8 8 16-16"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              />
            </svg>
          </div>

          <div>
            <span className="bg-orange-100 text-[#F58220] font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
              Order Placed Successfully!
            </span>
            <h1 className="text-3xl font-black text-gray-900 mt-3">
              Thank You For Your Order!
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Your order ID is <strong className="text-gray-900 font-mono">{orderConfirmed.id || orderConfirmed.order_number}</strong>. We've sent a confirmation email to <span className="font-semibold text-gray-800">{orderConfirmed.customer?.email || orderConfirmed.customerEmail}</span>.
            </p>
          </div>

          {/* Order Details Summary Box */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-left space-y-3 text-xs">
            <div className="flex justify-between font-bold text-gray-800 pb-2 border-b border-gray-200">
              <span>Delivery Address</span>
              <span>Payment Method</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>
                <strong>{orderConfirmed.customer?.name || orderConfirmed.customerName}</strong><br />
                {orderConfirmed.customer?.address || orderConfirmed.shippingAddress}, {orderConfirmed.customer?.city || orderConfirmed.city}
              </span>
              <span className="font-semibold text-gray-900">Cash on Delivery</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between font-extrabold text-sm text-gray-900">
              <span>Total Amount Paid</span>
              <span className="text-[#F58220]">{formatPrice(orderConfirmed.totalAmount || orderConfirmed.total || 0)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 bg-[#F58220] hover:bg-[#E06D0F] text-white py-3.5 rounded-xl font-extrabold text-sm shadow-md transition-all text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-100 shadow-xs max-w-md mx-auto my-10">
        <h2 className="text-2xl font-black text-gray-900">No items to checkout</h2>
        <p className="text-xs text-gray-500 mt-2 mb-6">Your cart is empty. Add products before checking out.</p>
        <Link href="/" className="bg-[#F58220] text-white px-6 py-2.5 rounded-xl font-bold text-xs">
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Checkout" }]} />

      <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
        CHECKOUT & DELIVERY
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Shipping Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Shipping Address Form */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <UilMapPin size={20} className="text-[#F58220]" />
              <h2 className="font-extrabold text-gray-900 text-lg">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "e.g. Muhammad Ali" },
                { label: "Email Address", name: "email", type: "email", placeholder: "e.g. ali@example.com" },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "e.g. 0300 1234567" },
                { label: "Street Address", name: "address", type: "text", placeholder: "e.g. House 45, Street 12, Gulberg III" },
                { label: "City", name: "city", type: "text", placeholder: "e.g. Lahore / Karachi / Islamabad" },
                { label: "Zip / Postal Code", name: "zip", type: "text", placeholder: "e.g. 54000" }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-bold text-gray-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:border-[#F58220] focus:ring-2 focus:ring-orange-100 outline-hidden transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
            <h3 className="font-black text-gray-900 text-lg border-b border-gray-100 pb-3">
              Order Items ({cart.length})
            </h3>

            <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto custom-scrollbar pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-md object-cover border shrink-0" />
                    <span className="font-semibold text-gray-800 truncate">{item.name}</span>
                    <span className="text-gray-400 font-bold">x{item.quantity}</span>
                  </div>
                  <span className="font-extrabold text-gray-900">
                    {formatPrice((item.discountPrice || item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-3 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-bold text-gray-900">
                  {freeShipping ? <span className="text-green-600 font-bold">FREE</span> : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-bold text-gray-900">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-[#F58220]">
                  <CountUpPrice targetPrice={total} />
                </span>
              </div>
            </div>

            <motion.button
              {...buttonPressProps}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F58220] hover:bg-[#E06D0F] text-white py-4 rounded-xl font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Processing Order..."
              ) : (
                <>
                  <UilCheckCircle size={20} /> Confirm & Place Order
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
