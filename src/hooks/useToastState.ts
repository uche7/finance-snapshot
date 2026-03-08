"use client";

import { useCallback, useState } from "react";
import type { ToastItem, ToastType } from "../types/toast";
import { generateToastId } from "../utils/helpers";

/** Internal state/handlers for managing toast items. */
export function useToastState() {
  const [items, setItems] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = generateToastId();
    setItems((prev) => [...prev, { id, message, type }]);

    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const toast = {
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
  };

  return { items, toast };
}

