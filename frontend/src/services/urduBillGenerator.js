export const generateUrduBill = (sale) => {
  // In a real implementation, this would use a PDF generation library
  // For demo purposes, return a simple HTML representation
  const itemsHtml = sale.items
    .map(
      (item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>Rs ${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  return `
    <html>
      <head>
        <title>رسید #${sale.id}</title>
        <style>
          body { font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: right; }
          .total { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>رسید</h1>
        <p>تاریخ: ${new Date().toLocaleDateString("ur-PK")}</p>
        <p>رسید نمبر: #${sale.id}</p>
        
        <table>
          <thead>
            <tr>
              <th>اشیا</th>
              <th>مقدار</th>
              <th>قیمت</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        
        <p class="total">کل رقم: Rs ${sale.total.toFixed(2)}</p>
        <p>شکریہ! دوبارہ تشریف لائیں</p>
      </body>
    </html>
  `;
};
