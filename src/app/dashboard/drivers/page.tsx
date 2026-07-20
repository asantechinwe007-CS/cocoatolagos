"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";

interface Driver {
  id: number;
  full_name: string;
  phone: string;
  license_number: string;
  vehicle_number: string;
  vehicle_type: string;
  status: string;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    license_number: "",
    vehicle_number: "",
    vehicle_type: "",
    status: "Available",
  });

  async function loadDrivers() {
    const res = await fetch("/api/drivers");
    const data = await res.json();

    if (data.success) {
      setDrivers(data.data);
    }
  }

  useEffect(() => {
    loadDrivers();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const res = await fetch("/api/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setForm({
        full_name: "",
        phone: "",
        license_number: "",
        vehicle_number: "",
        vehicle_type: "",
        status: "Available",
      });

      loadDrivers();
    } else {
      alert("Failed to create driver");
    }

    setSaving(false);
  }

  return (
    <div className="p-8 bg-[#0d1117] min-h-screen">

      <PageHeader
        title="Driver Management"
        subtitle="Register and manage transport drivers"
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Drivers"
          value={drivers.length}
        />

        <StatCard
          title="Available"
          value={
            drivers.filter(
              (d) => d.status === "Available"
            ).length
          }
        />

        <StatCard
          title="On Trip"
          value={
            drivers.filter(
              (d) => d.status === "On Trip"
            ).length
          }
        />
      </div>

      <div className="bg-[#161b22] rounded-xl p-6 mb-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Register Driver
        </h2>

        <form
          onSubmit={submit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            placeholder="Full Name"
            className="p-3 rounded bg-[#21262d] text-white"
            value={form.full_name}
            onChange={(e) =>
              setForm({
                ...form,
                full_name: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Phone Number"
            className="p-3 rounded bg-[#21262d] text-white"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="License Number"
            className="p-3 rounded bg-[#21262d] text-white"
            value={form.license_number}
            onChange={(e) =>
              setForm({
                ...form,
                license_number: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Vehicle Number"
            className="p-3 rounded bg-[#21262d] text-white"
            value={form.vehicle_number}
            onChange={(e) =>
              setForm({
                ...form,
                vehicle_number: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Vehicle Type"
            className="p-3 rounded bg-[#21262d] text-white"
            value={form.vehicle_type}
            onChange={(e) =>
              setForm({
                ...form,
                vehicle_type: e.target.value,
              })
            }
            required
          />

          <select
            className="p-3 rounded bg-[#21262d] text-white"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option>Available</option>
            <option>On Trip</option>
            <option>Offline</option>
          </select>

          <button
            className="bg-green-600 hover:bg-green-700 rounded p-3 text-white font-bold md:col-span-2"
            disabled={saving}
          >
            {saving ? "Saving..." : "Register Driver"}
          </button>

        </form>

      </div>

      <div className="bg-[#161b22] rounded-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-5">
          Drivers
        </h2>

        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3">Name</th>
              <th>Phone</th>
              <th>Vehicle</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver) => (
              <tr
                key={driver.id}
                className="border-b border-gray-800"
              >
                <td className="py-4">
                  {driver.full_name}
                </td>

                <td>{driver.phone}</td>

                <td>
                  {driver.vehicle_number}
                </td>

                <td>{driver.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}