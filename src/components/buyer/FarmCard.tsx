interface FarmCardProps {
  data: any;
}

export default function FarmCard({ data }: FarmCardProps) {
  const verified = data.certification_status === "Certified";

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          🌱 Farm Information
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-white text-sm ${
            verified ? "bg-green-600" : "bg-yellow-600"
          }`}
        >
          {verified ? "VERIFIED" : "PENDING"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <p className="text-slate-400 text-sm">Farmer</p>
          <p className="text-white font-semibold mt-1">
            {data.farmer_name}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Farm ID</p>
          <p className="text-white font-semibold mt-1">
            FARM-{data.farm_id}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Village</p>
          <p className="text-white font-semibold mt-1">
            {data.village}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">State</p>
          <p className="text-white font-semibold mt-1">
            {data.state}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Farm Size</p>
          <p className="text-white font-semibold mt-1">
            {data.farm_size} ha
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Certification</p>
          <p
            className={`font-semibold mt-1 ${
              verified ? "text-green-400" : "text-yellow-400"
            }`}
          >
            {data.certification_status}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Latitude</p>
          <p className="text-white font-semibold mt-1">
            {data.latitude}
          </p>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Longitude</p>
          <p className="text-white font-semibold mt-1">
            {data.longitude}
          </p>
        </div>

      </div>

      <div
        className={`mt-6 rounded-xl border p-4 ${
          verified
            ? "border-green-700 bg-green-900/20"
            : "border-yellow-700 bg-yellow-900/20"
        }`}
      >
        <p
          className={`font-semibold ${
            verified ? "text-green-400" : "text-yellow-400"
          }`}
        >
          🌳 Deforestation Check
        </p>

        <p className="text-slate-300 mt-2">
          {verified
            ? "No forest loss detected after the EUDR cut-off date."
            : "Certification is pending verification."}
        </p>
      </div>

    </div>
  );
}