"use client";

import { useState } from "react";

import BuyerSearch from "@/components/buyer/BuyerSearch";
import BuyerSummary from "@/components/buyer/BuyerSummary";
import FarmCard from "@/components/buyer/FarmCard";
import BatchCard from "@/components/buyer/BatchCard";
import WarehouseCard from "@/components/buyer/WarehouseCard";
import DriverCard from "@/components/buyer/DriverCard";
import ExportCard from "@/components/buyer/ExportCard";
import ComplianceCard from "@/components/buyer/ComplianceCard";
import Timeline from "@/components/buyer/Timeline";
import DocumentsCard from "@/components/buyer/DocumentsCard";

export default function BuyerPortalPage() {
  const [traceData, setTraceData] = useState<any>(null);

  return (
    <div className="space-y-6 p-8">

      <BuyerSearch onResult={setTraceData} />

      {traceData && (
        <>
          <BuyerSummary data={traceData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <FarmCard data={traceData} />

            <BatchCard data={traceData} />

            <WarehouseCard data={traceData} />

            <DriverCard data={traceData} />

            <ExportCard data={traceData} />

            <ComplianceCard data={traceData} />

          </div>

          <Timeline data={traceData} />

          <DocumentsCard data={traceData} />

        </>
      )}

    </div>
  );
}