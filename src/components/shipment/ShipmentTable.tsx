"use client";
 import Link from "next/link"; 
import { useMemo, useState } from "react";

interface Shipment {
  id: number;
  batch_code: string;
  driver_name?: string;
  vehicle_id: string;
  current_location: string;
  latitude?: number;
  longitude?: number;
  status: string;
  temperature: number;
  humidity: number;
  delay_hours: number;
}

interface Props {
  shipments: Shipment[];
}

export default function ShipmentTable({ shipments }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesSearch =
        shipment.batch_code
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        shipment.vehicle_id
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        shipment.driver_name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        shipment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [shipments, search, statusFilter]);

  function badge(status: string) {
    switch (status) {
      case "In Transit":
        return "bg-blue-600";

      case "Delivered":
        return "bg-green-600";

      case "Delayed":
        return "bg-red-600";

      case "Warehouse":
        return "bg-purple-600";

      default:
        return "bg-gray-600";
    }
  }

  return (
    <div className="bg-[#161b22] rounded-xl shadow-lg p-6 mt-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h2 className="text-2xl font-bold text-white">
          Live Shipment Tracking
        </h2>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search batch, vehicle or driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-white w-72"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option>All</option>
            <option>In Transit</option>
            <option>Delivered</option>
            <option>Delayed</option>
            <option>Warehouse</option>
          </select>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-white">

          <thead>

            <tr className="border-b border-gray-700">

              <th className="text-left py-3">Batch</th>

              <th className="text-left">Driver</th>

              <th className="text-left">Vehicle</th>

              <th className="text-left">Location</th>

              <th className="text-left">Temp</th>

              <th className="text-left">Humidity</th>

              <th className="text-left">Delay</th>

              <th className="text-left">Status</th>

              <th className="text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredShipments.map((shipment) => (

              <tr
                key={shipment.id}
                className="border-b border-gray-800 hover:bg-[#21262d] transition"
              >

                <td className="py-4 font-semibold">
                  {shipment.batch_code}
                </td>

                <td>
                  {shipment.driver_name || "-"}
                </td>

                <td>
                  {shipment.vehicle_id}
                </td>

                <td>
                  {shipment.current_location}
                </td>

                <td>

                  <span className="bg-orange-600 px-3 py-1 rounded-full text-sm">
                    {shipment.temperature}°C
                  </span>

                </td>

                <td>

                  <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm">
                    {shipment.humidity}%
                  </span>

                </td>

                <td>

                  {shipment.delay_hours > 0 ? (
                    <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                      {shipment.delay_hours} hrs
                    </span>
                  ) : (
                    <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                      On Time
                    </span>
                  )}

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${badge(
                      shipment.status
                    )}`}
                  >
                    {shipment.status}
                  </span>

                </td>

               <td>

  <div className="flex flex-wrap gap-2 justify-center">

    <Link
      href={`/dashboard/shipments/${shipment.id}`}
      className="bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded-lg text-sm font-semibold"
    >
      👁 View
    </Link>

    <Link
      href={`/passport/${shipment.id}`}
      target="_blank"
      className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm font-semibold"
    >
      📋 Passport
    </Link>

    <Link
      href={`/api/qrcode?batch_id=${shipment.id}`}
      target="_blank"
      className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm font-semibold"
    >
      📱 QR
    </Link>

    <button
      onClick={() => window.print()}
      className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm font-semibold"
    >
      🖨 Print
    </button>

  </div>

</td>

              </tr>

            ))}

            {filteredShipments.length === 0 && (

              <tr>

                <td
                  colSpan={9}
                  className="text-center py-10 text-gray-400"
                >
                  No shipments found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}