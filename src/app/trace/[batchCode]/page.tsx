interface Props {
  params: Promise<{
    batchCode: string;
  }>;
}

async function getTraceData(
  batchCode: string
) {
  const res = await fetch(
    `http://localhost:3000/api/trace?batchCode=${batchCode}`,
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

  return (
    <main className="max-w-3xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-6">
        CocoaPass Traceability Passport
      </h1>

      <div className="border rounded p-6 space-y-3">

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

      </div>

    </main>
  );
}