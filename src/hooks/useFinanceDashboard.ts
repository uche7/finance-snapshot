"use client";

import { useState } from "react";
import {
  calculateBalance,
  calculateExpenses,
  calculateIncome,
  calculateTotalBudgetLimit,
} from "../utils/calculations";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";
import type { Budget, Transaction } from "../types";

/** Aggregates dashboard state, derived metrics, and handlers. */
export function useFinanceDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    date: "",
  });

  const [currency, setCurrency] = useLocalStorage<{
    code: string;
    symbol: string;
  }>(STORAGE_KEYS.currency as any, { code: "USD", symbol: "$" });

  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    STORAGE_KEYS.transactions,
    [],
  );
  const [budgets, setBudgets] = useLocalStorage<Budget[]>(
    STORAGE_KEYS.budgets,
    [],
  );

  const income = calculateIncome(transactions);
  const expenses = calculateExpenses(transactions);
  const balance = calculateBalance(transactions);
  const totalBudgetLimit = calculateTotalBudgetLimit(budgets);
  const budgetUsagePercent =
    totalBudgetLimit > 0 ? (expenses / totalBudgetLimit) * 100 : 0;

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const handleUpdateTransaction = (transaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transaction.id ? transaction : t)),
    );
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setEditingTransaction(null);
  };

  const startEditing = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsAddModalOpen(true);
  };

  return {
    // modal
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    editingTransaction,
    startEditing,
    // data
    transactions,
    budgets,
    currency,
    setCurrency,
    // filters
    filters,
    setFilters,
    // derived metrics
    income,
    expenses,
    balance,
    totalBudgetLimit,
    budgetUsagePercent,
    // handlers
    handleAddTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
    handleBudgetChange: setBudgets,
  };
}

