import { Trash2, ShieldCheck, Shield } from "lucide-react";

const UserRow = ({ user, onDelete, onToggleAdmin }) => {
  const initials = (user.name ?? user.email ?? "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isAdmin = user.role === "admin" || user.isAdmin === true;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Avatar + Name */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {user.name ?? "—"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              ID: {user.id ?? user._id}
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-5 py-4 text-sm text-gray-600">{user.email ?? "—"}</td>

      {/* Joined */}
      <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
        {(user.createdAt ?? user.created_at)
          ? new Date(user.createdAt ?? user.created_at).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              },
            )
          : "—"}
      </td>

      {/* Orders */}
      <td className="px-5 py-4 text-sm text-gray-700 font-medium">
        {user.orderCount ?? user.orders?.length ?? 0}
      </td>

      {/* Role */}
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            isAdmin
              ? "bg-violet-100 text-violet-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isAdmin ? <ShieldCheck size={11} /> : <Shield size={11} />}
          {isAdmin ? "Admin" : "Customer"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-1">
          {onToggleAdmin && (
            <button
              onClick={() => onToggleAdmin(user.id ?? user._id, !isAdmin)}
              className={`p-1.5 rounded-lg transition text-xs font-medium ${
                isAdmin
                  ? "text-violet-400 hover:bg-violet-50 hover:text-violet-600"
                  : "text-gray-400 hover:bg-violet-50 hover:text-violet-600"
              }`}
              title={isAdmin ? "Revoke admin" : "Make admin"}
            >
              <ShieldCheck size={15} />
            </button>
          )}
          <button
            onClick={() => onDelete(user.id ?? user._id)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
            title="Delete user"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
