import type {
  Budget,
  Category,
  Frequency,
  Transaction,
  TransactionType,
} from "./index";

/** Props for the top-level summary cards on the dashboard. */
export interface DashboardCardsProps {
  income: number;
  expenses: number;
  balance: number;
  budgetUsagePercent: number;
  totalBudgetLimit: number;
  currency?: { code: string; symbol: string };
}

/** Props for the transaction form component. */
export interface TransactionFormProps {
  onSave(transaction: Transaction): void;
  initialData?: Transaction | null;
  variant?: "card" | "modal";
  submitLabel?: string;
  onCancel?: () => void;
  onSubmitted?: () => void;
}

/** Internal state shape for the transaction form. */
export interface TransactionFormState {
  amount: string;
  category: string;
  description: string;
  date: string;
  type: TransactionType;
  isRecurring: boolean;
  frequency: Frequency;
}

/** Validation error messages for the transaction form. */
export interface TransactionFormErrors {
  amount?: string;
  category?: string;
  description?: string;
  date?: string;
}

/** Props for the transaction list table. */
export interface TransactionListProps {
  transactions: Transaction[];
  onDelete(id: string): void;
  onEdit(transaction: Transaction): void;
  onAddRequest?: () => void;
  filters: {
    search: string;
    date: string;
  };
  onFilterChange: (filters: TransactionListProps["filters"]) => void;
  onExport?: (format: "csv") => void;
  currency?: { code: string; symbol: string };
}

/** Props for the budget tracker component. */
export interface BudgetTrackerProps {
  transactions: Transaction[];
  budgets: Budget[];
  onBudgetChange: (budgets: Budget[]) => void;
  currency?: { code: string; symbol: string };
}

/** Props for the expense chart component. */
export interface ExpenseChartProps {
  transactions: Transaction[];
}

/** Props for the generic modal wrapper. */
export interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}

/** Props for the add-transaction modal shell. */
export interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave(transaction: Transaction): void;
  initialData?: Transaction | null;
}

/** Options passed into the transaction form hook. */
export interface UseTransactionFormOptions {
  onSave(transaction: Transaction): void;
  onSubmitted?: () => void;
  initialData?: Transaction | null;
}

/** Options for the budget tracker hook. */
export interface UseBudgetTrackerOptions {
  transactions: Transaction[];
  budgets: Budget[];
  onBudgetChange(budgets: Budget[]): void;
}

