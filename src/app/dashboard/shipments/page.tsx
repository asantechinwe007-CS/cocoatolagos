"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";

import ShipmentForm from "@/components/shipment/ShipmentForm";
import ShipmentTable from "@/components/shipment/ShipmentTable";

interface Shipment {
  id: number;
  batch_code: string;
  driver_name?: string;
  vehicle_id: string;
  current_location: string;
  latitude?: number;
  longitude?: number;
  status: string;
  temperature: number;
  humidity: number;
  delay_hours: number;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadShipments() {
    try {
      const res = await fetch("/api/shipments");
      const data = await res.json();

      if (data.success) {
        setShipments(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadShipments();

    const interval = setInterval(loadShipments, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] p-8">

      <PageHeader
        title="Live Shipment Operations"
        subtitle="Real-time monitoring of cocoa shipments"
      />

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Shipments"
          value={shipments.length}
        />

        <StatCard
          title="In Transit"
          value={
            shipments.filter(
              (s) => s.status === "In Transit"
            ).length
          }
        />

        <StatCard
          title="Delivered"
          value={
            shipments.filter(
              (s) => s.status === "Delivered"
            ).length
          }
        />

        <StatCard
          title="Delayed"
          value={
            shipments.filter(
              (s) => Number(s.delay_hours) > 0
            ).length
          }
        />

      </div>

      <ShipmentForm onCreated={loadShipments} />

      {loading ? (
        <p className="text-white mt-8">
          Loading live shipments...
        </p>
      ) : (
        <ShipmentTable shipments={shipments} />
      )}

    </div>
  );
}