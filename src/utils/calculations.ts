import type { Budget, Transaction } from "../types";
import { CATEGORIES } from "./constants";

export function calculateIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateBalance(transactions: Transaction[]): number {
  return calculateIncome(transactions) - calculateExpenses(transactions);
}

export function groupExpensesByCategory(
  transactions: Transaction[],
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const category of CATEGORIES) {
    result[category] = 0;
  }

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;
    result[transaction.category] =
      (result[transaction.category] ?? 0) + transaction.amount;
  }

  return result;
}

export function calculateTotalBudgetLimit(budgets: Budget[]): number {
  return budgets.reduce((sum, b) => sum + (b.limit || 0), 0);
}

