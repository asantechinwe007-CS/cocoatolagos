"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { exportExportReportPDF } from "@/lib/pdf/exportReport";

type ExportRecord = {
  id: number;
  exporter_name: string;
  destination_country: string;
  port_of_loading: string;
  container_number: string;
  vessel_name: string;
  export_status: string;
  customs_status: string;
  etd: string;
  eta: string;
};

export default function ExportReportPage() {
  const [exportsData, setExportsData] = useState<ExportRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatedAt, setGeneratedAt] = useState("");

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleString());
    loadExports();
  }, []);

  async function loadExports() {
    try {
      const res = await fetch("/api/exports");
      const data = await res.json();

      if (data.success) {
        setExportsData(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          report_name: "Export Summary",
          report_type: "exports",
          generated_by: "Administrator",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Report saved successfully.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-green-400">
            📊 Export Summary
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
              exportExportReportPDF(
                exportsData.map((item) => ({
                  exporter: item.exporter_name,
                  destination: item.destination_country,
                  total_weight: 0,
                  total_batches: 1,
                  export_date: item.etd,
                }))
              )
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

      <div className="bg-[#161b22] rounded-xl p-6 mb-6">

        <h2 className="text-2xl font-semibold mb-4">
          Summary
        </h2>

        <p>
          Total Exports:
          <strong> {exportsData.length}</strong>
        </p>

      </div>

      <div className="overflow-x-auto bg-[#161b22] rounded-xl">

        <table className="w-full">

          <thead className="bg-green-700">

            <tr>
              <th className="p-3 text-left">Exporter</th>
              <th className="p-3 text-left">Destination</th>
              <th className="p-3 text-left">Port</th>
              <th className="p-3 text-left">Container</th>
              <th className="p-3 text-left">Vessel</th>
              <th className="p-3 text-left">Customs</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={7} className="p-6 text-center">
                  Loading...
                </td>
              </tr>

            ) : (

              exportsData.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-gray-800"
                >

                  <td className="p-3">
                    {item.exporter_name}
                  </td>

                  <td className="p-3">
                    {item.destination_country}
                  </td>

                  <td className="p-3">
                    {item.port_of_loading}
                  </td>

                  <td className="p-3">
                    {item.container_number}
                  </td>

                  <td className="p-3">
                    {item.vessel_name}
                  </td>

                  <td className="p-3">
                    {item.customs_status}
                  </td>

                  <td className="p-3">
                    {item.export_status}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}