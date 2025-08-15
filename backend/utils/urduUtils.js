export const generateUrduBill = (bill) => {
  return {
    header: "بلا",
    items: bill.items.map((item) => ({
      name: item.product.urduName,
      quantity: item.quantity,
      weight: item.weight,
      price: item.price,
      total: (item.weight
        ? item.weight * item.price
        : item.quantity * item.price
      ).toFixed(2),
    })),
    total: bill.total.toFixed(2),
    footer: "شکریہ! دوبارہ تشریف لائیں",
  };
};
