import jsPDF from "jspdf";

type Shipment = {
  batch_code: string;
  driver_name: string;
  vehicle_id: string;
  current_location: string;
  temperature: number;
  humidity: number;
  status: string;
};

export function exportShipmentReportPDF(shipments: Shipment[]) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("COCOAPASS", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(15);
  doc.text("Shipment Report", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 15, y);

  y += 15;

  doc.setFontSize(11);

  doc.text("Batch", 10, y);
  doc.text("Driver", 40, y);
  doc.text("Vehicle", 80, y);
  doc.text("Location", 115, y);
  doc.text("Status", 175, y);

  y += 8;

  shipments.forEach((shipment) => {
    if (y > 275) {
      doc.addPage();
      y = 20;

      doc.setFontSize(11);
      doc.text("Batch", 10, y);
      doc.text("Driver", 40, y);
      doc.text("Vehicle", 80, y);
      doc.text("Location", 115, y);
      doc.text("Status", 175, y);

      y += 8;
    }

    doc.setFontSize(9);

    doc.text(shipment.batch_code || "-", 10, y);
    doc.text(shipment.driver_name || "-", 40, y);
    doc.text(shipment.vehicle_id || "-", 80, y);
    doc.text(shipment.current_location || "-", 115, y);
    doc.text(shipment.status || "-", 175, y);

    y += 7;
  });

  const active = shipments.filter(
    (s) => s.status?.toLowerCase() === "active"
  ).length;

  const completed = shipments.filter(
    (s) => s.status?.toLowerCase() === "completed"
  ).length;

  const delayed = shipments.filter(
    (s) => s.status?.toLowerCase() === "delayed"
  ).length;

  y += 10;

  doc.setFontSize(12);

  doc.text(`Total Shipments: ${shipments.length}`, 15, y);

  y += 8;

  doc.text(`Active: ${active}`, 15, y);

  y += 8;

  doc.text(`Completed: ${completed}`, 15, y);

  y += 8;

  doc.text(`Delayed: ${delayed}`, 15, y);

  doc.save("Shipment_Report.pdf");
}