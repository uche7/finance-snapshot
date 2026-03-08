"use client";

import { ToastProvider } from "./Toast";

/** Client-side providers (toast, etc.) for the app. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
