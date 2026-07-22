interface TimelineProps {
  data: any;
}

export default function Timeline({ data }: TimelineProps) {
  const timeline = [
    {
      icon: "🌱",
      title: "Farm Registered",
      date: data.created_at,
      description: `${data.farmer_name} registered the farm in ${data.village}, ${data.state}.`,
    },

    {
      icon: "📦",
      title: "Batch Created",
      date: data.created_at,
      description: `Batch ${data.batch_code} was created with a weight of ${data.weight_kg} kg.`,
    },

    {
      icon: "📄",
      title: "Cocoa Passport",
      date: data.passport_number ? "Generated" : "Pending",
      description: data.passport_number
        ? `Passport ${data.passport_number} has been generated.`
        : "Passport has not yet been generated.",
    },

    {
      icon: "🚚",
      title: "Shipment",
      date: data.delivered_at || data.departure_time || "Pending",
      description: `Shipment is currently "${data.shipment_status || "Pending"}".`,
    },

    {
      icon: "📍",
      title: "Current Location",
      date: "",
      description: data.current_location || "Location not available.",
    },

    {
      icon: "✅",
      title: "Compliance",
      date: "",
      description:
        data.certification_status === "Certified"
          ? "Farm certification verified."
          : "Farm certification pending.",
    },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-8">
        📍 Traceability Timeline
      </h2>

      <div className="relative border-l-2 border-green-600 ml-5">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="relative pl-10 pb-10 last:pb-0"
          >
            <div className="absolute -left-[18px] flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-lg shadow-lg">
              {item.icon}
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">

              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <span className="text-sm text-slate-400">
                  {item.date}
                </span>
              </div>

              <p className="text-slate-300">
                {item.description}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}