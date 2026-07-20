"use client";

import Link from "next/link";

interface Batch {
  id: number;
  batch_code: string;
  farmer_name: string;
  weight_kg: number;
  quality_grade: string;
  status: string;
}

interface Props {
  batches: Batch[];
}

export default function BatchTable({ batches }: Props) {
  function badgeColor(status: string) {
    switch (status) {
      case "Harvested":
        return "bg-yellow-500";
      case "In Transit":
        return "bg-blue-600";
      case "Warehouse":
        return "bg-purple-600";
      case "Exported":
      case "Delivered":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  }

  return (
    <div className="bg-[#161b22] rounded-2xl shadow-xl p-6 mt-8 overflow-x-auto">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          📦 Cocoa Batches
        </h2>

        <div className="text-gray-400">
          Total: {batches.length}
        </div>
      </div>

      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-gray-700 text-left">
            <th className="py-4">Batch</th>
            <th>Farmer</th>
            <th>Weight</th>
            <th>Grade</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {batches.map((batch) => (
            <tr
              key={batch.id}
              className="border-b border-gray-800 hover:bg-[#202833] transition"
            >
              <td className="py-5 font-bold text-green-400">
                {batch.batch_code}
              </td>

              <td>{batch.farmer_name}</td>

              <td>{batch.weight_kg} kg</td>

              <td>{batch.quality_grade}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${badgeColor(
                    batch.status
                  )}`}
                >
                  {batch.status}
                </span>
              </td>

              <td>
                <div className="flex gap-2 justify-center">

                  <Link
                    href={`/passport/${batch.id}`}
                    target="_blank"
                    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm"
                  >
                    👁 Passport
                  </Link>
<Link
  href={`/dashboard/qrcode/${batch.id}`}
  target="_blank"
  className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm"
>
  📱 QR
</Link>
                  <button
                    onClick={() => window.print()}
                    className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm"
                  >
                    🖨 Print
                  </button>

                </div>
              </td>
            </tr>
          ))}

          {batches.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-10 text-gray-400"
              >
                No Cocoa Batches Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}