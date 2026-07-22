interface DriverCardProps {
  data: any;
}

export default function DriverCard({
  data,
}: DriverCardProps) {
  const delivered = data.shipment_status === "Delivered";

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          🚚 Transport Information
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-white text-sm ${
            delivered ? "bg-green-600" : "bg-blue-600"
          }`}
        >
          {data.shipment_status || "Unknown"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <p className="text-slate-400 text-sm">Driver</p>
          <p className="text-white font-semibold mt-1">
            {data.driver_name || "Not Assigned"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Driver Email</p>
          <p className="text-white font-semibold mt-1">
            {data.driver_email || "Not Available"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Vehicle Number</p>
          <p className="text-white font-semibold mt-1">
            {data.vehicle_id || "Not Assigned"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Shipment ID</p>
          <p className="text-white font-semibold mt-1">
            {data.shipment_id}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Departure Time</p>
          <p className="text-white font-semibold mt-1">
            {data.departure_time || "Not Recorded"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Delivered At</p>
          <p className="text-white font-semibold mt-1">
            {data.delivered_at || "Pending"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Driver Status</p>
          <p className="text-green-400 font-semibold mt-1">
            {data.driver_status || "Unknown"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Current Location</p>
          <p className="text-white font-semibold mt-1">
            {data.current_location || "Unknown"}
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-xl bg-slate-900 border border-slate-700 p-4">

        <h3 className="text-white font-semibold mb-3">
          Delivery Summary
        </h3>

        <ul className="space-y-2 text-sm text-slate-300">
          <li>✅ Shipment linked to batch.</li>
          <li>✅ Driver assigned.</li>
          <li>✅ Vehicle recorded.</li>
          <li>✅ Delivery status tracked.</li>
        </ul>

      </div>

    </div>
  );
}