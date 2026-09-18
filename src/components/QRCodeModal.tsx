"use client";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCode: string;
  passportNumber: string;
  batchCode: string;
  passportUrl: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  qrCode,
  passportNumber,
  batchCode,
  passportUrl,
}: QRCodeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative w-[360px] rounded-2xl bg-[#161b22] shadow-2xl border border-gray-700 p-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white text-center">
          CocoaPass QR Code
        </h2>

        <p className="text-gray-400 text-center mt-2">
          Scan to verify this cocoa passport
        </p>

        <div className="bg-white rounded-xl p-4 mt-6">
          <img
            src={qrCode}
            alt="QR Code"
            className="w-full"
          />
        </div>

        <div className="mt-5 text-sm text-gray-300 space-y-2">
          <p>
            <strong>Passport:</strong> {passportNumber}
          </p>

          <p>
            <strong>Batch:</strong> {batchCode}
          </p>
        </div>

        <a
          href={passportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-5 text-center text-green-400 underline break-all"
        >
          Open Passport
        </a>

        <div className="grid grid-cols-2 gap-3 mt-6">

          <a
            href={qrCode}
            download={`qr-${batchCode}.png`}
            className="text-center bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-white"
          >
            Download
          </a>

          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 rounded-lg py-2 text-white"
          >
            Print
          </button>

        </div>
      </div>
    </div>
  );
}