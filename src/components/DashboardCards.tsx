"use client";

import { formatCurrency } from "../utils/formatters";
import type { DashboardCardsProps } from "../types/components";
import {
  BanknotesIcon,
  CreditCardIcon,
  WalletIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

const cardBaseClasses =
  "relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/40 p-5 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md";

/** Summary cards for income, expenses, balance, and budget usage. */
export function DashboardCards({
  income,
  expenses,
  balance,
  budgetUsagePercent,
  totalBudgetLimit,
  currency = { code: "USD", symbol: "$" },
}: DashboardCardsProps) {
  const balancePositive = balance >= 0;
  const budgetUsageLabel =
    totalBudgetLimit > 0
      ? `${budgetUsagePercent.toFixed(0)}% of ${formatCurrency(totalBudgetLimit, "en-US", currency.code, currency.symbol)}`
      : "No budgets set";

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <article className={cardBaseClasses}>
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <BanknotesIcon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium text-slate-500">Total Income</span>
        <span className="text-2xl font-semibold text-emerald-600">
          {formatCurrency(income, "en-US", currency.code, currency.symbol)}
        </span>
        <p className="text-xs text-slate-500">
          Money coming into your accounts this period.
        </p>
      </article>

      <article className={cardBaseClasses}>
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
          <CreditCardIcon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium text-slate-500">
          Total Expenses
        </span>
        <span className="text-2xl font-semibold text-rose-600">
          {formatCurrency(expenses, "en-US", currency.code, currency.symbol)}
        </span>
        <p className="text-xs text-slate-500">
          Everything you have spent across all categories.
        </p>
      </article>

      <article className={cardBaseClasses}>
        <div className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 ${balancePositive ? "text-emerald-600" : "text-rose-600"}`}>
          <WalletIcon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium text-slate-500">
          Remaining Balance
        </span>
        <span
          className={`text-2xl font-semibold ${balancePositive ? "text-emerald-600" : "text-rose-600"
            }`}
        >
          {formatCurrency(balance, "en-US", currency.code, currency.symbol)}
        </span>
        <p className="text-xs text-slate-500">
          {balancePositive
            ? "Great, you are spending less than you earn."
            : "You are spending more than your income this period."}
        </p>
      </article>

      <article className={cardBaseClasses}>
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          <ChartBarIcon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium text-slate-500">
          Budget Usage
        </span>
        <span className="text-2xl font-semibold text-sky-600">
          {totalBudgetLimit > 0 ? `${budgetUsagePercent.toFixed(0)}%` : "--"}
        </span>
        <p className="text-xs text-slate-500">{budgetUsageLabel}</p>
      </article>
    </section>
  );
}

export default DashboardCards;

