// Utility functions for Urdu text manipulation
export const formatUrduNumber = (number) => {
  const urduDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.toString().replace(/\d/g, (digit) => urduDigits[digit]);
};

export const formatCurrency = (amount) => {
  return `Rs ${amount.toFixed(2)}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ur-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
