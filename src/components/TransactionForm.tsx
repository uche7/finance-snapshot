"use client";

import { CATEGORIES } from "../utils/constants";
import type { TransactionFormProps } from "../types/components";
import { useTransactionForm } from "../hooks/useTransactionForm";
import { CategoryDropdown } from "./CategoryDropdown";

/** Form for creating a single income or expense transaction. */
export function TransactionForm({
  onSave,
  initialData,
  variant = "card",
  submitLabel,
  onCancel,
  onSubmitted,
}: TransactionFormProps) {
  const { form, errors, handleChange, handleSubmit, setType, setField } =
    useTransactionForm({ onSave, onSubmitted, initialData });

  const content = (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="amount" className="text-xs font-medium text-slate-600">
          Amount <span className="text-rose-500">*</span>
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={form.amount}
          onChange={handleChange}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-500/60 transition focus:ring-2"
          placeholder="0.00"
        />
        {errors.amount && (
          <p className="text-xs text-rose-600">{errors.amount}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-xs font-medium text-slate-600">
          Category <span className="text-rose-500">*</span>
        </label>
        <CategoryDropdown
          value={form.category}
          options={[...CATEGORIES]}
          error={errors.category}
          onChange={(value) => setField("category", value)}
        />
        {errors.category && (
          <p className="text-xs text-rose-600">{errors.category}</p>
        )}
      </div>

      <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-1">
        <label
          htmlFor="description"
          className="text-xs font-medium text-slate-600"
        >
          Description <span className="text-rose-500">*</span>
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-500/60 transition focus:ring-2"
          placeholder="Groceries, bus ticket, salary..."
        />
        {errors.description && (
          <p className="text-xs text-rose-600">{errors.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-xs font-medium text-slate-600">
          Date <span className="text-rose-500">*</span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-500/60 transition focus:ring-2"
        />
        {errors.date && <p className="text-xs text-rose-600">{errors.date}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-600">Type</span>
        <div className="inline-flex gap-2 rounded-lg bg-slate-50 p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`flex-1 rounded-md px-3 py-1.5 text-center transition ${form.type === "expense"
                ? "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
                : "text-slate-500 hover:bg-slate-100"
              }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType("income")}
            className={`flex-1 rounded-md px-3 py-1.5 text-center transition ${form.type === "income"
                ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                : "text-slate-500 hover:bg-slate-100"
              }`}
          >
            Income
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 py-1">
          <input
            id="isRecurring"
            name="isRecurring"
            type="checkbox"
            checked={form.isRecurring}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
          />
          <label
            htmlFor="isRecurring"
            className="text-xs font-medium text-slate-600"
          >
            Recurring Transaction
          </label>
        </div>
        {form.isRecurring && (
          <select
            id="frequency"
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-500/60 transition focus:ring-2"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        )}
      </div>

      {variant === "card" ? (
        <div className="flex items-end md:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md md:w-auto"
          >
            {submitLabel ?? (initialData ? "Update transaction" : "Add transaction")}
          </button>
        </div>
      ) : null}
    </form>
  );

  if (variant === "modal") {
    return (
      <div className="space-y-5">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          id="transaction-form"
        >
          {content.props.children}
        </form>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 cursor-pointer transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              const formEl = document.getElementById(
                "transaction-form",
              ) as HTMLFormElement | null;
              formEl?.requestSubmit();
            }}
            className="rounded-lg bg-[#752264] px-4 py-2 text-sm font-medium cursor-pointer text-white shadow-sm transition hover:shadow-md"
          >
            {submitLabel ?? "Save transaction"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
      <h2 className="mb-3 text-base font-semibold text-slate-800">
        Add Transaction
      </h2>
      {content}
    </section>
  );
}

export default TransactionForm;

