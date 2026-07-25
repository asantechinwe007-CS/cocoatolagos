import jsPDF from "jspdf";

type Farm = {
  farmer_name: string;
  village: string;
  state: string;
  farm_size: string;
  certification_status: string;
};

export function exportFarmReportPDF(farms: Farm[]) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("COCOAPASS", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(15);
  doc.text("Farm Report", 105, y, { align: "center" });

  y += 10;

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 15, y);

  y += 15;

  doc.setFontSize(12);

  doc.text("Farmer", 15, y);
  doc.text("Village", 65, y);
  doc.text("State", 105, y);
  doc.text("Size", 135, y);
  doc.text("Status", 165, y);

  y += 8;

  farms.forEach((farm) => {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(10);

    doc.text(farm.farmer_name, 15, y);
    doc.text(farm.village, 65, y);
    doc.text(farm.state, 105, y);
    doc.text(`${farm.farm_size} ha`, 135, y);
    doc.text(farm.certification_status, 165, y);

    y += 8;
  });

  y += 10;

  doc.setFontSize(12);

  doc.text(`Total Farms: ${farms.length}`, 15, y);

  y += 8;

  doc.text(
    `Certified: ${
      farms.filter(
        (f) =>
          f.certification_status.toLowerCase() === "certified"
      ).length
    }`,
    15,
    y
  );

  y += 8;

  doc.text(
    `Pending: ${
      farms.filter(
        (f) =>
          f.certification_status.toLowerCase() !== "certified"
      ).length
    }`,
    15,
    y
  );

  doc.save("Farm_Report.pdf");
}