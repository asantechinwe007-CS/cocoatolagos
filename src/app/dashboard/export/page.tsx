"use client";

import { useEffect, useState } from "react";


interface ExportLot {
  id: number;
  lot_number: string;
  buyer_name: string;
  destination_country: string;
  destination_port: string;
  container_number: string;
  seal_number: string;
  export_weight: number;
  status: string;
  export_date: string;
}

export default function ExportPage() {
  const [lots, setLots] = useState<ExportLot[]>([]);

  const [form, setForm] = useState({
    lot_number: "",
    warehouse_receipt_id: "",
    buyer_name: "",
    destination_country: "",
    destination_port: "",
    container_number: "",
    seal_number: "",
    export_weight: "",
    export_date: "",
  });

  async function loadLots() {
    const res = await fetch("/api/export");
    const data = await res.json();

    if (data.success) {
      setLots(data.data);
    }
  }

  useEffect(() => {
    loadLots();
  }, []);

  async function createLot() {
    const res = await fetch("/api/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Export Lot Created");

      setForm({
        lot_number: "",
        warehouse_receipt_id: "",
        buyer_name: "",
        destination_country: "",
        destination_port: "",
        container_number: "",
        seal_number: "",
        export_weight: "",
        export_date: "",
      });

      loadLots();
    } else {
      alert(data.message);
    }
  }

 return (
  <main className="flex-1 p-10">
        <h1 className="text-5xl font-extrabold text-green-400">
          🚢 Export Management
        </h1>

        <p className="text-gray-400 mt-2 mb-10">
          Create export lots for international buyers.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <Card title="Export Lots" value={lots.length} />

          <Card
            title="Pending"
            value={
              lots.filter((x) => x.status === "Pending").length
            }
          />

          <Card
            title="Exported"
            value={
              lots.filter((x) => x.status === "Exported").length
            }
          />

          <Card
            title="Total Weight"
            value={
              lots.reduce(
                (sum, x) => sum + Number(x.export_weight),
                0
              ) + " KG"
            }
          />

        </div>

        <div className="bg-[#161b22] rounded-2xl p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Create Export Lot
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <Input
              placeholder="Lot Number"
              value={form.lot_number}
              onChange={(v) =>
                setForm({ ...form, lot_number: v })
              }
            />

            <Input
              placeholder="Warehouse Receipt ID"
              value={form.warehouse_receipt_id}
              onChange={(v) =>
                setForm({
                  ...form,
                  warehouse_receipt_id: v,
                })
              }
            />

            <Input
              placeholder="Buyer Name"
              value={form.buyer_name}
              onChange={(v) =>
                setForm({ ...form, buyer_name: v })
              }
            />

            <Input
              placeholder="Destination Country"
              value={form.destination_country}
              onChange={(v) =>
                setForm({
                  ...form,
                  destination_country: v,
                })
              }
            />

            <Input
              placeholder="Destination Port"
              value={form.destination_port}
              onChange={(v) =>
                setForm({
                  ...form,
                  destination_port: v,
                })
              }
            />

            <Input
              placeholder="Container Number"
              value={form.container_number}
              onChange={(v) =>
                setForm({
                  ...form,
                  container_number: v,
                })
              }
            />

            <Input
              placeholder="Seal Number"
              value={form.seal_number}
              onChange={(v) =>
                setForm({
                  ...form,
                  seal_number: v,
                })
              }
            />

            <Input
              placeholder="Export Weight"
              value={form.export_weight}
              onChange={(v) =>
                setForm({
                  ...form,
                  export_weight: v,
                })
              }
            />

            <Input
              type="date"
              value={form.export_date}
              onChange={(v) =>
                setForm({
                  ...form,
                  export_date: v,
                })
              }
            />

          </div>

          <button
            onClick={createLot}
            className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-bold"
          >
            Create Export Lot
          </button>

        </div>

        <div className="bg-[#161b22] rounded-2xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Export Lots
          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b border-gray-700">

                <th className="py-3">Lot</th>

                <th>Buyer</th>

                <th>Country</th>

                <th>Weight</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {lots.map((lot) => (
                <tr
                  key={lot.id}
                  className="border-b border-gray-800"
                >
                  <td className="py-4">
                    {lot.lot_number}
                  </td>

                  <td>{lot.buyer_name}</td>

                  <td>{lot.destination_country}</td>

                  <td>{lot.export_weight} KG</td>

                  <td>{lot.status}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

          </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-[#161b22] rounded-2xl p-6">
      <p className="text-gray-400">{title}</p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      className="bg-[#0d1117] border border-gray-700 rounded-xl p-4"
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}