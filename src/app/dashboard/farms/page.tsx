"use client";

import { useEffect, useMemo, useState } from "react";

interface Farm {
  id: number;
  farmer_name: string;
  phone: string;
  village: string;
  state: string;
  latitude: number;
  longitude: number;
  farm_size: number;
  certification_status: string;
}

export default function FarmsDashboard() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    farmer_name: "",
    phone: "",
    village: "",
    state: "",
    latitude: "",
    longitude: "",
    farm_size: "",
    certification_status: "Pending",
  });

  useEffect(() => {
    fetchFarms();
  }, []);

  async function fetchFarms() {
    setLoading(true);

    try {
      const res = await fetch("/api/farms");
      const data = await res.json();

      if (data.success) {
        setFarms(data.data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function registerFarm(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const res = await fetch("/api/farms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        farm_size: Number(form.farm_size),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("✅ Farm registered successfully");

      setForm({
        farmer_name: "",
        phone: "",
        village: "",
        state: "",
        latitude: "",
        longitude: "",
        farm_size: "",
        certification_status: "Pending",
      });

      fetchFarms();
    } else {
      setMessage("❌ Failed to register farm");
    }

    setSaving(false);
  }

  const filtered = useMemo(() => {
    return farms.filter((farm) =>
      (
        farm.farmer_name +
        farm.village +
        farm.state
      )
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [farms, search]);

  return (
    <main className="min-h-screen bg-[#0d1117] text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        🌱 Farm Management
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        <div className="bg-[#161b22] rounded-xl p-6 shadow-lg">

          <h2 className="text-2xl font-semibold mb-5">
            Register New Farm
          </h2>

          <form
            onSubmit={registerFarm}
            className="space-y-4"
          >

            <input
              className="w-full p-3 rounded bg-[#21262d]"
              placeholder="Farmer Name"
              value={form.farmer_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  farmer_name: e.target.value,
                })
              }
              required
            />

            <input
              className="w-full p-3 rounded bg-[#21262d]"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />

            <input
              className="w-full p-3 rounded bg-[#21262d]"
              placeholder="Village"
              value={form.village}
              onChange={(e) =>
                setForm({
                  ...form,
                  village: e.target.value,
                })
              }
              required
            />

            <input
              className="w-full p-3 rounded bg-[#21262d]"
              placeholder="State"
              value={form.state}
              onChange={(e) =>
                setForm({
                  ...form,
                  state: e.target.value,
                })
              }
              required
            />

            <input
              type="number"
              step="0.000001"
              className="w-full p-3 rounded bg-[#21262d]"
              placeholder="Latitude"
              value={form.latitude}
              onChange={(e) =>
                setForm({
                  ...form,
                  latitude: e.target.value,
                })
              }
            />

            <input
              type="number"
              step="0.000001"
              className="w-full p-3 rounded bg-[#21262d]"
              placeholder="Longitude"
              value={form.longitude}
              onChange={(e) =>
                setForm({
                  ...form,
                  longitude: e.target.value,
                })
              }
            />

            <input
              type="number"
              step="0.1"
              className="w-full p-3 rounded bg-[#21262d]"
              placeholder="Farm Size (ha)"
              value={form.farm_size}
              onChange={(e) =>
                setForm({
                  ...form,
                  farm_size: e.target.value,
                })
              }
            />

            <select
              className="w-full p-3 rounded bg-[#21262d]"
              value={form.certification_status}
              onChange={(e) =>
                setForm({
                  ...form,
                  certification_status: e.target.value,
                })
              }
            >
              <option>Pending</option>
              <option>Certified</option>
              <option>Rejected</option>
            </select>

            <button
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-bold"
            >
              {saving ? "Saving..." : "Register Farm"}
            </button>

            {message && (
              <p className="text-green-400">
                {message}
              </p>
            )}

          </form>

        </div>

        <div className="bg-[#161b22] rounded-xl p-6 shadow-lg">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-semibold">
              Registered Farms
            </h2>

            <span className="bg-green-700 px-3 py-1 rounded-full">
              {filtered.length}
            </span>

          </div>

          <input
            placeholder="Search..."
            className="w-full p-3 rounded bg-[#21262d] mb-5"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-gray-700">

                    <th className="text-left p-3">
                      Farmer
                    </th>

                    <th className="text-left p-3">
                      Village
                    </th>

                    <th className="text-left p-3">
                      State
                    </th>

                    <th className="text-left p-3">
                      Size
                    </th>

                    <th className="text-left p-3">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filtered.map((farm) => (

                    <tr
                      key={farm.id}
                      className="border-b border-gray-800 hover:bg-[#21262d]"
                    >

                      <td className="p-3">
                        {farm.farmer_name}
                      </td>

                      <td className="p-3">
                        {farm.village}
                      </td>

                      <td className="p-3">
                        {farm.state}
                      </td>

                      <td className="p-3">
                        {farm.farm_size} ha
                      </td>

                      <td className="p-3">
                        <span className="bg-yellow-700 px-2 py-1 rounded">
                          {farm.certification_status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}