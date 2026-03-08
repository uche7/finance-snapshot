export function formatCurrency(
  amount: number,
  locale: string = "en-US",
  currency: string = "USD",
  customSymbol?: string,
): string {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);

  // If the browser returns the currency code (like NGN) instead of the symbol (₦),
  // and we have a custom symbol, we manually replace it.
  if (customSymbol && formatted.includes(currency)) {
    return formatted.replace(currency, customSymbol).replace(/\s+/g, "");
  }

  return formatted;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

