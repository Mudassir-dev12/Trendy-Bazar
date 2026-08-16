"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { UilCheckCircle, UilExclamationTriangle, UilInfoCircle, UilTimes } from "@iconscout/react-unicons";

const ToastContext = createContext({
  showToast: () => {}
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const prefersReducedMotion = useReducedMotion();

  const showToast = (message, type = "success", duration = 2500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Area */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 50, scale: 0.95 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl shadow-xl border text-xs font-bold text-gray-900 glass-effect ${
                toast.type === "success"
                  ? "border-green-200 bg-white/95"
                  : toast.type === "error"
                  ? "border-red-200 bg-white/95 text-red-600"
                  : "border-blue-200 bg-white/95 text-blue-600"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {toast.type === "success" && <UilCheckCircle size={18} className="text-green-600 shrink-0" />}
                {toast.type === "error" && <UilExclamationTriangle size={18} className="text-red-500 shrink-0" />}
                {toast.type === "info" && <UilInfoCircle size={18} className="text-blue-500 shrink-0" />}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <UilTimes size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
