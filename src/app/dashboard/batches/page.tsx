"use client";

import { useEffect, useState } from "react";

interface Batch {
  id: number;
  batch_code: string;
  farmer_name: string;
  weight_kg: string;
  quality_grade: string;
}

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    loadBatches();
  }, []);

  async function loadBatches() {
    const res = await fetch("/api/batches");
    const data = await res.json();

    if (data.success) {
      setBatches(data.data);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Batch Registry
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Batch Code</th>
            <th className="border p-2">Farmer</th>
            <th className="border p-2">Weight (kg)</th>
            <th className="border p-2">Grade</th>
          </tr>
        </thead>

        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id}>
              <td className="border p-2">
                {batch.batch_code}
              </td>

              <td className="border p-2">
                {batch.farmer_name}
              </td>

              <td className="border p-2">
                {batch.weight_kg}
              </td>

              <td className="border p-2">
                {batch.quality_grade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}