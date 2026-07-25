import jsPDF from "jspdf";

type ExportSummary = {
  exporter: string;
  destination: string;
  total_weight: number;
  total_batches: number;
  export_date: string;
};

export function exportExportReportPDF(exports: ExportSummary[]) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("COCOAPASS", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(15);
  doc.text("Export Summary", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 15, y);

  y += 15;

  doc.setFontSize(11);

  doc.text("Exporter", 15, y);
  doc.text("Destination", 60, y);
  doc.text("Weight", 120, y);
  doc.text("Batches", 150, y);

  y += 8;

  exports.forEach((item) => {
    if (y > 275) {
      doc.addPage();
      y = 20;

      doc.setFontSize(11);

      doc.text("Exporter", 15, y);
      doc.text("Destination", 60, y);
      doc.text("Weight", 120, y);
      doc.text("Batches", 150, y);

      y += 8;
    }

    doc.setFontSize(10);

    doc.text(item.exporter || "-", 15, y);
    doc.text(item.destination || "-", 60, y);
    doc.text(`${item.total_weight} KG`, 120, y);
    doc.text(String(item.total_batches), 150, y);

    y += 8;
  });

  const totalWeight = exports.reduce(
    (sum, item) => sum + Number(item.total_weight),
    0
  );

  y += 10;

  doc.setFontSize(12);

  doc.text(`Total Exports: ${exports.length}`, 15, y);

  y += 8;

  doc.text(`Total Weight: ${totalWeight} KG`, 15, y);

  doc.save("Export_Summary.pdf");
}