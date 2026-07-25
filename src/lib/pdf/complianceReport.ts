import jsPDF from "jspdf";

type Compliance = {
  farmer_name: string;
  certification_status: string;
  village: string;
  state: string;
};

export function exportComplianceReportPDF(
  compliances: Compliance[]
) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("COCOAPASS", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(15);
  doc.text("Compliance Report", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(10);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    15,
    y
  );

  y += 15;

  doc.setFontSize(11);

  doc.text("Farmer", 15, y);
  doc.text("Village", 70, y);
  doc.text("State", 115, y);
  doc.text("Status", 160, y);

  y += 8;

  compliances.forEach((item) => {

    if (y > 275) {
      doc.addPage();
      y = 20;

      doc.setFontSize(11);
      doc.text("Farmer", 15, y);
      doc.text("Village", 70, y);
      doc.text("State", 115, y);
      doc.text("Status", 160, y);

      y += 8;
    }

    doc.setFontSize(10);

    doc.text(item.farmer_name || "-", 15, y);
    doc.text(item.village || "-", 70, y);
    doc.text(item.state || "-", 115, y);
    doc.text(item.certification_status || "-", 160, y);

    y += 8;
  });

  const certified = compliances.filter(
    (c) =>
      c.certification_status?.toLowerCase() ===
      "certified"
  ).length;

  const pending = compliances.length - certified;

  y += 10;

  doc.setFontSize(12);

  doc.text(
    `Total Farms: ${compliances.length}`,
    15,
    y
  );

  y += 8;

  doc.text(
    `Certified: ${certified}`,
    15,
    y
  );

  y += 8;

  doc.text(
    `Pending: ${pending}`,
    15,
    y
  );

  doc.save("Compliance_Report.pdf");
}