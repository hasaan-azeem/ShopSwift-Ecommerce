import { Trash2, ChevronDown, Loader2, Package } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./Statusbadge";

// FIX: Match exactly the backend Order model enum values
const STATUS_OPTIONS = ["Pending", "Processing", "Delivered", "Cancelled"];

const StatusSelect = ({ orderId, current, onChange }) => {
  // FIX: normalize to capitalized to match backend enum
  const normalizeStatus = (s) => {
    if (!s) return "Pending";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  const [value, setValue] = useState(normalizeStatus(current));
  const [saving, setSaving] = useState(false);

  const handleChange = async (e) => {
    const next = e.target.value;
    setValue(next);
    setSaving(true);
    await onChange(orderId, next);
    setSaving(false);
  };

  return (
    <div className="relative inline-flex items-center">
      <StatusBadge status={value} />
      <select
        value={value}
        onChange={handleChange}
        disabled={saving}
        className="absolute inset-0 opacity-0 cursor-pointer w-full"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <span className="ml-1 pointer-events-none text-gray-400">
        {saving ? (
          <Loader2 size={10} className="animate-spin" />
        ) : (
          <ChevronDown size={10} />
        )}
      </span>
    </div>
  );
};

const OrderRow = ({ order, onStatusChange, onDelete }) => {
  const firstItem = order.items?.[0];

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Order # */}
      <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap text-sm">
        #{(order.id ?? order._id)?.toString().slice(-8).toUpperCase()}
      </td>

      {/* Date */}
      <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
        {new Date(order.createdAt ?? order.created_at).toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>

      {/* Customer */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-xs font-semibold shrink-0">
            {(order.name ?? order.userName ?? "G").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 leading-tight">
              {order.name ?? order.userName ?? "Guest"}
            </p>
            <p className="text-xs text-gray-400">{order.email ?? ""}</p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">
        {order.phone ?? order.contact ?? "N/A"}
      </td>

      {/* Address */}
      <td className="px-5 py-4 text-sm text-gray-600 max-w-[150px] truncate">
        {order.address ?? order.shippingAddress?.address ?? "N/A"}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        {onStatusChange ? (
          <StatusSelect
            orderId={order.id ?? order._id}
            current={order.status}
            onChange={onStatusChange}
          />
        ) : (
          <StatusBadge status={order.status} />
        )}
      </td>

      {/* Total */}
      <td className="px-5 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
        PKR {Number(order.total ?? order.totalPrice ?? 0).toLocaleString()}
      </td>

      {/* Items */}
      <td className="px-5 py-4">
        {firstItem ? (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shrink-0">
              {(firstItem.productImage ?? firstItem.image) ? (
                <img
                  src={firstItem.productImage ?? firstItem.image}
                  alt={firstItem.productName ?? firstItem.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={13} className="text-gray-300" />
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700 leading-tight">
                {firstItem.productName ?? firstItem.name}
              </p>
              <p className="text-xs text-gray-400">
                Qty. {firstItem.quantity} | PKR{" "}
                {Number(firstItem.price ?? 0).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-xs text-gray-400">No items</span>
        )}
      </td>

      {/* Action */}
      {onDelete && (
        <td className="px-5 py-4">
          <button
            onClick={() => onDelete(order.id ?? order._id)}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition"
            title="Delete order"
          >
            <Trash2 size={15} />
          </button>
        </td>
      )}
    </tr>
  );
};

export default OrderRow;
