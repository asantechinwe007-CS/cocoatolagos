import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white">

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="text-center">

          <h1 className="text-7xl font-black text-green-400">
            🍫 CocoaPass
          </h1>

          <p className="text-2xl text-gray-300 mt-6">
            Chain Visibility & Traceability Platform
          </p>

          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Ensuring farm-to-export transparency for
            Nigerian cocoa exporters through GIS,
            QR Traceability, Digital Passports,
            Compliance Monitoring and Shipment Tracking.
          </p>

          <Link
            href="/dashboard"
            className="inline-block mt-10 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl text-xl font-bold transition"
          >
            🚀 Enter Platform
          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

          <Feature
            icon="🌱"
            title="Farm Registry"
            desc="Register and verify cocoa farms using GPS coordinates."
          />

          <Feature
            icon="📦"
            title="Batch Tracking"
            desc="Track cocoa batches from farm to export."
          />

          <Feature
            icon="🚚"
            title="Shipment Monitoring"
            desc="Monitor logistics and transportation in real time."
          />

          <Feature
            icon="📄"
            title="Compliance"
            desc="EUDR-ready documentation and digital traceability."
          />

        </div>

      </section>

    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-[#161b22] rounded-2xl p-8 shadow-xl hover:scale-105 transition">

      <div className="text-5xl">
        {icon}
      </div>

      <h2 className="text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-gray-400 mt-4">
        {desc}
      </p>

    </div>
  );
}