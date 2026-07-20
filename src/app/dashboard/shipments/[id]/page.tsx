"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Shipment {
  id: number;
  batch_code: string;
  driver_name?: string;
  vehicle_id: string;
  current_location: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  delay_hours: number;
  delay_reason?: string;
  status: string;
  departure_time?: string;
  estimated_arrival?: string;
  delivered_at?: string;
}

export default function ShipmentDetailsPage() {
  const { id } = useParams();

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadShipment() {
    try {
      const res = await fetch("/api/shipments");
      const data = await res.json();

      if (data.success) {
        const item = data.data.find(
          (s: Shipment) => String(s.id) === String(id)
        );

        setShipment(item || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadShipment();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        Loading shipment...
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        Shipment not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] p-8">

      <h1 className="text-4xl font-bold text-white mb-8">
        Shipment Details
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-[#161b22] rounded-xl p-6">

          <h2 className="text-2xl text-white mb-4">
            Shipment Information
          </h2>

          <div className="space-y-3 text-gray-300">

            <p><strong>Batch:</strong> {shipment.batch_code}</p>

            <p><strong>Driver:</strong> {shipment.driver_name || "-"}</p>

            <p><strong>Vehicle:</strong> {shipment.vehicle_id}</p>

            <p><strong>Status:</strong> {shipment.status}</p>

            <p><strong>Location:</strong> {shipment.current_location}</p>

          </div>

        </div>

        <div className="bg-[#161b22] rounded-xl p-6">

          <h2 className="text-2xl text-white mb-4">
            GPS
          </h2>

          <div className="space-y-3 text-gray-300">

            <p><strong>Latitude:</strong> {shipment.latitude}</p>

            <p><strong>Longitude:</strong> {shipment.longitude}</p>

          </div>

        </div>

        <div className="bg-[#161b22] rounded-xl p-6">

          <h2 className="text-2xl text-white mb-4">
            Environment
          </h2>

          <div className="space-y-3 text-gray-300">

            <p><strong>Temperature:</strong> {shipment.temperature} °C</p>

            <p><strong>Humidity:</strong> {shipment.humidity}%</p>

          </div>

        </div>

        <div className="bg-[#161b22] rounded-xl p-6">

          <h2 className="text-2xl text-white mb-4">
            Delay Report
          </h2>

          <div className="space-y-3 text-gray-300">

            <p><strong>Hours:</strong> {shipment.delay_hours}</p>

            <p><strong>Reason:</strong> {shipment.delay_reason || "None"}</p>

          </div>

        </div>

        <div className="bg-[#161b22] rounded-xl p-6 lg:col-span-2">

          <h2 className="text-2xl text-white mb-4">
            Timeline
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-gray-300">

            <div>
              <h3 className="font-bold text-white mb-2">
                Departure
              </h3>

              <p>{shipment.departure_time || "-"}</p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">
                Estimated Arrival
              </h3>

              <p>{shipment.estimated_arrival || "-"}</p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">
                Delivered
              </h3>

              <p>{shipment.delivered_at || "-"}</p>
            </div>

          </div>

        </div>

        <div className="bg-[#161b22] rounded-xl p-6 lg:col-span-2">

          <h2 className="text-2xl text-white mb-4">
            Evidence Gallery
          </h2>

          <p className="text-gray-400">
            Evidence images will be connected in the next step.
          </p>

        </div>

      </div>

    </div>
  );
}