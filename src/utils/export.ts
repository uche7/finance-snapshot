import type { Transaction } from "../types";

/**
 * Exports transactions to a CSV file and triggers download.
 */
export function exportToCSV(transactions: Transaction[]) {
  const headers = ["ID", "Date", "Description", "Category", "Amount", "Type", "Recurring", "Frequency"];
  const rows = transactions.map((t) => [
    t.id,
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.amount,
    t.type,
    t.isRecurring ? "Yes" : "No",
    t.frequency || "",
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `finance_snapshot_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
