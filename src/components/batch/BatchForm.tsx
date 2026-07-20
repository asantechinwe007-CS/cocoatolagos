"use client";

import { useEffect, useState } from "react";

interface Farm {
  id: number;
  farmer_name: string;
}

interface BatchFormProps {
  onCreated: () => void;
}

export default function BatchForm({
  onCreated,
}: BatchFormProps) {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    farm_id: "",
    batch_code: "",
    weight_kg: "",
    quality_grade: "Grade 1",
    harvest_date: "",
    moisture_percent: "",
    drying_method: "",
    status: "Harvested",
    expected_grade: "Grade 1",
  });

  useEffect(() => {
    loadFarms();
    generateBatchCode();
  }, []);

  async function loadFarms() {
  const res = await fetch("/api/farms");
  const data = await res.json();

  console.log("Farms API Response:", data);

  if (data.success) {
    setFarms(data.data);
  }
}
  function generateBatchCode() {
    const now = new Date();

    const code =
      "CP-" +
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      "-" +
      Math.floor(Math.random() * 9000 + 1000);

    setForm((prev) => ({
      ...prev,
      batch_code: code,
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const res = await fetch("/api/batches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        farm_id: Number(form.farm_id),
        weight_kg: Number(form.weight_kg),
        moisture_percent: Number(
          form.moisture_percent
        ),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage("✅ Batch Created");

      generateBatchCode();

      setForm((prev) => ({
        ...prev,
        farm_id: "",
        weight_kg: "",
        moisture_percent: "",
        harvest_date: "",
        drying_method: "",
      }));

      onCreated();
    } else {
      setMessage("❌ Failed");
    }

    setSaving(false);
  }

  return (
    <div className="bg-[#161b22] rounded-xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6 text-white">
        Register New Batch
      </h2>

      <form
        onSubmit={submit}
        className="space-y-4"
      >

        <select
          className="w-full p-3 rounded bg-[#21262d] text-white"
          value={form.farm_id}
          onChange={(e) =>
            setForm({
              ...form,
              farm_id: e.target.value,
            })
          }
          required
        >
          <option value="">
            Select Farm
          </option>

          {farms.map((farm) => (
            <option
              key={farm.id}
              value={farm.id}
            >
              {farm.farmer_name}
            </option>
          ))}
        </select>

        <input
          className="w-full p-3 rounded bg-[#21262d] text-white"
          value={form.batch_code}
          readOnly
        />

        <input
          type="number"
          step="0.01"
          placeholder="Weight (kg)"
          className="w-full p-3 rounded bg-[#21262d] text-white"
          value={form.weight_kg}
          onChange={(e) =>
            setForm({
              ...form,
              weight_kg: e.target.value,
            })
          }
          required
        />

        <input
          type="date"
          className="w-full p-3 rounded bg-[#21262d] text-white"
          value={form.harvest_date}
          onChange={(e) =>
            setForm({
              ...form,
              harvest_date: e.target.value,
            })
          }
        />

        <input
          type="number"
          step="0.01"
          placeholder="Moisture %"
          className="w-full p-3 rounded bg-[#21262d] text-white"
          value={form.moisture_percent}
          onChange={(e) =>
            setForm({
              ...form,
              moisture_percent:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Drying Method"
          className="w-full p-3 rounded bg-[#21262d] text-white"
          value={form.drying_method}
          onChange={(e) =>
            setForm({
              ...form,
              drying_method:
                e.target.value,
            })
          }
        />

        <select
          className="w-full p-3 rounded bg-[#21262d] text-white"
          value={form.quality_grade}
          onChange={(e) =>
            setForm({
              ...form,
              quality_grade:
                e.target.value,
            })
          }
        >
          <option>Grade 1</option>
          <option>Grade 2</option>
          <option>Grade 3</option>
        </select>

        <button
          disabled={saving}
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-bold text-white"
        >
          {saving
            ? "Saving..."
            : "Create Batch"}
        </button>

        {message && (
          <p className="text-green-400">
            {message}
          </p>
        )}

      </form>

    </div>
  );
}