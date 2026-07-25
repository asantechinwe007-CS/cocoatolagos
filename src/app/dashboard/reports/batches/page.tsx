"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { exportBatchReportPDF } from "@/lib/pdf/batchReport";

type Batch = {
  id: number;
  farmer_name: string;
  batch_code: string;
  weight_kg: number;
  quality_grade: string;
  harvest_date: string;
  status: string;
  expected_grade: string;
};

export default function BatchReportPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
const [generatedAt, setGeneratedAt] = useState("");

 useEffect(() => {
  Generated: {generatedAt}
  loadBatches();
}, []);

  async function loadBatches() {
    try {
      const res = await fetch("/api/batches");
      const data = await res.json();

      if (data.success) {
        setBatches(data.data);
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
          report_name: "Batch Report",
          report_type: "batches",
          generated_by: "Administrator",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Report saved successfully.");
      } else {
        alert("Unable to save report.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  const totalWeight = batches.reduce(
    (sum, batch) => sum + Number(batch.weight_kg),
    0
  );

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-400">
            📦 Batch Report
          </h1>

          <p className="text-gray-400 mt-2">
            Generated: {new Date().toLocaleString()}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={printReport}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
          >
            🖨 Print
          </button>

          <button
            onClick={() => exportBatchReportPDF(batches)}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            📄 Export PDF
          </button>

          <button
            onClick={saveReport}
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            💾 Save Report
          </button>

          <Link
            href="/dashboard/reports"
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
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
          Total Batches: <strong>{batches.length}</strong>
        </p>

        <p>
          Total Weight: <strong>{totalWeight} KG</strong>
        </p>
      </div>

      <div className="overflow-x-auto bg-[#161b22] rounded-xl">
        <table className="w-full">
          <thead className="bg-green-700">
            <tr>
              <th className="p-3 text-left">Farmer</th>
              <th className="p-3 text-left">Batch Code</th>
              <th className="p-3 text-left">Weight</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Harvest Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Expected Grade</th>
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
              batches.map((batch) => (
                <tr
                  key={batch.id}
                  className="border-b border-gray-800"
                >
                  <td className="p-3">
                    {batch.farmer_name}
                  </td>

                  <td className="p-3">
                    {batch.batch_code}
                  </td>

                  <td className="p-3">
                    {batch.weight_kg} KG
                  </td>

                  <td className="p-3">
                    {batch.quality_grade}
                  </td>

                  <td className="p-3">
                    {batch.harvest_date
                      ? new Date(batch.harvest_date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3">
                    {batch.status}
                  </td>

                  <td className="p-3">
                    {batch.expected_grade}
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