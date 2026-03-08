"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface UseCategoryDropdownOptions {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

/** Dropdown behaviour (open/close, keyboard nav, outside click) for category selection. */
export function useCategoryDropdown({
  value,
  options,
  onChange,
}: UseCategoryDropdownOptions) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((o) => o === value)),
  );
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedLabel = useMemo(
    () => options.find((o) => o === value) ?? "",
    [options, value],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const next = options[activeIndex];
        if (next) onChange(next);
        setOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [activeIndex, onChange, open, options]);

  const select = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  const toggle = () => {
    setOpen((v) => !v);
    setActiveIndex(Math.max(0, options.findIndex((o) => o === value)));
  };

  return {
    rootRef,
    open,
    activeIndex,
    selectedLabel,
    toggle,
    select,
    setActiveIndex,
  };
}

