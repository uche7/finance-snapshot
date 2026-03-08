"use client";

import { useState, useEffect } from "react";
import { CATEGORIES } from "../utils/constants";
import type { Transaction } from "../types";
import type {
  TransactionFormErrors,
  TransactionFormState,
  UseTransactionFormOptions,
} from "../types/components";
import { generateTransactionId, validateTransactionForm } from "../utils/helpers";
import { useToast } from "./useToast";

const initialFormState: TransactionFormState = {
  amount: "",
  category: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  type: "expense",
  isRecurring: false,
  frequency: "monthly",
};

/** Encapsulates state and handlers for the transaction form. */
export function useTransactionForm({
  onSave,
  onSubmitted,
  initialData,
}: UseTransactionFormOptions) {
  const { toast } = useToast();
  const [form, setForm] = useState<TransactionFormState>(() => {
    if (initialData) {
      return {
        amount: initialData.amount.toString(),
        category: initialData.category,
        description: initialData.description,
        date: initialData.date,
        type: initialData.type,
        isRecurring: initialData.isRecurring || false,
        frequency: initialData.frequency || "monthly",
      };
    }
    return initialFormState;
  });
  const [errors, setErrors] = useState<TransactionFormErrors>({});

  // Reset form when initialData changes (e.g. when opening a different transaction for editing)
  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount.toString(),
        category: initialData.category,
        description: initialData.description,
        date: initialData.date,
        type: initialData.type,
        isRecurring: initialData.isRecurring || false,
        frequency: initialData.frequency || "monthly",
      });
    } else {
      setForm(initialFormState);
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setType = (type: TransactionFormState["type"]) => {
    setForm((prev) => ({ ...prev, type }));
  };

  const setField = <K extends keyof TransactionFormState>(
    key: K,
    value: TransactionFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validateTransactionForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    const amountValue = Number(form.amount);

    const transaction: Transaction = {
      id: initialData?.id || generateTransactionId(),
      amount: amountValue,
      category: form.category as (typeof CATEGORIES)[number],
      description: form.description.trim(),
      date: form.date,
      type: form.type,
      isRecurring: form.isRecurring,
      frequency: form.isRecurring ? form.frequency : undefined,
    };

    try {
      onSave(transaction);
      if (!initialData) {
        setForm(initialFormState);
      }
      setErrors({});
      toast.success(
        initialData
          ? "Transaction updated successfully."
          : "Transaction added successfully.",
      );
      onSubmitted?.();
    } catch {
      toast.error("Failed to save transaction. Please try again.");
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    setType,
    setField,
  };
}

