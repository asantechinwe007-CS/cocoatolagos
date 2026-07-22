interface ExportCardProps {
  data: any;
}

export default function ExportCard({
  data,
}: ExportCardProps) {
  const readyForExport =
    data.certification_status === "Certified" &&
    data.batch_status === "Harvested" &&
    data.shipment_status === "Delivered";

  const documentCount = Array.isArray(data.documents)
    ? data.documents.length
    : 0;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          🚢 Export Readiness
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-white text-sm ${
            readyForExport ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {readyForExport ? "READY" : "PENDING"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <p className="text-slate-400 text-sm">Farm Certification</p>
          <p className="text-white font-semibold mt-1">
            {data.certification_status}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Batch Status</p>
          <p className="text-white font-semibold mt-1">
            {data.batch_status}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Shipment Status</p>
          <p className="text-white font-semibold mt-1">
            {data.shipment_status || "Pending"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Passport Number</p>
          <p className="text-white font-semibold mt-1">
            {data.passport_number || "Not Generated"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Supporting Documents</p>
          <p className="text-white font-semibold mt-1">
            {documentCount}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Quality Grade</p>
          <p className="text-white font-semibold mt-1">
            {data.quality_grade}
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-xl bg-slate-900 border border-slate-700 p-4">

        <h3 className="text-white font-semibold mb-3">
          Export Checklist
        </h3>

        <ul className="space-y-2 text-sm text-slate-300">
          <li>
            {data.certification_status === "Certified" ? "✅" : "⏳"} Farm certification
          </li>
          <li>
            {data.passport_number ? "✅" : "⏳"} Cocoa Passport generated
          </li>
          <li>
            {documentCount > 0 ? "✅" : "⏳"} Supporting documents uploaded
          </li>
          <li>
            {readyForExport ? "✅" : "⏳"} Ready for export
          </li>
        </ul>

      </div>

    </div>
  );
}