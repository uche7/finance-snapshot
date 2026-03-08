"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../utils/formatters";
import { groupExpensesByCategory } from "../utils/calculations";
import type { ExpenseChartProps } from "../types/components";

const CHART_COLORS = [
  "#0ea5e9", // sky-500
  "#8b5cf6", // violet-500
  "#f59e0b", // amber-500
  "#10b981", // emerald-500
  "#ef4444", // rose-500
];

/** Pie chart visualising spending distribution by category. */
export function ExpenseChart({ transactions }: ExpenseChartProps) {
  const grouped = groupExpensesByCategory(transactions);
  const data = Object.entries(grouped)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <section className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
        <h2 className="mb-1 text-sm font-semibold text-slate-800">
          Spending by Category
        </h2>
        <p className="text-xs text-slate-500">
          No expenses to display. Add expense transactions to see your spending
          distribution.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">
          Spending by Category
        </h2>
        <span className="text-xs text-slate-500">Expenses only</span>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                formatCurrency(typeof value === "number" ? value : 0)
              }
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ExpenseChart;
