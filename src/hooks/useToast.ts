"use client";

import { useContext } from "react";
import { ToastContext } from "../context/toast";

/** Access toast notifications. Must be used within ToastProvider. */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

