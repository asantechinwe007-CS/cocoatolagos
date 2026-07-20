"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

export default function DashboardChart() {
  const data = [
    {
      name: "Farms",
      value: 1,
    },
    {
      name: "Batches",
      value: 2,
    },
    {
      name: "Shipments",
      value: 1,
    },
    {
      name: "Documents",
      value: 2,
    },
  ];

  return (
    <div className="bg-[#161b22] rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Platform Statistics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#9ca3af" />
          <Tooltip />

          <Bar
            dataKey="value"
            fill="#22c55e"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}