"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import BatchForm from "@/components/batch/BatchForm";
import BatchTable from "@/components/batch/BatchTable";

interface Batch {
  id: number;
  batch_code: string;
  farmer_name: string;
  weight_kg: number;
  quality_grade: string;
  status: string;
}

export default function BatchPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBatches() {
    try {
      const res = await fetch("/api/batches");
      const data = await res.json();

      if (data.success) {
        setBatches(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBatches();
  }, []);

  const totalWeight = batches.reduce(
    (sum, batch) => sum + Number(batch.weight_kg),
    0
  );

  return (
    <div className="p-8 bg-[#0d1117] min-h-screen">

      <PageHeader
        title="Batch Management"
        subtitle="Register and manage cocoa batches"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Batches"
          value={batches.length}
        />

        <StatCard
          title="Total Weight (kg)"
          value={totalWeight.toFixed(2)}
        />

        <StatCard
          title="Harvested"
          value={
            batches.filter(
              (b) => b.status === "Harvested"
            ).length
          }
        />
      </div>

      <BatchForm onCreated={loadBatches} />

      {loading ? (
        <p className="text-white mt-8">
          Loading batches...
        </p>
      ) : (
        <BatchTable batches={batches} />
      )}

    </div>
  );
}