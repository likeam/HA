export const formatUrduNumber = (num) => {
  const urduDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (digit) => urduDigits[digit]);
};

export const translateLabel = (key) => {
  const translations = {
    CATEGORIES: "اقسام",
    SUBCATEGORIES: "ذیلی اقسام",
    PRODUCTS: "مصنوعات",
    POS: "پوائنٹ آف سیل",
    BILLS: "بلز",
    SYNC: "ہم آہنگی",
    WEIGHT: "وزن",
    QUANTITY: "تعداد",
    PRICE: "قیمت",
    TOTAL: "کل",
    PRINT: "پرنٹ",
    REMOVE: "حذف",
    FINALIZE: "بل مکمل کریں",
    OFFLINE: "آف لائن",
    SYNC_NOW: "اب ہم آہنگ کریں",
    LAST_SYNC: "آخری ہم آہنگی",
  };

  return translations[key] || key;
};
