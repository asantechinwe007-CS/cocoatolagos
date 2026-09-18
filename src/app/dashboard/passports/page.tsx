"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import QRCodeModal from "@/components/QRCodeModal";

import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";

interface Passport {
  id: number;
  batch_id: number;
  passport_number: string;
  generated_at: string;
  batch_code: string;
  weight_kg: string;
  quality_grade: string;
  status: string;
  farmer_name: string;
}

export default function PassportManagementPage() {
  const [passports, setPassports] = useState<Passport[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showQR, setShowQR] = useState(false);

const [selectedQR, setSelectedQR] = useState({
  qrCode: "",
  passportNumber: "",
  batchCode: "",
  passportUrl: "",
});

  async function loadPassports() {
    try {
      const res = await fetch("/api/passports");
      const data = await res.json();

      if (data.success) {
        setPassports(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPassports();
  }, []);

  const filteredPassports = useMemo(() => {
    return passports.filter((passport) => {
      const keyword = search.toLowerCase();

      return (
        passport.passport_number.toLowerCase().includes(keyword) ||
        passport.batch_code.toLowerCase().includes(keyword) ||
        passport.farmer_name.toLowerCase().includes(keyword)
      );
    });
  }, [passports, search]);

  return (
    <div className="min-h-screen bg-[#0d1117] p-8">

      <PageHeader
        title="Passport Management"
        subtitle="Manage all CocoaPass Digital Passports"
      />

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Passports"
          value={passports.length}
        />

        <StatCard
          title="Grade 1"
          value={
            passports.filter(
              (p) => p.quality_grade === "Grade 1"
            ).length
          }
        />

        <StatCard
          title="Grade 2"
          value={
            passports.filter(
              (p) => p.quality_grade === "Grade 2"
            ).length
          }
        />

        <StatCard
          title="Harvested"
          value={
            passports.filter(
              (p) => p.status === "Harvested"
            ).length
          }
        />

      </div>

      <div className="bg-[#161b22] rounded-xl shadow-lg p-6">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <h2 className="text-2xl font-bold text-white">
            Digital Passports
          </h2>

          <input
            type="text"
            placeholder="Search passport, batch or farmer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 text-white w-full md:w-80"
          />

        </div>

        {loading ? (
          <p className="text-white">
            Loading passports...
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-white">

              <thead>

                <tr className="border-b border-gray-700">

                  <th className="text-left py-4">
                    Passport
                  </th>

                  <th className="text-left">
                    Batch
                  </th>

                  <th className="text-left">
                    Farmer
                  </th>

                  <th className="text-left">
                    Weight
                  </th>

                  <th className="text-left">
                    Grade
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                  <th className="text-left">
                    Generated
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredPassports.map((passport) => (

                  <tr
                    key={passport.id}
                    className="border-b border-gray-800 hover:bg-[#21262d] transition"
                  >

                    <td className="py-4 font-semibold text-green-400">
                      {passport.passport_number}
                    </td>

                    <td>
                      {passport.batch_code}
                    </td>

                    <td>
                      {passport.farmer_name}
                    </td>

                    <td>
                      {passport.weight_kg} kg
                    </td>

                    <td>
                      {passport.quality_grade}
                    </td>

                    <td>

                      <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                        {passport.status}
                      </span>

                    </td>

                    <td>
                      {new Date(
                        passport.generated_at
                      ).toLocaleDateString()}
                    </td>

                    <td>

                      <div className="flex gap-2 justify-center">

                        <Link
                          href={`/passport/${passport.batch_id}`}
                          target="_blank"
                          className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm font-semibold"
                        >
                          👁 View
                        </Link>

<button
  onClick={async () => {
    const res = await fetch(
      `/api/qrcode?batchId=${passport.batch_id}`
    );

    const data = await res.json();

    if (!data.success) {
      alert("Unable to generate QR Code");
      return;
    }

    setSelectedQR({
      qrCode: data.qrCode,
      passportNumber: passport.passport_number,
      batchCode: passport.batch_code,
      passportUrl: data.passportUrl,
    });

    setShowQR(true);
  }}
  className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm font-semibold"
>
  📱 QR
</button>

                        <button
                          onClick={() => window.print()}
                          className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm font-semibold"
                        >
                          🖨 Print
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

                {filteredPassports.length === 0 && (

                  <tr>

                    <td
                      colSpan={8}
                      className="text-center py-10 text-gray-400"
                    >
                      No passports found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>
        )}

      </div>
      <QRCodeModal
  isOpen={showQR}
  onClose={() => setShowQR(false)}
  qrCode={selectedQR.qrCode}
  passportNumber={selectedQR.passportNumber}
  batchCode={selectedQR.batchCode}
  passportUrl={selectedQR.passportUrl}
/>
      </div>


 
  );
}