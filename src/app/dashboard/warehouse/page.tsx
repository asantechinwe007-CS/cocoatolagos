"use client";

import { useEffect, useState } from "react";

import WarehouseHeader from "@/components/warehouse/WarehouseHeader";
import SectionCard from "@/components/ui/SectionCard";
import StatusBadge from "@/components/ui/StatusBadge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

type Shipment = {
  id: number;
  batch_code: string;
  driver_name: string;
  driver_id: number;
  vehicle_id: string;
  weight_kg: number;
  status: string;
};

export default function WarehousePage() {
  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    loadShipment();
  }, []);

  async function loadShipment() {
    try {
      const res = await fetch("/api/shipments/pending");
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        setShipment(data.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">

      <div className="max-w-7xl mx-auto">

        <WarehouseHeader
          today={12}
          pending={3}
          accepted={9}
        />

        <div className="grid lg:grid-cols-2 gap-6">

          <SectionCard
            title="Incoming Shipment"
            icon="🚚"
          >
            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-400">Batch</span>
                <span className="font-semibold">
            {shipment?.batch_code || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Driver</span>
                <span className="font-semibold">
             {shipment?.driver_name || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Vehicle</span>
                <span className="font-semibold">
             {shipment?.vehicle_id || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Current Weight</span>
                <span className="font-semibold">
             {shipment ? `${shipment.weight_kg} KG` : "-"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
<StatusBadge status={shipment?.status || "Pending"} />
              </div>

            </div>
          </SectionCard>

          <SectionCard
            title="Warehouse Inspection"
            icon="🏭"
          >
            <div className="space-y-4">

              <input
                className="w-full rounded-xl bg-[#0d1117] border border-gray-700 p-3"
                placeholder="Received Weight (KG)"
              />

              <select className="w-full rounded-xl bg-[#0d1117] border border-gray-700 p-3">
  <option>Grade 1</option>
  <option>Grade 2</option>
  <option>Grade 3</option>
</select>
              <input
                className="w-full rounded-xl bg-[#0d1117] border border-gray-700 p-3"
                placeholder="Warehouse"
              />

              <input
                className="w-full rounded-xl bg-[#0d1117] border border-gray-700 p-3"
                placeholder="Storage Bay"
              />

              <select className="w-full rounded-xl bg-[#0d1117] border border-gray-700 p-3">
                <option>Good</option>
                <option>Damaged</option>
                <option>Wet</option>
                <option>Rejected</option>
              </select>

              <textarea
                rows={4}
                className="w-full rounded-xl bg-[#0d1117] border border-gray-700 p-3"
                placeholder="Inspection remarks..."
              />

            </div>
          </SectionCard>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <SecondaryButton>
            Reject Shipment
          </SecondaryButton>

          <PrimaryButton>
            Accept Shipment
          </PrimaryButton>

        </div>

      </div>

    </div>
  );
}