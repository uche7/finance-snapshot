export type ToastType = "success" | "error";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
}

export interface ToastContextValue {
  toast: ToastApi;
}

