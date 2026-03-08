# Personal Finance Snapshot

A premium, local-first personal finance tracker that helps users visualize their monthly income and expenses. Track transactions, set budget limits, and see spending distribution at a glance—all with absolute privacy.

## Tech Stack

- **Next.js 15+** – React framework with App Router
- **React 19** – UI library
- **TypeScript** – Type safety
- **Tailwind CSS v4** – Modern, high-performance styling
- **Recharts** – Professional data visualizations
- **localStorage** – Secure, client-side persistence

## Features

- **Dynamic Dashboard** – Real-time summary cards for Income, Expenses, and Balance.
- **Advanced Transactions** – Searchable and filterable transaction list with pagination-less table view.
- **Recurring Payments** – Support for subscriptions and fixed income (Daily, Weekly, Monthly, Yearly).
- **Edit & Manage** – Full CRUD support; easily edit or delete any historic transaction.
- **Budget Tracking** – Category-specific spending limits with visual progress bars and over-budget alerts.
- **Multi-Currency** – Support for USD ($), EUR (€), GBP (£), JPY (¥), and NGN (₦).
- **CSV Export** – One-click export of your financial data for external analysis.
- **Premium UI** – Modern aesthetic featuring glassmorphism, radial gradients, and a subtle dot-pattern background.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  components/     # Modular UI (Modal, TransactionList, BudgetTracker, etc.)
  hooks/          # Logic extraction (useFinanceDashboard, useModal, useLocalStorage)
  utils/          # Formatting, Calculations, and Exports
  types/          # Type definitions and interfaces
app/
  page.tsx        # Dashboard Main Page
  globals.css     # Premium styling tokens and animations
```

---

## Developer Explanation

### What I Built & Choice Rationale
I built a robust financial dashboard focused on **privacy and user experience**.
- **Hook Extraction Method**: I extracted heavy logic from components into custom hooks (like `useModal` and `useFinanceDashboard`). This adheres to the **Single Responsibility Principle**, making the UI components pure "views" and the logic easily testable.
- **Next.js & React 19**: Leveraged for high-speed rendering and modern concurrency features.
- **Local-First Architecture**: By using `localStorage`, I ensured the app works offline and the user's sensitive financial data never leaves their device.
- **Tailwind CSS v4**: Used to create a curated, high-end "glassmorphic" aesthetic that feels more like a premium SaaS product than a simple tracker.

### Key Improvements Made
- **Data Export**: Added the ability to download transaction data as CSV for external use.
- **Advanced Filtering**: Implemented real-time search and date-based filtering for the transaction list.
- **Recurring Transactions**: Added support for monthly subscriptions and fixed income tracking.
- **Transaction Editing**: Enabled the ability to modify existing transactions without deleting them.
- **Multiple Currency Support**: Integrated a dynamic currency switcher with full support for the Naira (₦) symbol.
- **UI/UX Refinement**: Enhanced the visual experience with premium gradients and a subtle dot-pattern background.

### Challenges Faced
- **State Synchronization**: Managing a global currency state that needed to instantly update formatting across complex components like Recharts and deeply nested budget lists.
- **Scroll Management**: Implementing a robust `useModal` hook that handles body scroll locking and restoration correctly, even when transitions overlap.
- **Filter Complexity**: Balancing a single-date filter logic with search functionality to ensure the transaction list stays performant as it grows.

### Approximate Time Spent
Total time spent was approximately **6-8 hours**, covering initial architecture, core feature build-out (Dashboard/Budgets), subsequent refactoring for modularity, and the final "v1" features (Exports, Editing, Recurring payments, and UI polish).
