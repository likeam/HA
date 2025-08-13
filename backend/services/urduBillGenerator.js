import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Bill from "../models/Bill.js";
import { formatUrduText } from "../utils/urduFormatters.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateUrduBill = async (billId) => {
  const bill = await Bill.findById(billId).populate({
    path: "items.product",
    model: "Product",
  });

  const templatePath = path.join(__dirname, "../../templates/urduBill.html");
  let html = fs.readFileSync(templatePath, "utf8");

  // Replace placeholders with RTL-formatted Urdu text
  html = html
    .replace(
      "{{DATE}}",
      formatUrduText(new Date(bill.createdAt).toLocaleString())
    )
    .replace("{{ITEMS}}", generateItemsHtml(bill.items))
    .replace("{{TOTAL}}", formatUrduText(bill.total.toFixed(2)));

  return html;
};

const generateItemsHtml = (items) => {
  return items
    .map(
      (item) => `
    <tr>
      <td>${formatUrduText(item.product.name)}</td>
      <td class="text-center">${item.quantity}</td>
      <td class="text-right">${item.price.toFixed(2)}</td>
      <td class="text-right">${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join("");
};
