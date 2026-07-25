"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { exportFarmReportPDF } from "@/lib/pdf/farmReport";

type Farm = {
  id: number;
  farmer_name: string;
  phone: string;
  village: string;
  state: string;
  farm_size: string;
  certification_status: string;
};

export default function FarmReportPage() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarms();
  }, []);

  async function loadFarms() {
    try {
      const res = await fetch("/api/farms");
      const data = await res.json();

      if (data.success) {
        setFarms(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function printReport()
 {
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
        report_name: "Farm Report",
        report_type: "farms",
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

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-green-400">
            🌱 Farm Report
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
  onClick={() => exportFarmReportPDF(farms)}
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

        <p>Total Farms: <strong>{farms.length}</strong></p>

        <p>
          Certified Farms:{" "}
          <strong>
            {
              farms.filter(
                farm =>
                  farm.certification_status.toLowerCase() === "certified"
              ).length
            }
          </strong>
        </p>

        <p>
          Pending Certification:{" "}
          <strong>
            {
              farms.filter(
                farm =>
                  farm.certification_status.toLowerCase() !== "certified"
              ).length
            }
          </strong>
        </p>

      </div>

      <div className="overflow-x-auto bg-[#161b22] rounded-xl">

        <table className="w-full">

          <thead className="bg-green-700">

            <tr>
              <th className="p-3 text-left">Farmer</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Village</th>
              <th className="p-3 text-left">State</th>
              <th className="p-3 text-left">Farm Size</th>
              <th className="p-3 text-left">Certification</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Loading...
                </td>
              </tr>

            ) : (

              farms.map(farm => (

                <tr
                  key={farm.id}
                  className="border-b border-gray-800"
                >
                  <td className="p-3">{farm.farmer_name}</td>
                  <td className="p-3">{farm.phone}</td>
                  <td className="p-3">{farm.village}</td>
                  <td className="p-3">{farm.state}</td>
                  <td className="p-3">{farm.farm_size} ha</td>
                  <td className="p-3">{farm.certification_status}</td>
                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}