import jsPDF from "jspdf";

type Batch = {
  farmer_name: string;
  batch_code: string;
  weight_kg: number;
  quality_grade: string;
  harvest_date: string;
  status: string;
  expected_grade: string;
};

export function exportBatchReportPDF(batches: Batch[]) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("COCOAPASS", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(15);
  doc.text("Batch Report", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 15, y);

  y += 15;

  // Table Header
  doc.setFontSize(12);
  doc.text("Farmer", 15, y);
  doc.text("Batch", 60, y);
  doc.text("Weight", 95, y);
  doc.text("Grade", 125, y);
  doc.text("Status", 165, y);

  y += 8;

  batches.forEach((batch) => {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(10);

    doc.text(batch.farmer_name || "-", 15, y);
    doc.text(batch.batch_code || "-", 60, y);
    doc.text(`${batch.weight_kg} KG`, 95, y);
    doc.text(batch.quality_grade || "-", 125, y);
    doc.text(batch.status || "-", 165, y);

    y += 8;
  });

  const totalWeight = batches.reduce(
    (sum, batch) => sum + Number(batch.weight_kg),
    0
  );

  y += 10;

  doc.setFontSize(12);
  doc.text(`Total Batches: ${batches.length}`, 15, y);

  y += 8;

  doc.text(`Total Weight: ${totalWeight} KG`, 15, y);

  doc.save("Batch_Report.pdf");
}