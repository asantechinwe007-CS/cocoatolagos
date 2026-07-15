"use client";

import { useEffect, useState } from "react";

export default function FarmsDashboard() {
  const [farms, setFarms] = useState<any[]>([]);

  useEffect(() => {
    fetchFarms();
  }, []);

  async function fetchFarms() {
    const res = await fetch("/api/farms");
    const data = await res.json();

    if (data.success) {
      setFarms(data.data);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Farm Registry
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Farmer</th>
            <th className="p-2">Village</th>
            <th className="p-2">State</th>
            <th className="p-2">Size</th>
            <th className="p-2">Certification</th>
          </tr>
        </thead>

        <tbody>
          {farms.map((farm: any) => (
            <tr key={farm.id} className="border-b">
              <td className="p-2">{farm.farmer_name}</td>
              <td className="p-2">{farm.village}</td>
              <td className="p-2">{farm.state}</td>
              <td className="p-2">{farm.farm_size}</td>
              <td className="p-2">{farm.certification_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}