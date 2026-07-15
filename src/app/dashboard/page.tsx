"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalFarms: 0,
    totalBatches: 0,
    totalWeight: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const res = await fetch("/api/dashboard");
    const data = await res.json();

    if (data.success) {
      setStats(data);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6">
        CocoaToLagos Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border rounded p-4">
          <h2 className="text-lg font-bold">Farms</h2>
          <p className="text-3xl">{stats.totalFarms}</p>
        </div>

        <div className="border rounded p-4">
          <h2 className="text-lg font-bold">Batches</h2>
          <p className="text-3xl">{stats.totalBatches}</p>
        </div>

        <div className="border rounded p-4">
          <h2 className="text-lg font-bold">Weight (kg)</h2>
          <p className="text-3xl">{stats.totalWeight}</p>
        </div>
      </div>

      <div className="grid gap-4">
        <Link href="/dashboard/farms" className="border p-4 rounded">
          Farm Registry
        </Link>

        <Link href="/dashboard/batches" className="border p-4 rounded">
          Batch Tracking
        </Link>

        <Link href="/dashboard/shipments" className="border p-4 rounded">
          Shipment Monitoring
        </Link>

        <Link href="/dashboard/compliance" className="border p-4 rounded">
          Compliance Center
        </Link>
      </div>
    </main>
  );
}