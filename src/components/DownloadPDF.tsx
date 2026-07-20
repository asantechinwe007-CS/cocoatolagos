"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadPDF() {
  async function downloadPDF() {
    const input = document.getElementById("passport");

    if (!input) {
      alert("Passport section not found.");
      return;
    }

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pageWidth - 20;

    const imgHeight =
      (canvas.height * imgWidth) /
      canvas.width;

    pdf.setFontSize(20);
    pdf.text("CocoaPass Compliance Report", 10, 15);

    pdf.addImage(
      imgData,
      "PNG",
      10,
      25,
      imgWidth,
      imgHeight
    );

    pdf.save("CocoaPass_Report.pdf");
  }

  return (
    <button
      onClick={downloadPDF}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold"
    >
      📄 Download Compliance Report
    </button>
  );
}