"use client";

import { useEffect, useState } from "react";

export default function CompliancePage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadCompliance();
  }, []);

  async function loadCompliance() {
    const res = await fetch("/api/compliance");
    const data = await res.json();

    if (data.success) {
      setStats(data);
    }
  }

  if (!stats) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">
          Compliance Dashboard
        </h1>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Compliance Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="border p-4 rounded">
          <h2 className="font-bold">Total Farms</h2>
          <p className="text-2xl">
            {stats.totalFarms}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-bold">Total Batches</h2>
          <p className="text-2xl">
            {stats.totalBatches}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-bold">Total Shipments</h2>
          <p className="text-2xl">
            {stats.totalShipments}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-bold">Total Documents</h2>
          <p className="text-2xl">
            {stats.totalDocuments}
          </p>
        </div>

        <div className="border p-4 rounded col-span-2">
          <h2 className="font-bold">
            Compliance Score
          </h2>

          <p className="text-4xl font-bold text-green-600">
            {stats.complianceScore}%
          </p>
        </div>

      </div>
    </main>
  );
}