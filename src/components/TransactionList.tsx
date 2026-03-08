"use client";

import { formatCurrency, formatDate } from "../utils/formatters";
import { sortTransactionsByDateDesc } from "../utils/helpers";
import type { TransactionListProps } from "../types/components";

/** Pageless table view of all recorded transactions with filtering and exports. */
export function TransactionList({
  transactions,
  onDelete,
  onEdit,
  onAddRequest,
  filters,
  onFilterChange,
  onExport,
  currency = { code: "USD", symbol: "$" },
}: TransactionListProps) {
  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.category.toLowerCase().includes(filters.search.toLowerCase());

    const matchesDate = !filters.date || t.date === filters.date;

    return matchesSearch && matchesDate;
  });

  const sorted = sortTransactionsByDateDesc(filtered);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, date: e.target.value });
  };

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-slate-800">Transactions</h2>
        <div className="flex flex-wrap items-center gap-2">
          {onExport && (
            <button
              onClick={() => onExport("csv")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 cursor-pointer"
            >
              Export CSV
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-500/60 transition focus:ring-2"
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Filter by Date"
            value={filters.date}
            onChange={handleDateChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-500/60 transition focus:ring-2"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {sorted.length} {sorted.length === 1 ? "transaction" : "transactions"}
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm font-medium text-slate-800">No transactions found</p>
          <p className="mt-1 text-xs text-slate-500">
            {transactions.length === 0
              ? "Start by adding your first transaction."
              : "Try adjusting your filters."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-3">Date</th>
                <th className="py-2 pr-3">Category</th>
                <th className="py-2 pr-3">Description</th>
                <th className="py-2 pr-3 text-right">Amount</th>
                <th className="py-2 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((transaction) => {
                const isIncome = transaction.type === "income";
                return (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-50 text-xs last:border-0 hover:bg-slate-50"
                  >
                    <td className="py-2 pr-3 align-middle">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="py-2 pr-3 align-middle">
                      <div className="flex items-center gap-2">
                        {transaction.category}
                        {transaction.isRecurring && (
                          <span
                            title={`Recurring ${transaction.frequency}`}
                            className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-sky-50 text-[10px] text-sky-600 ring-1 ring-sky-200"
                          >
                            ↻
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 pr-3 align-middle text-slate-700">
                      {transaction.description}
                    </td>
                    <td className="py-2 pr-3 align-middle text-right">
                      <span
                        className={`font-semibold ${isIncome ? "text-emerald-600" : "text-rose-600"
                          }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(transaction.amount, "en-US", currency.code, currency.symbol)}
                      </span>
                    </td>
                    <td className="py-2 pl-3 text-right align-middle">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onEdit(transaction)}
                          className="inline-flex items-center rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(transaction.id)}
                          className="inline-flex items-center rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TransactionList;
