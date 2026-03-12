import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { messages } from "@/constants/index.js";

export const streamProductPdf = (product, res) => {
  if (!product) throw new Error(messages.PRODUCT_DATA_REQUIRED);

  try {
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${product.productName}.pdf"`);
    doc.pipe(res);

    // product info
    doc.fontSize(20).text(product.productName, { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(product.productDescription);
    doc.moveDown();

    // brands
    let total = 0;

    for (const brand of product.brands) {
      doc.fontSize(12).text(`${brand.brandName} — Rs.${brand.price}`);
      doc.fontSize(10).text(brand.detail);

      const imgPath = path.join(process.cwd(), brand.imageUrl || "");
      if (brand.imageUrl && fs.existsSync(imgPath)) {
        try {
          doc.image(imgPath, { width: 80 });
        } catch {
          /* skip broken images */
        }
      }

      total += brand.price;
      doc.moveDown();
    }

    // total
    doc.moveDown();
    doc.fontSize(14).text(`Total: Rs.${total}`, { align: "right" });

    doc.end();
  } catch (error) {
    throw error;
  }
};
