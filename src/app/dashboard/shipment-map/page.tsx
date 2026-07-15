"use client";

import dynamic from "next/dynamic";

const ShipmentMap = dynamic(
  () => import("@/components/ShipmentMap"),
  {
    ssr: false,
  }
);

export default function ShipmentMapPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Shipment Tracking Map
      </h1>

      <ShipmentMap shipments={[]} />
    </main>
  );
}