import jsPDF from "jspdf";

type Document = {
  farmer_name: string;
  file_name: string;
  file_type: string;
  file_url: string;
};

export function exportDocumentReportPDF(documents: Document[]) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("COCOAPASS", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(15);
  doc.text("Document Report", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 15, y);

  y += 15;

  doc.setFontSize(11);

  doc.text("Farmer", 15, y);
  doc.text("Document", 70, y);
  doc.text("Type", 140, y);

  y += 8;

  documents.forEach((document) => {
    if (y > 275) {
      doc.addPage();
      y = 20;

      doc.setFontSize(11);
      doc.text("Farmer", 15, y);
      doc.text("Document", 70, y);
      doc.text("Type", 140, y);

      y += 8;
    }

    doc.setFontSize(10);

    doc.text(document.farmer_name || "-", 15, y);
    doc.text(document.file_name || "-", 70, y);
    doc.text(document.file_type || "-", 140, y);

    y += 8;
  });

  y += 10;

  doc.setFontSize(12);

  doc.text(`Total Documents: ${documents.length}`, 15, y);

  doc.save("Document_Report.pdf");
}