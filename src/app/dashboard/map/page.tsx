"use client";

import dynamic from "next/dynamic";

const FarmMap = dynamic(
  () => import("@/components/FarmMap"),
  {
    ssr: false,
  }
);

export default function MapPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Farm Mapping
      </h1>

      <FarmMap />
    </main>
  );
}