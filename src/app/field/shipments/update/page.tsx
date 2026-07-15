"use client";

import { useState } from "react";

export default function ShipmentUpdatePage() {
  const [form, setForm] = useState({
    batch_id: "",
    vehicle_id: "",
    current_location: "",
    status: "",
    departure_time: "",
    arrival_time: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/shipments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        batch_id: Number(form.batch_id),
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Shipment saved successfully!");

      setForm({
        batch_id: "",
        vehicle_id: "",
        current_location: "",
        status: "",
        departure_time: "",
        arrival_time: "",
      });
    } else {
      alert("Failed to save shipment");
    }
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Shipment Update
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="number"
          placeholder="Batch ID"
          value={form.batch_id}
          onChange={(e) =>
            setForm({ ...form, batch_id: e.target.value })
          }
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Vehicle ID"
          value={form.vehicle_id}
          onChange={(e) =>
            setForm({ ...form, vehicle_id: e.target.value })
          }
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Current Location"
          value={form.current_location}
          onChange={(e) =>
            setForm({
              ...form,
              current_location: e.target.value,
            })
          }
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Status"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
          className="border p-2 w-full"
          required
        />

        <input
          type="datetime-local"
          value={form.departure_time}
          onChange={(e) =>
            setForm({
              ...form,
              departure_time: e.target.value,
            })
          }
          className="border p-2 w-full"
        />

        <input
          type="datetime-local"
          value={form.arrival_time}
          onChange={(e) =>
            setForm({
              ...form,
              arrival_time: e.target.value,
            })
          }
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Shipment
        </button>
      </form>
    </main>
  );
}