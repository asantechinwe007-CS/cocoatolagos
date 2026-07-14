import Link from "next/link";

export default function FieldHomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Field Operations
      </h1>

      <div className="grid gap-4">
        <Link
          href="/field/farms/new"
          className="border p-4 rounded"
        >
          Register Farm
        </Link>

        <Link
          href="/field/batches/new"
          className="border p-4 rounded"
        >
          Create Batch
        </Link>

        <Link
          href="/field/shipments/update"
          className="border p-4 rounded"
        >
          Update Shipment
        </Link>

        <Link
          href="/field/documents/upload"
          className="border p-4 rounded"
        >
          Upload Document
        </Link>
      </div>
    </main>
  );
}