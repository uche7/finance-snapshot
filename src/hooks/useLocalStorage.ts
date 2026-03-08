"use client";

import React, { useEffect, useState } from "react";

/** Persistent state backed by localStorage with cross-tab sync. */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors (e.g. quota exceeded)
    }
  }, [key, value]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return;

      if (event.newValue == null) {
        setValue(initialValue);
        return;
      }

      try {
        setValue(JSON.parse(event.newValue) as T);
      } catch {
        // ignore parse errors
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key, initialValue]);

  return [value, setValue];
}

