interface BuyerSummaryProps {
  data: any;
}

export default function BuyerSummary({
  data,
}: BuyerSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
        <div className="text-4xl mb-3">📱</div>

        <p className="text-slate-400 text-sm">
          Passport Number
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {data.passport_number || "Not Assigned"}
        </h2>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
        <div className="text-4xl mb-3">📦</div>

        <p className="text-slate-400 text-sm">
          Batch Code
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {data.batch_code}
        </h2>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
        <div className="text-4xl mb-3">🚚</div>

        <p className="text-slate-400 text-sm">
          Shipment ID
        </p>

        <h2 className="text-2xl font-bold text-white mt-2">
          {data.shipment_id}
        </h2>
      </div>

      <div className="bg-slate-800 border border-green-600 rounded-2xl p-6 shadow-lg">
        <div className="text-4xl mb-3">
          {data.certification_status === "Certified" ? "🟢" : "🟡"}
        </div>

        <p className="text-slate-400 text-sm">
          EUDR Status
        </p>

        <h2
          className={`text-2xl font-bold mt-2 ${
            data.certification_status === "Certified"
              ? "text-green-400"
              : "text-yellow-400"
          }`}
        >
          {data.certification_status === "Certified"
            ? "VERIFIED"
            : "PENDING"}
        </h2>
      </div>

    </div>
  );
}