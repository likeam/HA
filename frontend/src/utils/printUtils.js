export const generatePrintableBill = (bill) => {
  return `
    <div dir="rtl" class="p-4 font-urdu">
      <h2 class="text-center text-2xl font-bold">رسید</h2>
      <p class="text-right">تاریخ: ${new Date(
        bill.createdAt
      ).toLocaleString()}</p>
      
      <table class="w-full mt-4">
        <thead>
          <tr>
            <th class="text-right">نام</th>
            <th class="text-right">مقدار</th>
            <th class="text-right">قیمت</th>
            <th class="text-right">کل</th>
          </tr>
        </thead>
        <tbody>
          ${bill.items
            .map(
              (item) => `
            <tr>
              <td>${item.product.urduName}</td>
              <td>${item.weight ? item.weight + " کلو" : item.quantity}</td>
              <td>${item.price} روپے</td>
              <td>${(item.weight
                ? item.weight * item.price
                : item.quantity * item.price
              ).toFixed(2)} روپے</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      
      <div class="mt-4 text-xl font-bold text-right">
        کل رقم: ${bill.total.toFixed(2)} روپے
      </div>
      <div class="mt-8 text-center">شکریہ!</div>
    </div>
  `;
};
