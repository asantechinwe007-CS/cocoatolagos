"use client";

import { useEffect, useState } from "react";

interface Shipment {
  id: number;
  vehicle_id: string;
  current_location: string;
  status: string;
  batch_code: string;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    loadShipments();
  }, []);

  async function loadShipments() {
    const res = await fetch("/api/mapshipments");
    const data = await res.json();

    if (data.success) {
      setShipments(data.data);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Shipment Tracking
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Vehicle</th>
            <th className="border p-2">Batch</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td className="border p-2">
                {shipment.vehicle_id}
              </td>

              <td className="border p-2">
                {shipment.batch_code}
              </td>

              <td className="border p-2">
                {shipment.current_location}
              </td>

              <td className="border p-2">
                {shipment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}