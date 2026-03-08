export type TransactionType = "income" | "expense";

export const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Shopping",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Frequency = "daily" | "weekly" | "monthly" | "yearly";

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string; // ISO format YYYY-MM-DD
  type: TransactionType;
  isRecurring?: boolean;
  frequency?: Frequency;
}

export interface Budget {
  category: Category;
  limit: number;
}

