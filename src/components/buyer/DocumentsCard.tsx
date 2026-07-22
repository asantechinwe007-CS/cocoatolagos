interface DocumentsCardProps {
  data: any;
}

export default function DocumentsCard({
  data,
}: DocumentsCardProps) {
  const documents = Array.isArray(data.documents)
    ? data.documents
    : [];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            📄 Supporting Documents
          </h2>

          <p className="text-slate-400 mt-1">
            Documents linked to this farm and cocoa batch.
          </p>
        </div>

        <div className="bg-green-600 px-4 py-2 rounded-lg text-white font-semibold">
          {documents.length} Document{documents.length !== 1 ? "s" : ""}
        </div>

      </div>

      {documents.length === 0 ? (
        <div className="rounded-lg border border-yellow-700 bg-yellow-900/20 p-6 text-yellow-300">
          No supporting documents have been uploaded.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-700">

                <th className="text-left py-3 text-slate-400">
                  Document
                </th>

                <th className="text-left py-3 text-slate-400">
                  Type
                </th>

                <th className="text-left py-3 text-slate-400">
                  Uploaded
                </th>

                <th className="text-right py-3 text-slate-400">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {documents.map((doc: any) => (

                <tr
                  key={doc.id}
                  className="border-b border-slate-700 hover:bg-slate-700/30"
                >

                  <td className="py-4 text-white">
                    {doc.file_name}
                  </td>

                  <td className="py-4 text-slate-300">
                    {doc.file_type || "Unknown"}
                  </td>

                  <td className="py-4 text-slate-300">
                    {doc.uploaded_at
                      ? new Date(doc.uploaded_at).toLocaleString()
                      : "-"}
                  </td>

                  <td className="py-4 text-right">

                    {doc.file_url ? (
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-slate-500">
                        No File
                      </span>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}