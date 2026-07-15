"use client";

import { useState } from "react";

export default function UploadDocumentPage() {
  const [farmId, setFarmId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);

    try {
      // Upload file first
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("File upload failed");
        return;
      }

      // Save document record
      const docRes = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farm_id: Number(farmId),
          file_name: file.name,
          file_type: file.type,
          file_url: uploadData.fileUrl,
        }),
      });

      const docData = await docRes.json();

      if (docData.success) {
        alert("Document uploaded successfully");

        setFarmId("");
        setFile(null);
      } else {
        alert("Failed to save document record");
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }

    setLoading(false);
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Upload Evidence Document
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="number"
          placeholder="Farm ID"
          value={farmId}
          onChange={(e) => setFarmId(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </main>
  );
}