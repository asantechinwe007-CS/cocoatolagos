"use client";

import { useEffect, useState } from "react";

export default function QRPage() {
  const [qr, setQr] = useState("");

  useEffect(() => {
    loadQR();
  }, []);

  async function loadQR() {
    const res = await fetch(
      "/api/qrcode?batchCode=CTL-OND-001"
    );

    const data = await res.json();

    if (data.success) {
      setQr(data.qr);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        CocoaPass QR Code
      </h1>

      {qr && (
        <img
          src={qr}
          alt="QR Code"
          width={300}
        />
      )}
    </main>
  );
}