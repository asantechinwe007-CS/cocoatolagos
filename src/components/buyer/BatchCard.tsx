interface BatchCardProps {
  data: any;
}

export default function BatchCard({ data }: BatchCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          📦 Batch Information
        </h2>

        <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm">
          {data.quality_grade}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <p className="text-slate-400 text-sm">Batch Code</p>
          <p className="text-white font-semibold mt-1">
            {data.batch_code}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Weight</p>
          <p className="text-white font-semibold mt-1">
            {data.weight_kg} kg
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Quality Grade</p>
          <p className="text-green-400 font-semibold mt-1">
            {data.quality_grade}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Harvest Date</p>
          <p className="text-white font-semibold mt-1">
            {data.harvest_date || "Not Available"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Moisture</p>
          <p className="text-white font-semibold mt-1">
            {data.moisture_percent ?? "N/A"}%
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Drying Method</p>
          <p className="text-white font-semibold mt-1">
            {data.drying_method || "Not Available"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Expected Grade</p>
          <p className="text-white font-semibold mt-1">
            {data.expected_grade || "Not Available"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Current Status</p>
          <p className="text-green-400 font-semibold mt-1">
            {data.batch_status}
          </p>
        </div>

      </div>

      <div className="mt-6 border border-slate-700 rounded-xl p-4 bg-slate-900">

        <h3 className="text-white font-semibold mb-3">
          Batch Summary
        </h3>

        <ul className="space-y-2 text-slate-300 text-sm">
          <li>• Origin verified from registered farm.</li>
          <li>• Batch linked to Cocoa Passport.</li>
          <li>• Current grade: {data.quality_grade}.</li>
          <li>• Status: {data.batch_status}.</li>
        </ul>

      </div>

    </div>
  );
}