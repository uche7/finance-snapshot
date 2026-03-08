"use client";

import { useState } from "react";
import type { Category } from "../types";
import type { UseBudgetTrackerOptions } from "../types/components";
import { groupExpensesByCategory } from "../utils/calculations";

/** Encapsulates editing behaviour for the budget tracker. */
export function useBudgetTracker({
  transactions,
  budgets,
  onBudgetChange,
}: UseBudgetTrackerOptions) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editValue, setEditValue] = useState("");

  const spentByCategory = groupExpensesByCategory(transactions);

  const getBudgetLimit = (category: Category): number => {
    const budget = budgets.find((b) => b.category === category);
    return budget?.limit ?? 0;
  };

  const handleSetBudget = (category: Category) => {
    const value = Number(editValue);
    if (Number.isNaN(value) || value < 0) return;

    const updated = budgets.filter((b) => b.category !== category);
    if (value > 0) {
      updated.push({ category, limit: value });
    }
    onBudgetChange(updated);
    setEditingCategory(null);
    setEditValue("");
  };

  const handleStartEdit = (category: Category) => {
    setEditingCategory(category);
    setEditValue(String(getBudgetLimit(category)));
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditValue("");
  };

  return {
    spentByCategory,
    editingCategory,
    editValue,
    setEditValue,
    getBudgetLimit,
    handleSetBudget,
    handleStartEdit,
    handleCancelEdit,
  };
}

