"use client";

import React, { useState } from "react";
import { UilSmile, UilTimes, UilCheck, UilStar } from "@iconscout/react-unicons";

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setComment("");
    }, 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Yellow Smiley Button (Exact Walmart UI icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Website Feedback"
        className="w-12 h-12 rounded-full bg-[#ffc220] hover:bg-[#ffb000] text-gray-900 shadow-xl border-2 border-white flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
        title="Give Feedback"
      >
        {isOpen ? <UilTimes size={24} /> : <UilSmile size={28} className="text-gray-900" />}
      </button>

      {/* Interactive Modal Dropup */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-gray-200 p-5 text-gray-900 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#ffc220] flex items-center justify-center">
                <UilSmile size={18} className="text-gray-900" />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900">Your Feedback</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <UilTimes size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="py-6 text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <UilCheck size={24} />
              </div>
              <h4 className="font-extrabold text-sm text-gray-900">Thank you!</h4>
              <p className="text-xs text-gray-500">Your feedback helps us improve your shopping experience.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  How is your experience today?
                </label>
                <div className="flex items-center justify-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-125 transition-transform"
                    >
                      <UilStar
                        size={22}
                        className={star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Comments or Suggestions
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you love or what we can improve..."
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:border-[#0071dc] focus:ring-1 focus:ring-[#0071dc] outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0071dc] hover:bg-[#005bb5] text-white text-xs font-bold py-2 rounded-full transition-colors shadow-xs"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
