"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { exportShipmentReportPDF } from "@/lib/pdf/shipmentReport";

type Shipment = {
  id: number;
  batch_code: string;
  driver_name: string;
  vehicle_id: string;
  current_location: string;
  temperature: number;
  humidity: number;
  status: string;
};

export default function ShipmentReportPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatedAt, setGeneratedAt] = useState("");

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleString());
    loadShipments();
  }, []);

  async function loadShipments() {
    try {
      const res = await fetch("/api/shipments");
      const data = await res.json();

      if (data.success) {
        setShipments(data.data);
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
          report_name: "Shipment Report",
          report_type: "shipments",
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

  const active = shipments.filter(
    (s) => s.status?.toLowerCase() === "active"
  ).length;

  const completed = shipments.filter(
    (s) => s.status?.toLowerCase() === "completed"
  ).length;

  const delayed = shipments.filter(
    (s) => s.status?.toLowerCase() === "delayed"
  ).length;

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-green-400">
            🚚 Shipment Report
          </h1>

          <p className="text-gray-400 mt-2">
            Generated: {generatedAt}
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
            onClick={() => exportShipmentReportPDF(shipments)}
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
          Total Shipments:
          <strong> {shipments.length}</strong>
        </p>

        <p>
          Active:
          <strong> {active}</strong>
        </p>

        <p>
          Completed:
          <strong> {completed}</strong>
        </p>

        <p>
          Delayed:
          <strong> {delayed}</strong>
        </p>

      </div>

      <div className="overflow-x-auto bg-[#161b22] rounded-xl">

        <table className="w-full">

          <thead className="bg-green-700">

            <tr>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Driver</th>
              <th className="p-3 text-left">Vehicle</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Temperature</th>
              <th className="p-3 text-left">Humidity</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={7}
                  className="p-6 text-center"
                >
                  Loading...
                </td>

              </tr>

            ) : (

              shipments.map((shipment) => (

                <tr
                  key={shipment.id}
                  className="border-b border-gray-800"
                >

                  <td className="p-3">
                    {shipment.batch_code}
                  </td>

                  <td className="p-3">
                    {shipment.driver_name}
                  </td>

                  <td className="p-3">
                    {shipment.vehicle_id}
                  </td>

                  <td className="p-3">
                    {shipment.current_location}
                  </td>

                  <td className="p-3">
                    {shipment.temperature ?? "-"} °C
                  </td>

                  <td className="p-3">
                    {shipment.humidity ?? "-"} %
                  </td>

                  <td className="p-3">
                    {shipment.status}
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