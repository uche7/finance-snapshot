import type { Transaction } from "../types";
import type {
  TransactionFormErrors,
  TransactionFormState,
} from "../types/components";

/** Generate a reasonably unique transaction identifier. */
export function generateTransactionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Sort transactions by date (and id) in descending order for display. */
export function sortTransactionsByDateDesc(
  transactions: Transaction[],
): Transaction[] {
  return [...transactions].sort((a, b) => {
    if (a.date === b.date) {
      return b.id.localeCompare(a.id);
    }
    return b.date.localeCompare(a.date);
  });
}

/** Validate a transaction form and return any field errors. */
export function validateTransactionForm(
  form: TransactionFormState,
): TransactionFormErrors {
  const nextErrors: TransactionFormErrors = {};
  const amountValue = Number(form.amount);

  if (!form.amount) {
    nextErrors.amount = "Amount is required.";
  } else if (Number.isNaN(amountValue) || amountValue <= 0) {
    nextErrors.amount = "Enter a positive number.";
  }

  if (!form.category) {
    nextErrors.category = "Choose a category.";
  }

  if (!form.description.trim()) {
    nextErrors.description = "Add a short description.";
  }

  if (!form.date) {
    nextErrors.date = "Pick a date.";
  }

  return nextErrors;
}

/** Generate a unique toast identifier. */
export function generateToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

