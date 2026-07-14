import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">
        CocoaToLagos
      </h1>

      <p>
        Cocoa Supply Chain Visibility & Traceability Platform
      </p>

      <div className="flex gap-4">
        <Link
          href="/field/home"
          className="bg-green-700 text-white px-6 py-3 rounded"
        >
          Field App
        </Link>

        <Link
          href="/dashboard"
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >
          Union Dashboard
        </Link>
      </div>
    </main>
  );
}