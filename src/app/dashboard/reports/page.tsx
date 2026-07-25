import Link from "next/link";

export default function ReportsPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-2">
        📈 Reports
      </h1>

      <p className="text-gray-400 mb-8">
        Generate and export CocoaPass operational and compliance reports.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <ReportCard
          title="🌱 Farm Report"
          description="View all registered farms and certification status."
          href="/dashboard/reports/farms"
        />

        <ReportCard
          title="📦 Batch Report"
          description="Track cocoa batches from farm to warehouse."
          href="/dashboard/reports/batches"
        />

        <ReportCard
          title="🚚 Shipment Report"
          description="Review shipment history and logistics."
          href="/dashboard/reports/shipments"
        />

        <ReportCard
          title="📄 Document Report"
          description="View uploaded compliance documents."
          href="/dashboard/reports/documents"
        />

        <ReportCard
          title="🛡️ Compliance Report"
          description="Monitor EUDR compliance across the supply chain."
          href="/dashboard/reports/compliance"
        />

        <ReportCard
          title="📊 Export Summary"
          description="View export statistics and total cocoa volumes."
          href="/dashboard/reports/exports"
        />

      </div>
    </div>
  );
}

function ReportCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="rounded-xl bg-[#161b22] border border-gray-800 p-6 hover:border-green-500 transition">

      <h2 className="text-xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-gray-400">
        {description}
      </p>

      <Link
        href={href}
        className="inline-block mt-6 rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700 transition"
      >
        Generate Report
      </Link>

    </div>
  );
}