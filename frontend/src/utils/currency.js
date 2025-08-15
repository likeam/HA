export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("ur-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatUrduCurrency = (amount) => {
  const formatted = formatCurrency(amount);
  return formatted
    .replace("PKR", "روپے")
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};
