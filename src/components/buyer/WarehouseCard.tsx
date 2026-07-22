interface WarehouseCardProps {
  data: any;
}

export default function WarehouseCard({
  data,
}: WarehouseCardProps) {
  const delivered = data.shipment_status === "Delivered";

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          🏭 Shipment & Storage
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
          <p className="text-slate-400 text-sm">Current Location</p>
          <p className="text-white font-semibold mt-1">
            {data.current_location || "Not Available"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Vehicle</p>
          <p className="text-white font-semibold mt-1">
            {data.vehicle_id || "Not Assigned"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Temperature</p>
          <p className="text-green-400 font-semibold mt-1">
            {data.temperature ?? "N/A"}°C
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Humidity</p>
          <p className="text-green-400 font-semibold mt-1">
            {data.humidity ?? "N/A"}%
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Delivery Condition</p>
          <p className="text-white font-semibold mt-1">
            {data.delivery_condition || "Not Recorded"}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Receiver</p>
          <p className="text-white font-semibold mt-1">
            {data.receiver_name || "Pending"}
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-xl bg-slate-900 border border-slate-700 p-4">

        <h3 className="text-white font-semibold mb-3">
          Shipment Checks
        </h3>

        <ul className="space-y-2 text-sm text-slate-300">
          <li>✅ GPS location recorded</li>
          <li>✅ Temperature monitored</li>
          <li>✅ Humidity monitored</li>
          <li>✅ Shipment status tracked</li>
        </ul>

      </div>

    </div>
  );
}