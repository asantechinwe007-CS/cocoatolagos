"use client";

import { useEffect, useState } from "react";
import DashboardChart from "@/components/DashboardChart";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalFarms: 0,
    totalBatches: 0,
    totalShipments: 0,
    totalDocuments: 0,
    complianceScore: 0,
    totalWeight: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await fetch("/api/compliance");
      const data = await res.json();

      if (data.success) {
        setStats({
          totalFarms: data.totalFarms || 0,
          totalBatches: data.totalBatches || 0,
          totalShipments: data.totalShipments || 0,
          totalDocuments: data.totalDocuments || 0,
          complianceScore: data.complianceScore || 0,
          totalWeight: data.totalWeight || 1000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="flex-1">
      {/* Header */}
      <div className="border-b border-gray-800 px-10 py-8 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-extrabold text-green-400">
            🍫 CocoaPass
          </h1>

          <p className="text-gray-400 mt-2">
            Chain Visibility & Traceability Platform
          </p>
        </div>

        <div className="bg-green-600 rounded-xl px-6 py-4 shadow-lg">
          <h2 className="font-bold text-xl">
            🟢 EUDR READY
          </h2>

          <p>
            Compliance Score: {stats.complianceScore}%
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 p-10">
        <StatCard
          title="🌱 Farms"
          value={stats.totalFarms}
        />

        <StatCard
          title="📦 Batches"
          value={stats.totalBatches}
        />

        <StatCard
          title="🚚 Shipments"
          value={stats.totalShipments}
        />

        <StatCard
          title="📄 Documents"
          value={stats.totalDocuments}
        />

        <StatCard
          title="⚖ Weight"
          value={stats.totalWeight}
        />

        <StatCard
          title="🟢 Compliance"
          value={`${stats.complianceScore}%`}
          green
        />
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-8 px-10 pb-10">
        <DashboardChart />

        <div className="bg-[#161b22] rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <Activity text="🌱 Farm Registered" />
          <Activity text="📦 Batch Created" />
          <Activity text="🚚 Shipment Registered" />
          <Activity text="📄 Certificate Uploaded" />
          <Activity text="📱 QR Passport Generated" />
          <Activity text="🟢 EUDR Compliance Verified" />
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  green = false,
}: {
  title: string;
  value: string | number;
  green?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl shadow-xl p-6 transition hover:scale-105 ${
        green
          ? "bg-green-600"
          : "bg-[#161b22]"
      }`}
    >
      <p className="text-gray-300">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

function Activity({
  text,
}: {
  text: string;
}) {
  return (
    <div className="bg-[#21262d] border-l-4 border-green-500 rounded-r-xl p-4 mb-4">
      {text}
    </div>
  );
}