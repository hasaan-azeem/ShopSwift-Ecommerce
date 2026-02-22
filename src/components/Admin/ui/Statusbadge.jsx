const STATUS_STYLES = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-sky-100 text-sky-700",
  Pending: "bg-orange-100 text-orange-700",
  Cancelled: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  const normalized = status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    : "";
  const style = STATUS_STYLES[normalized] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {normalized}
    </span>
  );
};

export default StatusBadge;
