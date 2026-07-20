"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PassportData {
  batch_code: string;
  weight_kg: number;
  quality_grade: string;
  harvest_date: string;

  farmer_name: string;
  phone: string;
  village: string;
  state: string;
  latitude: number;
  longitude: number;
  farm_size: number;
  certification_status: string;

  shipment_status: string;
  vehicle_number: string;
  driver_name: string;
  driver_phone: string;
  current_location: string;

  receiver_name: string;
  delivery_condition: string;

  temperature: number;
  humidity: number;

  evidence_count: number;
}

export default function PassportPage() {
  const params = useParams();

  const [passport, setPassport] = useState<PassportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState("");

  async function loadPassport() {
    try {
      const res = await fetch(
        `/api/passport?batch_id=${params.batchCode}`
      );

      const data = await res.json();

      if (data.success) {
        setPassport(data.data);
      }
      const qr = await fetch(`/api/qrcode?batch_id=${params.batchCode}`);
const qrData = await qr.json();

if (qrData.success) {
  setQrCode(qrData.qrCode);
}
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPassport();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-white">
        Loading Digital Passport...
      </div>
    );
  }

  if (!passport) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-red-500">
        Passport not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-[#161b22] rounded-3xl shadow-xl border border-gray-700 overflow-hidden">

        <div className="bg-green-700 text-center py-6">
          <h1 className="text-4xl font-bold text-white">
            COCOAPASS DIGITAL PASSPORT
          </h1>

          <p className="text-green-100 mt-2">
            Farm-to-Export Traceability
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">

          <section className="space-y-4">

            <h2 className="text-2xl text-white font-bold">
              🌱 Farm Information
            </h2>

            <Info label="Farmer" value={passport.farmer_name} />
            <Info label="Village" value={passport.village} />
            <Info label="State" value={passport.state} />
            <Info label="Phone" value={passport.phone} />
            <Info label="Farm Size" value={`${passport.farm_size} ha`} />
            <Info
              label="GPS"
              value={`${passport.latitude}, ${passport.longitude}`}
            />
            <Info
              label="Certification"
              value={passport.certification_status}
            />

          </section>

          <section className="space-y-4">

            <h2 className="text-2xl text-white font-bold">
              📦 Batch Information
            </h2>

            <Info label="Batch Code" value={passport.batch_code} />
            <Info label="Weight" value={`${passport.weight_kg} kg`} />
            <Info label="Grade" value={passport.quality_grade} />
            <Info
              label="Harvest Date"
              value={new Date(passport.harvest_date).toLocaleDateString()}
            />

          </section>

          <section className="space-y-4">

            <h2 className="text-2xl text-white font-bold">
              🚛 Shipment
            </h2>

            <Info label="Driver" value={passport.driver_name} />
            <Info label="Vehicle" value={passport.vehicle_number} />
            <Info label="Location" value={passport.current_location} />
            <Info label="Status" value={passport.shipment_status} />

          </section>

          <section className="space-y-4">

            <h2 className="text-2xl text-white font-bold">
              📋 Delivery
            </h2>

            <Info label="Receiver" value={passport.receiver_name} />
            <Info
              label="Condition"
              value={passport.delivery_condition}
            />
            <Info
              label="Temperature"
              value={`${passport.temperature ?? "-"} °C`}
            />
            <Info
              label="Humidity"
              value={`${passport.humidity ?? "-"} %`}
            />
            <Info
              label="Evidence"
              value={`${passport.evidence_count} Photo(s)`}
            />

          </section>

        </div>

        <div className="border-t border-gray-700 p-8 flex flex-col items-center">

          <div className="bg-white rounded-2xl p-4 shadow-xl">

  {qrCode ? (
    <img
      src={qrCode}
      alt="Passport QR Code"
      className="w-56 h-56"
    />
  ) : (
    <div className="w-56 h-56 flex items-center justify-center text-black">
      Loading QR...
    </div>
  )}

</div>

<p className="mt-4 text-gray-300">
  Scan to verify this cocoa batch.
</p>

          <div className="mt-6 bg-green-700 px-6 py-3 rounded-full text-white font-bold">
            ✅ EUDR TRACEABILITY VERIFIED
          </div>

        </div>

      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="border-b border-gray-700 pb-2">
      <div className="text-sm text-gray-400">
        {label}
      </div>

      <div className="text-white font-semibold">
        {value || "-"}
      </div>
    </div>
  );
}
