type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const value = status.toLowerCase();

  let classes =
    "bg-gray-700 text-gray-100";

  switch (value) {
    case "pending":
      classes = "bg-yellow-600 text-white";
      break;

    case "in transit":
      classes = "bg-blue-600 text-white";
      break;

    case "received":
      classes = "bg-indigo-600 text-white";
      break;

    case "delivered":
      classes = "bg-green-600 text-white";
      break;

    case "delayed":
      classes = "bg-orange-600 text-white";
      break;

    case "rejected":
      classes = "bg-red-600 text-white";
      break;

    case "cancelled":
      classes = "bg-gray-600 text-white";
      break;
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${classes}`}
    >
      {status}
    </span>
  );
}