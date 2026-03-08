"use client";

import { useState } from "react";

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

  const [isFrequencyOpen, setIsFrequencyOpen] = useState(false);
  const frequencies = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ] as const;

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
            className="h-4 w-4 rounded border-slate-300 text-[#752264] focus:ring-[#752264] cursor-pointer"
          />
          <label
            htmlFor="isRecurring"
            className="text-xs font-medium text-slate-600 cursor-pointer"
          >
            Recurring Transaction
          </label>
        </div>
        {form.isRecurring && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFrequencyOpen(!isFrequencyOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none ring-[#752264]/60 transition-all hover:border-[#752264]/30 focus:ring-2 cursor-pointer"
            >
              <span className="capitalize">{form.frequency}</span>
              <svg
                className={`ml-2 h-4 w-4 text-slate-400 transition-transform ${isFrequencyOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isFrequencyOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsFrequencyOpen(false)}
                />
                <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white p-1 shadow-xl animate-modalPopIn">
                  <div className="max-h-[100px] overflow-y-auto pr-1">
                    {frequencies.map((freq) => (
                      <button
                        key={freq.value}
                        type="button"
                        onClick={() => {
                          setField("frequency", freq.value);
                          setIsFrequencyOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors cursor-pointer ${form.frequency === freq.value
                            ? "bg-[#752264]/5 text-[#752264]"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                      >
                        {freq.label}
                        {form.frequency === freq.value && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#752264]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {variant === "card" ? (
        <div className="flex items-end md:col-span-2 lg:col-span-3">
          <button
            type="submit"
            className="w-full rounded-lg bg-[#752264] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md md:w-auto cursor-pointer"
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

