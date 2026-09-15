interface Props {
  params: Promise<{
    batchId: string;
  }>;
}

async function getQR(batchId: string) {
  const res = await fetch(
    `http://localhost:3000/api/qrcode?batchId=${batchId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to generate QR code");
  }

  return res.json();
}

export default async function QRPage({
  params,
}: Props) {
  const { batchId } = await params;

  const result = await getQR(batchId);

  if (!result.success) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Failed to generate QR Code
        </h1>

        <p className="mt-4">{result.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">

        <h1 className="text-3xl font-bold mb-6">
          📱 CocoaPass QR Code
        </h1>

        <p className="text-gray-600 mb-4">
          Batch ID: <strong>{batchId}</strong>
        </p>

        <img
          src={result.qrCode}
          alt="QR Code"
          className="mx-auto w-72 h-72 border rounded-xl"
        />

        <div className="mt-6">
          <p className="font-semibold mb-2">
            Passport URL
          </p>

          <a
            href={result.passportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {result.passportUrl}
          </a>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href={result.qrCode}
            download={`batch-${batchId}-qr.png`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            ⬇ Download QR Code
          </a>
        </div>

      </div>
    </main>
  );
}