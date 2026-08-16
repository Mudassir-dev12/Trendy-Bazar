"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { User, Mail, Lock, LogIn, UserPlus, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-md mx-auto my-8">
      <Breadcrumbs items={[{ label: "Account" }]} />

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-orange-100 text-[#F58220] rounded-2xl flex items-center justify-center mx-auto mb-3">
            <User className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">
            {isLogin ? "Welcome Back to Trendy Bazaar" : "Create Your Account"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isLogin ? "Sign in to track orders and manage your saved wishlist" : "Join thousands of shoppers catching top trends at direct prices"}
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 p-4 rounded-2xl text-center space-y-2 text-xs">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
            <h3 className="font-bold text-green-800 text-sm">Sign In Successful</h3>
            <p className="text-green-700">Welcome to your mock account session!</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-2 text-[#F58220] font-bold underline"
            >
              Sign out / switch account
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-[#F58220] outline-hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-[#F58220] outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-semibold focus:border-[#F58220] outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F58220] hover:bg-[#E06D0F] text-white py-3 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {isLogin ? "Sign In" : "Register Account"}
            </button>
          </form>
        )}

        <div className="text-center pt-3 border-t border-gray-100">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setIsSubmitted(false);
            }}
            className="text-xs text-[#F58220] font-bold hover:underline"
          >
            {isLogin ? "Don't have an account? Register Now" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
