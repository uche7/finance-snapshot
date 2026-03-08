"use client";

import { useState } from "react";

import { BudgetTracker } from "@/src/components/BudgetTracker";
import { DashboardCards } from "@/src/components/DashboardCards";
import { ExpenseChart } from "@/src/components/ExpenseChart";
import { TransactionList } from "@/src/components/TransactionList";
import { AddTransactionModal } from "@/src/components/AddTransactionModal";
import { useFinanceDashboard } from "@/src/hooks/useFinanceDashboard";
import { exportToCSV } from "@/src/utils/export";

const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
  { code: "NGN", symbol: "₦" },
];

export default function Dashboard() {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const {
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    editingTransaction,
    startEditing,
    transactions,
    budgets,
    currency,
    setCurrency,
    filters,
    setFilters,
    income,
    expenses,
    balance,
    totalBudgetLimit,
    budgetUsagePercent,
    handleAddTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
    handleBudgetChange,
  } = useFinanceDashboard();

  return (
    <main className="min-h-screen">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Overview
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Personal Finance Snapshot
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Track income, expenses, budgets, and your spending distribution.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <div className="relative group">
              <button
                type="button"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center justify-between min-w-[110px] rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm pl-4 pr-3 py-2 text-sm font-semibold text-slate-700 shadow-sm outline-none transition-all duration-200 hover:border-[#752264]/30 hover:bg-white focus:ring-4 focus:ring-[#752264]/10 focus:border-[#752264]/50 cursor-pointer"
              >
                <span>{currency.symbol} {currency.code}</span>
                <svg
                  className={`h-4 w-4 ml-2 text-slate-400 transition-transform duration-200 ${isCurrencyOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCurrencyOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsCurrencyOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-32 z-20 origin-top-right rounded-xl border border-slate-200 bg-white p-1 shadow-xl ring-1 ring-black/5 animate-modalPopIn">
                    <div className="max-h-[160px] overflow-y-auto pr-1">
                      {CURRENCIES.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setCurrency(c);
                            setIsCurrencyOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer ${currency.code === c.code
                              ? "bg-[#752264]/5 text-[#752264]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                        >
                          <span className="w-4 text-center">{c.symbol}</span>
                          <span>{c.code}</span>
                          {currency.code === c.code && (
                            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#752264]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#752264] cursor-pointer px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:shadow-md active:scale-[0.99]"
            >
              <span aria-hidden="true" className="text-base leading-none">
                +
              </span>
              Add transaction
            </button>
          </div>
        </header>

        <section className="mb-8">
          <DashboardCards
            income={income}
            expenses={expenses}
            balance={balance}
            budgetUsagePercent={budgetUsagePercent}
            totalBudgetLimit={totalBudgetLimit}
            currency={currency}
          />
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ExpenseChart transactions={transactions} />
          </div>
          <div className="lg:col-span-1">
            <BudgetTracker
              transactions={transactions}
              budgets={budgets}
              onBudgetChange={handleBudgetChange}
              currency={currency}
            />
          </div>
        </section>

        <section>
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={startEditing}
            onAddRequest={openAddModal}
            filters={filters}
            onFilterChange={setFilters}
            onExport={(format) => {
              if (format === "csv") exportToCSV(transactions);
            }}
            currency={currency}
          />
        </section>

        <AddTransactionModal
          open={isAddModalOpen}
          onClose={closeAddModal}
          onSave={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
          initialData={editingTransaction}
        />
      </div>
    </main>
  );
}
