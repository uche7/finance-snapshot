import { useEffect } from "react";

interface UseModalOptions {
  open: boolean;
  onClose: () => void;
}

/**
 * Custom hook to handle common modal side effects:
 * 1. Closes the modal when the "Escape" key is pressed.
 * 2. Locks the body scroll when the modal is open.
 */
export function useModal({ open, onClose }: UseModalOptions) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);
}
