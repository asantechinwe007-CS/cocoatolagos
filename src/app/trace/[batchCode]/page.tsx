import DownloadPDF from "@/components/DownloadPDF";
interface Props {
  params: Promise<{
    batchCode: string;
  }>;
}

async function getTraceData(
  batchCode: string
) {
  const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://cocoapass-ashy.vercel.app";

  const res = await fetch(
  `${baseUrl}/api/trace?batchCode=${batchCode}`,
  {
    cache: "no-store",
  }
);

  return res.json();
}

export default async function TracePage({
  params,
}: Props) {
  const { batchCode } =
    await params;

  const result =
    await getTraceData(batchCode);

  if (!result.success) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold">
          Batch Not Found
        </h1>
      </main>
    );
  }

const batch = result.data;
const documents = result.documents || [];
const timeline = result.timeline || [];
let complianceStatus = "🔴 Not Compliant";

if (
  documents.length > 0 &&
  batch.vehicle_id
) {
  complianceStatus =
    "🟢 EUDR Ready";
} else if (
  documents.length > 0
) {
  complianceStatus =
    "🟡 Missing Shipment Data";
}
  return (
   <main
  id="passport"
  className="max-w-3xl mx-auto p-6 bg-[#0d1117] text-white min-h-screen"
>


      <h1 className="text-4xl font-bold mb-6">
  
         CocoaPass Traceability Passport
      
      </h1>
      <div className="mb-6">
  <DownloadPDF />
</div>
<div className="mb-6">
  <span className="border rounded px-4 py-2 text-lg font-bold">
    {complianceStatus}
  </span>
</div>
<div className="bg-[#161b22] rounded-2xl p-6 space-y-4 shadow-xl">
        <p>
          <strong>Farmer:</strong>{" "}
          {batch.farmer_name}
        </p>

        <p>
          <strong>Village:</strong>{" "}
          {batch.village}
        </p>

        <p>
          <strong>State:</strong>{" "}
          {batch.state}
        </p>

        <hr />

        <p>
          <strong>Batch Code:</strong>{" "}
          {batch.batch_code}
        </p>

        <p>
          <strong>Weight:</strong>{" "}
          {batch.weight_kg} kg
        </p>

        <p>
          <strong>Grade:</strong>{" "}
          {batch.quality_grade}
        </p>

        <hr />

        <p>
          <strong>Vehicle:</strong>{" "}
          {batch.vehicle_id}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {batch.current_location}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {batch.status}
        </p>
<hr />

<h2 className="text-2xl font-bold mt-6">
  Documents
</h2>

{documents.length === 0 ? (
  <p>No documents uploaded</p>
) : (
  <div className="space-y-2 mt-3">
    {documents.map((doc: any) => (
      <div
        key={doc.id}
        className="border rounded p-3"
      >
        <a
          href={doc.file_url}
          target="_blank"
          className="text-blue-600 underline"
        >
          📄 {doc.file_name}
        </a>

        <p className="text-sm text-gray-500">
          {doc.file_type}
        </p>
      </div>
    ))}
  </div>
)}
<hr />

<h2 className="text-2xl font-bold mt-8 mb-4">
  Traceability Timeline
</h2>

<div className="space-y-3">

  {timeline.map(
    (
      item: any,
      index: number
    ) => (
      <div
        key={index}
        className="border rounded p-3"
      >
        <p className="font-semibold">
          🟢 {item.event}
        </p>

        <p className="text-sm text-gray-500">
          {item.date
            ? new Date(
                item.date
              ).toLocaleString()
            : "N/A"}
        </p>
      </div>
    )
  )}

</div>
      </div>

    </main>
  );
}