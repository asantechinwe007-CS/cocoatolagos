"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { exportDocumentReportPDF } from "@/lib/pdf/documentReport";

type Document = {
  id: number;
  farmer_name: string;
  file_name: string;
  file_type: string;
  file_url: string;
};

export default function DocumentReportPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatedAt, setGeneratedAt] = useState("");

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleString());
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();

      if (data.success) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function printReport() {
    window.print();
  }

  async function saveReport() {
    try {
      const res = await fetch("/api/reports/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report_name: "Document Report",
          report_type: "documents",
          generated_by: "Administrator",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Report saved successfully.");
      } else {
        alert("Unable to save report.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-green-400">
            📄 Document Report
          </h1>

          <p className="text-gray-400 mt-2">
            Generated: {generatedAt}
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={printReport}
            className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
          >
            🖨 Print
          </button>

          <button
            onClick={() => exportDocumentReportPDF(documents)}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            📄 Export PDF
          </button>

          <button
            onClick={saveReport}
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            💾 Save Report
          </button>

          <Link
            href="/dashboard/reports"
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            ← Back
          </Link>

        </div>

      </div>

      <div className="bg-[#161b22] rounded-xl p-6 mb-6">

        <h2 className="text-2xl font-semibold mb-4">
          Summary
        </h2>

        <p>
          Total Documents:
          <strong> {documents.length}</strong>
        </p>

      </div>

      <div className="overflow-x-auto bg-[#161b22] rounded-xl">

        <table className="w-full">

          <thead className="bg-green-700">

            <tr>
              <th className="p-3 text-left">Farmer</th>
              <th className="p-3 text-left">Document</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">File URL</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>

            ) : (

              documents.map((document) => (

                <tr
                  key={document.id}
                  className="border-b border-gray-800"
                >

                  <td className="p-3">
                    {document.farmer_name}
                  </td>

                  <td className="p-3">
                    {document.file_name}
                  </td>

                  <td className="p-3">
                    {document.file_type}
                  </td>

                  <td className="p-3">
                    {document.file_url}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}