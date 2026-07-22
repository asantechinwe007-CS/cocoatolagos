"use client";

import { Suspense } from "react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

function DriverMobileContent() {


  const [shipment, setShipment] = useState<any>(null);
  const [shipments, setShipments] = useState<any[]>([]);
const [selectedShipmentId, setSelectedShipmentId] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

const [delayHours, setDelayHours] = useState("");
const [delayReason, setDelayReason] = useState("Traffic");
const [delayNotes, setDelayNotes] = useState("");
const [evidenceFiles, setEvidenceFiles] = useState<FileList | null>(null);
const [uploadingEvidence, setUploadingEvidence] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
const [receiverName, setReceiverName] = useState("");
const [deliveryCondition, setDeliveryCondition] = useState("Good");
const [photoUrl, setPhotoUrl] = useState("");

const searchParams = useSearchParams();

const shipmentFromUrl = searchParams.get("shipment");
const driverIdFromUrl = searchParams.get("driver");

const [driver, setDriver] = useState<any>(null);

async function completeDelivery() {
  if (!shipment) return;

  try {
    const res = await fetch("/api/shipments/complete", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shipment_id: shipment.id,
        receiver_name: receiverName,
        delivery_condition: deliveryCondition,
        photo_url: photoUrl,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Delivery failed");
      return;
    }

    alert("Delivery Completed Successfully");

    // Clear form
    setReceiverName("");
    setDeliveryCondition("Good");
    setPhotoUrl("");
    setTemperature("");
    setHumidity("");
    setDelayHours("");
    setDelayReason("Traffic");
    setDelayNotes("");
    setEvidenceFiles(null);

    // Reload shipment list
    await loadShipment();

  } catch (err) {
    console.error(err);
    alert("Network Error");
  }
}

async function submitDelay() {
  if (!shipment) return;

  const res = await fetch("/api/shipments/delay", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shipment_id: shipment.id,
      delay_hours: Number(delayHours),
      delay_reason: delayReason,
      notes: delayNotes,
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Delay submitted.");
    setDelayHours("");
    setDelayNotes("");
  } else {
    alert("Delay submission failed.");
  }
}

async function uploadEvidence() {
  if (!shipment || !evidenceFiles?.length) {
    alert("Select at least one image.");
    return;
  }

  setUploadingEvidence(true);

  try {
    for (const file of Array.from(evidenceFiles)) {
      const form = new FormData();
      form.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const upload = await uploadRes.json();

      if (!upload.success) throw new Error("Upload failed");

     await fetch("/api/evidence", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    shipment_id: shipment.id,
    fileName: upload.fileName,
    fileUrl: upload.fileUrl,
    uploaded_by: shipment.driver_id,
  }),
});
    }

    alert("Evidence uploaded successfully.");
    setEvidenceFiles(null);

  } catch (err) {
    console.error(err);
    alert("Evidence upload failed.");
  } finally {
    setUploadingEvidence(false);
  }
}


 async function loadShipment() {
  try {
    const res = await fetch("/api/shipments");
    const data = await res.json();

    if (!data.success) return;

    const active = data.data.filter(
      (s: any) => s.status !== "Delivered"
    );

    setShipments(active);

    if (active.length > 0) {
      const selected =
  active.find(
    (s: any) =>
      s.id === Number(shipmentFromUrl || selectedShipmentId)
  ) || active[0];

      setShipment(selected);
      setSelectedShipmentId(selected.id.toString());
    } else {
      setShipment(null);
    }
  } catch (err) {
    console.error(err);
  }
}
async function loadDriver() {
  if (!driverIdFromUrl) return;

  try {
    const res = await fetch("/api/drivers");
    const data = await res.json();

    if (!data.success) return;

    const selectedDriver = data.data.find(
      (d: any) => d.id === Number(driverIdFromUrl)
    );

    if (selectedDriver) {
      setDriver(selectedDriver);
    }
  } catch (err) {
    console.error(err);
  }
}
useEffect(() => {
  loadShipment();
  loadDriver();
}, []);
  async function updateGPS() {
    if (!shipment) return;

    try {
      const res = await fetch("/api/shipments/location", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipment_id: shipment.id,
          latitude: 6.5244,
          longitude: 3.3792,
          current_location: "Lagos, Nigeria",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("GPS Updated Successfully");
        loadShipment();
      } else {
        alert("GPS Update Failed");
      }
    } catch (e) {
      console.error(e);
      alert("Network Error");
    }
  }

  async function saveEnvironment() {
    if (!shipment) return;

    if (!temperature || !humidity) {
      alert("Please enter both temperature and humidity.");
      return;
    }

    try {
      const res = await fetch("/api/shipments/environment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipment_id: shipment.id,
          temperature: Number(temperature),
          humidity: Number(humidity),
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Environmental conditions updated.");
        setTemperature("");
        setHumidity("");
        loadShipment();
      }
    } catch (e) {
      console.error(e);
      alert("Network Error");
    }
  }

 if (!shipment) {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">

      <div className="text-center">

        <div className="text-6xl mb-4">
          🚛
        </div>

        <h2 className="text-2xl font-bold">
          No Active Shipment
        </h2>

        <p className="text-gray-400 mt-2">
          Waiting for the next assigned shipment...
        </p>

      </div>

    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#0d1117] flex justify-center py-6 px-4">
      <div className="w-full max-w-[420px] bg-[#0f1720] rounded-3xl shadow-2xl text-white p-5">

        <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-5 mb-6">

  <div className="flex items-center justify-between">

    <div>
      <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
        CocoaPass Logistics
      </p>

      <h1 className="text-2xl font-bold mt-1">
        Driver Operations
      </h1>

      <p className="text-sm text-gray-400 mt-1">
        {driver
          ? `Welcome back, ${driver.full_name ?? driver.name}`
          : "Loading driver profile..."}
      </p>
    </div>

    <div className="text-5xl">
      🚛
    </div>

  </div>

  <div className="grid grid-cols-2 gap-4 mt-6">

    <div className="bg-[#0d1117] rounded-xl p-3 border border-gray-800">
      <p className="text-xs text-gray-500 uppercase">
        Driver
      </p>
      <p className="text-red-400 text-sm">
  Driver ID: {driverIdFromUrl}
</p>

      <p className="font-semibold mt-1">
        {driver?.full_name ?? driver?.name ?? "Not Assigned"}
      </p>
    </div>

    <div className="bg-[#0d1117] rounded-xl p-3 border border-gray-800">
      <p className="text-xs text-gray-500 uppercase">
        Status
      </p>

      <p className="font-semibold mt-1 text-green-400">
        {driver?.status ?? "Active"}
      </p>
    </div>

    <div className="bg-[#0d1117] rounded-xl p-3 border border-gray-800">
      <p className="text-xs text-gray-500 uppercase">
        Vehicle
      </p>

      <p className="font-semibold mt-1">
        {shipment?.vehicle_id ??
          shipment?.vehicle_number ??
          "Pending Assignment"}
      </p>
    </div>

    <div className="bg-[#0d1117] rounded-xl p-3 border border-gray-800">
      <p className="text-xs text-gray-500 uppercase">
        Shipment
      </p>

      <p className="font-semibold mt-1">
        {shipment?.batch_code ?? "--"}
      </p>
    </div>

  </div>

</div>

        <div className="bg-[#161b22] rounded-2xl border border-gray-800 p-5 mb-5">
       <div className="mb-5">
  <div className="flex items-center justify-between border-b border-gray-800 pb-3">
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">
        Current Assignment
      </p>

      <p className="text-lg font-semibold mt-1">
        {shipment.batch_code}
      </p>
    </div>

    <span className="bg-green-700 px-3 py-1 rounded-full text-sm">
      {shipment.status}
    </span>
  </div>
</div>
          <h2 className="text-lg font-bold mb-4">🚚 Assigned Shipment</h2>

          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm">Batch</p>
              <p>{shipment.batch_code}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Vehicle</p>
              <p>{shipment.vehicle_id ?? shipment.vehicle_number ?? "Not Assigned"}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Location</p>
              <p>{shipment.current_location ?? "Unknown"}</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <span className="inline-block bg-green-700 px-3 py-1 rounded-full text-sm">
                {shipment.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5">

          <div className="bg-[#161b22] rounded-2xl p-5">
            <h2 className="font-bold mb-4">📍 GPS</h2>
            <button
              onClick={updateGPS}
              className="w-full bg-blue-600 rounded-xl py-3 font-semibold"
            >
              Update GPS
            </button>
          </div>
         <input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  multiple
  hidden
  onChange={(e) => setEvidenceFiles(e.target.files)}
/>

<div className="bg-[#161b22] rounded-2xl p-5">
  <h2 className="font-bold mb-4">🌡 Environment</h2>

  <input
    className="w-full mb-3 rounded-xl bg-[#0d1117] border border-gray-700 p-3"
    placeholder="Temperature (°C)"
    type="number"
    value={temperature}
    onChange={(e) => setTemperature(e.target.value)}
  />

  <input
    className="w-full mb-4 rounded-xl bg-[#0d1117] border border-gray-700 p-3"
    placeholder="Humidity (%)"
    type="number"
    value={humidity}
    onChange={(e) => setHumidity(e.target.value)}
  />

  <button
    onClick={saveEnvironment}
    className="w-full bg-orange-600 rounded-xl py-3 font-semibold"
  >
    Save Conditions
  </button>
</div>

<div className="bg-[#161b22] rounded-2xl p-5">
  <h2 className="font-bold mb-4">⚠ Delay Report</h2>

  <input
    type="number"
    placeholder="Hours Delayed"
    value={delayHours}
    onChange={(e) => setDelayHours(e.target.value)}
    className="w-full mb-3 rounded-xl bg-[#0d1117] border border-gray-700 p-3"
  />

  <select
    value={delayReason}
    onChange={(e) => setDelayReason(e.target.value)}
    className="w-full mb-3 rounded-xl bg-[#0d1117] border border-gray-700 p-3"
  >
    <option>Traffic</option>
    <option>Vehicle Breakdown</option>
    <option>Bad Road</option>
    <option>Weather</option>
    <option>Security Issue</option>
    <option>Other</option>
  </select>

  <textarea
    placeholder="Additional notes..."
    value={delayNotes}
    onChange={(e) => setDelayNotes(e.target.value)}
    className="w-full mb-4 rounded-xl bg-[#0d1117] border border-gray-700 p-3"
    rows={3}
  />

  <button
    onClick={submitDelay}
    className="w-full bg-red-600 rounded-xl py-3 font-semibold"
  >
    Submit Delay
  </button>
</div>

<div className="bg-[#161b22] rounded-2xl p-5">
  <h2 className="font-bold mb-4">📷 Upload Evidence</h2>

  <button
    onClick={() => fileInputRef.current?.click()}
    disabled={uploadingEvidence}
    className="w-full bg-purple-600 rounded-2xl py-4 font-semibold disabled:opacity-50"
  >
    {uploadingEvidence ? "Uploading..." : "📷 Select & Upload Evidence"}
  </button>

  {evidenceFiles && evidenceFiles.length > 0 && (
    <p className="mt-3 text-sm text-gray-400">
      {evidenceFiles.length} file(s) selected
    </p>
  )}

  {evidenceFiles && evidenceFiles.length > 0 && (
    <button
      onClick={uploadEvidence}
      disabled={uploadingEvidence}
      className="w-full mt-3 bg-indigo-600 rounded-2xl py-3 font-semibold disabled:opacity-50"
    >
      {uploadingEvidence ? "Uploading..." : "Upload Selected Files"}
    </button>
  )}
</div>


<div className="bg-[#161b22] rounded-2xl p-5">

  <h2 className="font-bold mb-4">
    ✅ Complete Delivery
  </h2>

  <input
    className="w-full mb-3 rounded-xl bg-[#0d1117] border border-gray-700 p-3"
    placeholder="Receiver Name"
    value={receiverName}
    onChange={(e)=>setReceiverName(e.target.value)}
  />

  <input
    type="url"
    className="w-full mb-3 rounded-xl bg-[#0d1117] border border-gray-700 p-3"
    placeholder="Photo URL (optional)"
    value={photoUrl}
    onChange={(e) => setPhotoUrl(e.target.value)}
  />

  <select
    className="w-full mb-4 rounded-xl bg-[#0d1117] border border-gray-700 p-3"
    value={deliveryCondition}
    onChange={(e)=>setDeliveryCondition(e.target.value)}
  >
    <option>Good</option>
    <option>Damaged</option>
    <option>Wet</option>
    <option>Partial</option>
  </select>

  <button
    onClick={completeDelivery}
    className="w-full bg-green-600 rounded-2xl py-4 font-semibold"
  >
    Complete Delivery
  </button>

</div>

        </div>

      </div>
    </div>
  );
}

export default function DriverMobilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <DriverMobileContent />
    </Suspense>
  );
}
