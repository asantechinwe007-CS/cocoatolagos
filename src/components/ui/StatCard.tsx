type StatCardProps = {
  label: string;
  value: string | number;
  icon?: string;
  color?: "green" | "blue" | "orange" | "red" | "gray";
};

export default function StatCard({
  label,
  value,
  icon,
  color = "blue",
}: StatCardProps) {
  const colors = {
    green: "border-emerald-500 bg-emerald-500/10",
    blue: "border-blue-500 bg-blue-500/10",
    orange: "border-orange-500 bg-orange-500/10",
    red: "border-red-500 bg-red-500/10",
    gray: "border-gray-700 bg-[#161b22]",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${colors[color]}`}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-wide text-gray-400">
            {label}
          </p>

          <h3 className="text-3xl font-bold mt-2 text-white">
            {value}
          </h3>

        </div>

        {icon && (
          <div className="text-4xl">
            {icon}
          </div>
        )}

      </div>
    </div>
  );
}