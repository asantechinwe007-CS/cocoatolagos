"use client";

import { useState } from "react";

interface BuyerSearchProps {
  onResult: (data: any) => void;
}

export default function BuyerSearch({
  onResult,
}: BuyerSearchProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!code.trim()) {
      setError("Enter a Passport Number, Batch Code or Shipment ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/buyer/verify?code=${encodeURIComponent(code)}`
      );

      const json = await res.json();

      if (!json.success) {
        setError(json.message);
        onResult(null);
      } else {
        onResult(json.data);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow">

      <h2 className="text-xl font-bold text-white mb-4">
        Buyer Verification
      </h2>

      <div className="flex gap-3">

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Passport Number / Batch Code / Shipment ID"
          className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-4 py-3 text-white"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-6 rounded-lg text-white font-semibold"
        >
          {loading ? "Searching..." : "Verify"}
        </button>

      </div>

      {error && (
        <p className="text-red-400 mt-4">
          {error}
        </p>
      )}

    </div>
  );
}