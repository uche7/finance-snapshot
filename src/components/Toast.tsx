"use client";

import React from "react";
import { ToastContext } from "../context/toast";
import { useToastState } from "../hooks/useToastState";

/** Toast notification provider. Wrap the app to enable toast.success() and toast.error(). */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { items, toast } = useToastState();

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-2"
        aria-live="polite"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`animate-toast-in flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg ${
              item.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-800"
            }`}
          >
            <span className="text-lg" aria-hidden>
              {item.type === "success" ? "✓" : "✕"}
            </span>
            <span className="text-sm font-medium">{item.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
