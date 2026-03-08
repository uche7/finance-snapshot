"use client";

import { createContext } from "react";
import type { ToastContextValue } from "../types/toast";

/** React context used for toast notifications. */
export const ToastContext = createContext<ToastContextValue | null>(null);

