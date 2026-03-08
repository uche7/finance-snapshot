"use client";

import { CATEGORIES } from "../utils/constants";
import { formatCurrency } from "../utils/formatters";
import type { BudgetTrackerProps } from "../types/components";
import { useBudgetTracker } from "../hooks/useBudgetTracker";

/** Budget limits and progress by category with simple editing controls. */
export function BudgetTracker({
  transactions,
  budgets,
  onBudgetChange,
  currency = { code: "USD", symbol: "$" },
}: BudgetTrackerProps) {
  const {
    spentByCategory,
    editingCategory,
    editValue,
    setEditValue,
    getBudgetLimit,
    handleSetBudget,
    handleStartEdit,
    handleCancelEdit,
  } = useBudgetTracker({ transactions, budgets, onBudgetChange });

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">
          Budget by Category
        </h2>
        <span className="text-xs text-slate-500">Limits + progress</span>
      </div>

      {budgets.length === 0 && !editingCategory ? (
        <p className="py-4 text-sm text-slate-500">
          No budgets set. Click a category below to set a spending limit.
        </p>
      ) : null}

      <div className="space-y-3">
        {CATEGORIES.map((category) => {
          const limit = getBudgetLimit(category);
          const spent = spentByCategory[category] ?? 0;
          const percent = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
          const isOver = limit > 0 && spent > limit;
          const isEditing = editingCategory === category;

          return (
            <div
              key={category}
              className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition hover:bg-slate-50"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-slate-800">{category}</span>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-24 rounded-md border border-slate-200 px-2 py-1 text-sm outline-none ring-sky-500 focus:ring-1"
                      placeholder="Limit"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleSetBudget(category)}
                      className="rounded-md bg-sky-600 px-2 py-1 text-xs font-medium text-white hover:bg-sky-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {formatCurrency(spent, "en-US", currency.code, currency.symbol)}
                      {limit > 0 ? ` / ${formatCurrency(limit, "en-US", currency.code, currency.symbol)}` : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStartEdit(category)}
                      className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-white hover:shadow-sm"
                    >
                      {limit > 0 ? "Edit" : "Set"}
                    </button>
                  </div>
                )}
              </div>

              {limit > 0 && (
                <div className="space-y-1">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all ${isOver ? "bg-rose-500" : "bg-sky-500"
                        }`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                  {isOver && (
                    <p className="text-xs font-medium text-rose-600">
                      Budget exceeded by {formatCurrency(spent - limit, "en-US", currency.code, currency.symbol)}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BudgetTracker;
