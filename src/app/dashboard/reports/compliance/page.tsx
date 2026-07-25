"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { exportComplianceReportPDF } from "@/lib/pdf/complianceReport";

export default function ComplianceReportPage() {
  const [report, setReport] = useState({
    totalFarms: 0,
    totalBatches: 0,
    totalShipments: 0,
    totalDocuments: 0,
    complianceScore: 0,
  });

  const [generatedAt, setGeneratedAt] = useState("");

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleString());
    loadReport();
  }, []);

  async function loadReport() {
    try {
      const res = await fetch("/api/compliance");
      const data = await res.json();

      if (data.success) {
        setReport(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function printReport() {
    window.print();
  }

  async function saveReport() {
    try {
      const res = await fetch("/api/reports/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report_name: "Compliance Report",
          report_type: "compliance",
          generated_by: "Administrator",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Report saved successfully.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-green-400">
            🛡 Compliance Report
          </h1>

          <p className="text-gray-400 mt-2">
            Generated: {generatedAt}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={printReport}
            className="bg-green-600 px-4 py-2 rounded-lg"
          >
            🖨 Print
          </button>

          <button
            onClick={() =>
              exportComplianceReportPDF([
                {
                  farmer_name: `Total Farms: ${report.totalFarms}`,
                  village: `Batches: ${report.totalBatches}`,
                  state: `Shipments: ${report.totalShipments}`,
                  certification_status: `${report.complianceScore}%`,
                },
              ])
            }
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            📄 Export PDF
          </button>

          <button
            onClick={saveReport}
            className="bg-purple-600 px-4 py-2 rounded-lg"
          >
            💾 Save Report
          </button>

          <Link
            href="/dashboard/reports"
            className="bg-gray-700 px-4 py-2 rounded-lg"
          >
            ← Back
          </Link>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <Card
          title="🌱 Farms"
          value={report.totalFarms}
        />

        <Card
          title="📦 Batches"
          value={report.totalBatches}
        />

        <Card
          title="🚚 Shipments"
          value={report.totalShipments}
        />

        <Card
          title="📄 Documents"
          value={report.totalDocuments}
        />

      </div>

      <div className="mt-8 bg-green-700 rounded-xl p-8 text-center">

        <h2 className="text-4xl font-bold">
          Compliance Score
        </h2>

        <p className="text-7xl mt-4 font-black">
          {report.complianceScore}%
        </p>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-[#161b22] rounded-xl p-8 text-center">

      <h2 className="text-xl text-gray-300">
        {title}
      </h2>

      <p className="text-5xl font-bold mt-4">
        {value}
      </p>

    </div>
  );
}