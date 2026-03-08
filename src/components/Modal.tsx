"use client";

import React from "react";
import type { ModalProps } from "../types/components";
import { useModal } from "../hooks/useModal";

/** Generic modal shell with overlay, header, body, and optional footer. */
export function Modal({ open, title, children, footer, onClose }: ModalProps) {
  useModal({ open, onClose });

  if (!open) return null;

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden="false"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="modal-panel w-full max-w-3xl max-h-[96vh] overflow-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Close modal"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>

        {footer ? (
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Modal;

