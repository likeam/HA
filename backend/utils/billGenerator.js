import PDFDocument from "pdfkit";
import fs from "fs";
import { generateUrduBill } from "./urduUtils.js";

export const generatePDFBill = (bill, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A7", layout: "portrait" });
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Generate Urdu-formatted bill data
    const urduBill = generateUrduBill(bill);

    // Set Urdu font (requires Noto Nastaliq Urdu font file)
    doc.registerFont("urdu", "./fonts/NotoNastaliqUrdu-Regular.ttf");

    // Bill header
    doc.font("urdu").fontSize(14).text(urduBill.header, { align: "center" });
    doc.moveDown();

    // Bill date
    doc
      .fontSize(10)
      .text(`تاریخ: ${new Date().toLocaleDateString("ur-PK")}`, {
        align: "right",
      });
    doc.moveDown();

    // Bill items
    doc.fontSize(10);
    urduBill.items.forEach((item) => {
      doc.text(`${item.name}`, { align: "right" });
      doc.text(
        `${item.weight ? item.weight + " کلو" : item.quantity + " عدد"}`,
        { align: "left" }
      );
      doc.text(
        `${item.price} x ${item.weight || item.quantity} = ${item.total} روپے`,
        { align: "left" }
      );
      doc.moveDown();
    });

    // Bill total
    doc.fontSize(12).text(`کل رقم: ${urduBill.total} روپے`, { align: "right" });
    doc.moveDown();

    // Footer
    doc.fontSize(10).text(urduBill.footer, { align: "center" });

    doc.end();

    stream.on("finish", resolve);
    stream.on("error", reject);
  });
};

// Simple text bill generator
export const generateTextBill = (bill) => {
  const urduBill = generateUrduBill(bill);
  let text = `${urduBill.header}\n`;
  text += `تاریخ: ${new Date().toLocaleDateString("ur-PK")}\n\n`;

  urduBill.items.forEach((item) => {
    text += `${item.name}\n`;
    text += `مقدار: ${
      item.weight ? item.weight + " کلو" : item.quantity + " عدد"
    }\n`;
    text += `قیمت: ${item.price} x ${item.weight || item.quantity} = ${
      item.total
    } روپے\n\n`;
  });

  text += `کل رقم: ${urduBill.total} روپے\n\n`;
  text += `${urduBill.footer}`;

  return text;
};
