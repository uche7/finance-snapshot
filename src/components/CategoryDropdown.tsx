"use client";

import React from "react";
import { useCategoryDropdown } from "../hooks/useCategoryDropdown";

interface CategoryDropdownProps {
  value: string;
  options: string[];
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
}

/** Custom category dropdown with a styled option list (better than native select). */
export function CategoryDropdown({
  value,
  options,
  placeholder = "Select category",
  error,
  onChange,
}: CategoryDropdownProps) {
  const { rootRef, open, activeIndex, selectedLabel, toggle, select, setActiveIndex } =
    useCategoryDropdown({ value, options, onChange });

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm outline-none transition ${error
            ? "border-rose-300 bg-rose-50/40 ring-rose-500/40"
            : "border-slate-200 bg-slate-50 ring-sky-500/60 focus:bg-white"
          }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selectedLabel ? "text-slate-900" : "text-slate-400"}>
          {selectedLabel || placeholder}
        </span>
        <span className="ml-3 text-xs text-slate-400" aria-hidden>
          ▼
        </span>
      </button>

      {open ? (
        <div
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl animate-modalPopIn"
          role="listbox"
          aria-label="Category options"
        >
          <div className="bg-slate-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Categories
          </div>
          <div className="max-h-[150px] overflow-auto p-1">
            {options.map((opt, idx) => {
              const isActive = idx === activeIndex;
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => select(opt)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition cursor-pointer ${isActive ? "bg-[#752264]/5 text-[#752264]" : "text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${isSelected ? "bg-[#752264]" : "bg-slate-300"
                        }`}
                      aria-hidden
                    />
                    {opt}
                  </span>
                  {isSelected ? (
                    <span className="text-xs font-semibold text-[#752264]">
                      Selected
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CategoryDropdown;

