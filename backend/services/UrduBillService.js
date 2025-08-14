import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import path from "path";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

export const generateUrduBill = async (sale) => {
  try {
    // Populate product details
    await sale.populate("items.product");

    const width = 300;
    const height = 400 + sale.items.length * 30;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Setup canvas
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.font = 'bold 16px "Noto Nastaliq Urdu"';
    ctx.textAlign = "right";
    ctx.direction = "rtl";

    // Header
    ctx.fillText("رسید", width - 20, 30);
    ctx.font = '14px "Noto Nastaliq Urdu"';
    ctx.fillText(`تاریخ: ${sale.createdAt.toLocaleString()}`, width - 20, 60);
    ctx.fillText(`رسید نمبر: ${sale._id.toString()}`, width - 20, 90);

    // Items table
    ctx.fillText("تفصیل", width - 20, 120);
    ctx.fillText("مقدار", width - 120, 120);
    ctx.fillText("قیمت", width - 200, 120);

    let yPos = 150;
    sale.items.forEach((item) => {
      ctx.fillText(item.product.name, width - 20, yPos);
      ctx.fillText(item.quantity.toString(), width - 120, yPos);
      ctx.fillText(
        `Rs ${(item.price * item.quantity).toFixed(2)}`,
        width - 200,
        yPos
      );
      yPos += 30;
    });

    // Total
    ctx.font = 'bold 16px "Noto Nastaliq Urdu"';
    ctx.fillText(`کل رقم: Rs ${sale.total.toFixed(2)}`, width - 20, yPos + 30);

    // Footer
    ctx.font = '12px "Noto Nastaliq Urdu"';
    ctx.fillText("شکریہ! دوبارہ تشریف لائیں", width - 20, height - 20);

    // Save to file
    const fileName = `bill_${sale._id}.png`;
    const dirPath = path.join(process.cwd(), "public", "bills");
    const filePath = path.join(dirPath, fileName);

    writeFileSync(filePath, canvas.toBuffer("image/png"));

    return filePath;
  } catch (error) {
    console.error("Error generating Urdu bill:", error);
    throw error;
  }
};
