"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ExportRecord {
  id: number;
  shipment_id: number;
  exporter_name: string;
  exporter_id: string;
  destination_country: string;
  port_of_loading: string;
  container_number: string;
  vessel_name: string;
  etd: string;
  eta: string;
  customs_status: string;
  export_status: string;
}

export default function ExportsPage() {
  const [exportsData, setExportsData] = useState<ExportRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExports();
  }, []);

  async function fetchExports() {
    try {
      const res = await fetch("/api/exports");
      const json = await res.json();

      if (json.success) {
        setExportsData(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Export Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage export records, containers and destinations.
          </p>
        </div>

       <Link
  href="/dashboard/exports/new"
  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg text-white font-semibold"
>
  + New Export
</Link>

      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="text-left p-4">Container</th>

              <th className="text-left p-4">Exporter</th>

              <th className="text-left p-4">Destination</th>

              <th className="text-left p-4">Shipment</th>

              <th className="text-left p-4">Vessel</th>

              <th className="text-left p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-slate-400"
                >
                  Loading exports...
                </td>
              </tr>

            ) : exportsData.length === 0 ? (

              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-slate-400"
                >
                  No export records found.
                </td>
              </tr>

            ) : (

              exportsData.map((item) => (

                <tr
                  key={item.id}
                  className="border-t border-slate-700 hover:bg-slate-700/30"
                >

                  <td className="p-4 font-medium text-white">
                    {item.container_number}
                  </td>

                  <td className="p-4">
                    {item.exporter_name}
                  </td>

                  <td className="p-4">
                    {item.destination_country}
                  </td>

                  <td className="p-4">
                    #{item.shipment_id}
                  </td>

                  <td className="p-4">
                    {item.vessel_name}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.export_status === "Exported"
                          ? "bg-green-600"
                          : item.export_status === "Preparing"
                          ? "bg-yellow-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {item.export_status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </main>
  );
}