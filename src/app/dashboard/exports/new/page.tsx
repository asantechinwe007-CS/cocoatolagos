"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Shipment {
  id: number;
}

export default function NewExportPage() {
  const router = useRouter();

  const [shipments, setShipments] = useState<Shipment[]>([]);

  const [form, setForm] = useState({
    shipment_id: "",
    exporter_name: "",
    exporter_id: "",
    destination_country: "",
    port_of_loading: "",
    container_number: "",
    vessel_name: "",
    etd: "",
    eta: "",
    customs_status: "Pending",
    export_status: "Preparing",
    bill_of_lading: "",
  });

  useEffect(() => {
    loadShipments();
  }, []);

  async function loadShipments() {
    try {
      const res = await fetch("/api/shipments");
      const json = await res.json();

      if (json.success) {
        setShipments(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/exports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        shipment_id: Number(form.shipment_id),
      }),
    });

    const json = await res.json();

    if (json.success) {
      alert("Export created successfully.");
      router.push("/dashboard/exports");
    } else {
      alert(json.message);
    }
  }

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <main className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold text-white mb-8">
        Create Export
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 rounded-xl p-8 space-y-6"
      >

        <select
          name="shipment_id"
          value={form.shipment_id}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
          required
        >
          <option value="">Select Shipment</option>

          {shipments.map((shipment) => (
            <option
              key={shipment.id}
              value={shipment.id}
            >
              Shipment #{shipment.id}
            </option>
          ))}
        </select>

        <input
          name="exporter_name"
          placeholder="Exporter Name"
          value={form.exporter_name}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
          required
        />

        <input
          name="exporter_id"
          placeholder="Exporter ID"
          value={form.exporter_id}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
          required
        />

        <input
          name="destination_country"
          placeholder="Destination Country"
          value={form.destination_country}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
          required
        />

        <input
          name="port_of_loading"
          placeholder="Port of Loading"
          value={form.port_of_loading}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
          required
        />

        <input
          name="container_number"
          placeholder="Container Number"
          value={form.container_number}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
          required
        />

        <input
          name="vessel_name"
          placeholder="Vessel Name"
          value={form.vessel_name}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
        />

        <label className="block text-white">
          ETD
        </label>

        <input
          type="datetime-local"
          name="etd"
          value={form.etd}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
        />

        <label className="block text-white">
          ETA
        </label>

        <input
          type="datetime-local"
          name="eta"
          value={form.eta}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
        />

        <input
          name="bill_of_lading"
          placeholder="Bill of Lading"
          value={form.bill_of_lading}
          onChange={update}
          className="w-full p-3 rounded bg-slate-900"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold"
        >
          Save Export
        </button>

      </form>

    </main>
  );
}