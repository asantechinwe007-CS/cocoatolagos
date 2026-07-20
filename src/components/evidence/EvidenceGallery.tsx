"use client";

import { useEffect, useState } from "react";

type Evidence = {
  id: number;
  shipment_id: number;
  batch_code: string;
  file_name: string;
  file_path: string;
  uploaded_by: number;
  created_at: string;
};

export default function EvidenceGallery() {
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function loadEvidence() {
    try {
      const res = await fetch("/api/evidence");
      const data = await res.json();

      if (data.success) {
        setEvidence(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvidence();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#161b22] rounded-2xl p-6 text-center text-gray-400">
        Loading evidence...
      </div>
    );
  }

  if (evidence.length === 0) {
    return (
      <div className="bg-[#161b22] rounded-2xl p-6 text-center text-gray-400">
        No evidence uploaded yet.
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#161b22] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          📷 Shipment Evidence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidence.map((item) => (
            <div
              key={item.id}
              className="bg-[#0d1117] rounded-xl overflow-hidden border border-gray-700"
            >
              <img
                src={item.file_path}
                alt={item.file_name}
                className="w-full h-56 object-cover cursor-pointer hover:scale-105 transition"
                onClick={() => setSelectedImage(item.file_path)}
              />

              <div className="p-4 text-sm text-gray-300 space-y-2">
                <p>
                  <span className="font-semibold text-white">
                    Batch:
                  </span>{" "}
                  {item.batch_code}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Uploaded By:
                  </span>{" "}
                  Driver #{item.uploaded_by}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Uploaded:
                  </span>{" "}
                  {new Date(item.created_at).toLocaleString()}
                </p>

                <a
                  href={item.file_path}
                  download
                  className="inline-block mt-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selectedImage}
            alt="Evidence"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}