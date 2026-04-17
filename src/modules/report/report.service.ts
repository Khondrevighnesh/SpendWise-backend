import Expense from "../expense/expense.model";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

// 📄 PDF Report
export const generatePDF = async (user: any, month: string, res: any) => {
  const expenses = await Expense.find({
    userId: user._id
  });

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

  doc.pipe(res);

  doc.fontSize(18).text("Expense Report", { align: "center" });
  doc.moveDown();

  expenses.forEach((exp: any) => {
    doc
      .fontSize(12)
      .text(`${exp.category} - ₹${exp.amount} - ${exp.description || ""}`);
  });

  doc.end();
};

// 📊 Excel Report
export const generateExcel = async (user: any, month: string, res: any) => {
  const expenses = await Expense.find({
    userId: user._id
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Expenses");

  sheet.columns = [
    { header: "Category", key: "category", width: 20 },
    { header: "Amount", key: "amount", width: 15 },
    { header: "Description", key: "description", width: 30 }
  ];

  expenses.forEach((exp: any) => {
    sheet.addRow({
      category: exp.category,
      amount: exp.amount,
      description: exp.description
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=report.xlsx"
  );

  await workbook.xlsx.write(res);
  res.end();
};