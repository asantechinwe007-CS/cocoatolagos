interface ComplianceCardProps {
  data: any;
}

export default function ComplianceCard({
  data,
}: ComplianceCardProps) {
  const hasPassport = !!data.passport_number;
  const hasDocuments =
    Array.isArray(data.documents) && data.documents.length > 0;

  const shipmentDelivered =
    data.shipment_status === "Delivered";

  const certified =
    data.certification_status === "Certified";

  const score =
    [certified, hasPassport, hasDocuments, shipmentDelivered].filter(Boolean)
      .length;

  const compliant = score >= 3;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          🛡️ EUDR Compliance
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-white text-sm ${
            compliant ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {compliant ? "COMPLIANT" : "PENDING"}
        </span>
      </div>

      <div className="space-y-4">

        <div className="flex justify-between border-b border-slate-700 pb-3">
          <span className="text-slate-300">
            Farm Certification
          </span>

          <span className={certified ? "text-green-400" : "text-yellow-400"}>
            {certified ? "✅ Certified" : "⏳ Pending"}
          </span>
        </div>

        <div className="flex justify-between border-b border-slate-700 pb-3">
          <span className="text-slate-300">
            Cocoa Passport
          </span>

          <span className={hasPassport ? "text-green-400" : "text-yellow-400"}>
            {hasPassport ? "✅ Generated" : "⏳ Missing"}
          </span>
        </div>

        <div className="flex justify-between border-b border-slate-700 pb-3">
          <span className="text-slate-300">
            Shipment Status
          </span>

          <span
            className={
              shipmentDelivered ? "text-green-400" : "text-yellow-400"
            }
          >
            {shipmentDelivered ? "✅ Delivered" : data.shipment_status || "Pending"}
          </span>
        </div>

        <div className="flex justify-between border-b border-slate-700 pb-3">
          <span className="text-slate-300">
            Supporting Documents
          </span>

          <span
            className={
              hasDocuments ? "text-green-400" : "text-yellow-400"
            }
          >
            {hasDocuments ? "✅ Uploaded" : "⏳ Missing"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-300 font-semibold">
            Overall Compliance
          </span>

          <span
            className={`text-xl font-bold ${
              compliant ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {compliant ? "VERIFIED" : "PENDING"}
          </span>
        </div>

      </div>

      <div
        className={`mt-6 rounded-xl p-4 border ${
          compliant
            ? "bg-green-900/20 border-green-700"
            : "bg-yellow-900/20 border-yellow-700"
        }`}
      >
        <h3
          className={`font-semibold mb-2 ${
            compliant ? "text-green-400" : "text-yellow-400"
          }`}
        >
          EU Due Diligence Result
        </h3>

        <p className="text-slate-300 text-sm">
          {compliant
            ? "This batch currently satisfies the available traceability requirements recorded in CocoaPass."
            : "This batch is missing one or more records required before it can be considered export ready."}
        </p>
      </div>

    </div>
  );
}