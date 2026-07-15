"use client";

import { useEffect, useState } from "react";

interface Document {
  id: number;
  farm_id: number;
  farmer_name: string;
  file_name: string;
  file_type: string;
  file_url: string;
  uploaded_at: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    const res = await fetch("/api/documents");
    const data = await res.json();

    if (data.success) {
      setDocuments(data.data);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Documents Registry
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Farm ID</th>
            <th className="border p-2">Farmer</th>
            <th className="border p-2">Document</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Uploaded</th>
            <th className="border p-2">View</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="border p-2">
                {doc.farm_id}
              </td>

              <td className="border p-2">
                {doc.farmer_name}
              </td>

              <td className="border p-2">
                {doc.file_name}
              </td>

              <td className="border p-2">
                {doc.file_type}
              </td>

              <td className="border p-2">
                {new Date(doc.uploaded_at).toLocaleDateString()}
              </td>

              <td className="border p-2">
                <a
                  href={doc.file_url}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}