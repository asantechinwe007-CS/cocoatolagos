"use client";

import { useEffect, useState } from "react";

interface Batch {
  id: number;
  batch_code: string;
}

interface Driver {
  id: number;
  full_name: string;
}

interface Props {
  onCreated: () => void;
}

export default function ShipmentForm({ onCreated }: Props) {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    batch_id: "",
    driver_id: "",
    vehicle_id: "",
    current_location: "",
    latitude: "",
    longitude: "",
    temperature: "",
    humidity: "",
    delay_hours: "0",
    delay_reason: "",
    status: "In Transit",
    departure_time: "",
    arrival_time: "",
    estimated_arrival: "",
  });

  useEffect(() => {
    loadBatches();
    loadDrivers();
  }, []);

  async function loadBatches() {
    const res = await fetch("/api/batches");
    const data = await res.json();

    if (data.success) {
      setBatches(data.data);
    }
  }

  async function loadDrivers() {
    const res = await fetch("/api/drivers");
    const data = await res.json();

    if (data.success) {
      setDrivers(data.data);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const res = await fetch("/api/shipments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
  ...form,
  departure_time: form.departure_time || null,
  arrival_time: form.arrival_time || null,
  estimated_arrival: form.estimated_arrival || null,
        batch_id: Number(form.batch_id),
        driver_id: Number(form.driver_id),
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        temperature: Number(form.temperature),
        humidity: Number(form.humidity),
        delay_hours: Number(form.delay_hours),
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Shipment Created");

      setForm({
        batch_id: "",
        driver_id: "",
        vehicle_id: "",
        current_location: "",
        latitude: "",
        longitude: "",
        temperature: "",
        humidity: "",
        delay_hours: "0",
        delay_reason: "",
        status: "In Transit",
        departure_time: "",
        arrival_time: "",
        estimated_arrival: "",
      });

      onCreated();
    } else {
      alert("Failed");
    }

    setSaving(false);
  }

  return (
    <div className="bg-[#161b22] rounded-xl p-6 mb-8">

      <h2 className="text-2xl font-bold text-white mb-5">
        Create Shipment
      </h2>

      <form
        onSubmit={submit}
        className="grid md:grid-cols-2 gap-4"
      >

        <select
          required
          className="p-3 rounded bg-[#21262d] text-white"
          value={form.batch_id}
          onChange={(e) =>
            setForm({ ...form, batch_id: e.target.value })
          }
        >
          <option value="">Select Batch</option>

          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.batch_code}
            </option>
          ))}
        </select>

        <select
          required
          className="p-3 rounded bg-[#21262d] text-white"
          value={form.driver_id}
          onChange={(e) =>
            setForm({ ...form, driver_id: e.target.value })
          }
        >
          <option value="">Select Driver</option>

          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.full_name}
            </option>
          ))}
        </select>

        <input
          placeholder="Vehicle ID"
          className="p-3 rounded bg-[#21262d] text-white"
          value={form.vehicle_id}
          onChange={(e) =>
            setForm({ ...form, vehicle_id: e.target.value })
          }
        />

        <input
          placeholder="Current Location"
          className="p-3 rounded bg-[#21262d] text-white"
          value={form.current_location}
          onChange={(e) =>
            setForm({
              ...form,
              current_location: e.target.value,
            })
          }
        />

        <input
          type="number"
          step="0.00000001"
          placeholder="Latitude"
          className="p-3 rounded bg-[#21262d] text-white"
          value={form.latitude}
          onChange={(e) =>
            setForm({ ...form, latitude: e.target.value })
          }
        />

        <input
          type="number"
          step="0.00000001"
          placeholder="Longitude"
          className="p-3 rounded bg-[#21262d] text-white"
          value={form.longitude}
          onChange={(e) =>
            setForm({ ...form, longitude: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Temperature (°C)"
          className="p-3 rounded bg-[#21262d] text-white"
          value={form.temperature}
          onChange={(e) =>
            setForm({
              ...form,
              temperature: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Humidity (%)"
          className="p-3 rounded bg-[#21262d] text-white"
          value={form.humidity}
          onChange={(e) =>
            setForm({
              ...form,
              humidity: e.target.value,
            })
          }
        />

        <button
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 p-3 rounded text-white font-bold md:col-span-2"
        >
          {saving ? "Saving..." : "Create Shipment"}
        </button>

      </form>

    </div>
  );
}