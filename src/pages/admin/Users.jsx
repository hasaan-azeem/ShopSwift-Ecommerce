/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Users as UsersIcon,
  Loader2,
  Search,
  ShieldCheck,
  Shield,
  User,
} from "lucide-react";
import UserRow from "../../components/Admin/Users/Userrow";

const TABLE_HEADERS = ["User", "Email", "Joined", "Orders", "Role", "Actions"];
const FILTERS = ["All", "Customers", "Admins"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://shopswift-backend-kykw.onrender.com/api/admin/users", {
        headers: getAuthHeader(),
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // FIX: Added full URL and auth header
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await fetch(`https://shopswift-backend-kykw.onrender.com/api/admin/users/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      setUsers((prev) => prev.filter((u) => u._id !== id && u.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // FIX: Added full URL, auth header, and fixed role value "customer" to "user"
  const handleToggleAdmin = async (id, makeAdmin) => {
    try {
      await fetch(`https://shopswift-backend-kykw.onrender.com/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ role: makeAdmin ? "admin" : "user" }),
      });
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id || u.id === id
            ? {
                ...u,
                role: makeAdmin ? "admin" : "user",
                isAdmin: makeAdmin,
              }
            : u,
        ),
      );
    } catch (err) {
      console.error("Role update failed:", err);
    }
  };

  const filtered = users.filter((u) => {
    const isAdmin = u.role === "admin" || u.isAdmin === true;
    const matchesFilter =
      filter === "All" ||
      (filter === "Admins" && isAdmin) ||
      (filter === "Customers" && !isAdmin);
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalAdmins = users.filter(
    (u) => u.role === "admin" || u.isAdmin,
  ).length;
  const totalCustomers = users.length - totalAdmins;

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
          <UsersIcon size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Users
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage customer accounts and admin roles
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Users",
            value: users.length,
            icon: User,
            color: "from-sky-500 to-sky-700",
          },
          {
            label: "Customers",
            value: totalCustomers,
            icon: Shield,
            color: "from-emerald-500 to-emerald-700",
          },
          {
            label: "Admins",
            value: totalAdmins,
            icon: ShieldCheck,
            color: "from-violet-500 to-violet-700",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white shrink-0`}
            >
              <Icon size={15} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-xl font-bold text-gray-900 leading-tight">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 max-w-sm shadow-sm">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Loading users...</span>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-red-500 text-sm mb-3">{error}</p>
          <button
            onClick={fetchUsers}
            className="text-xs px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
          <UsersIcon size={36} className="mb-3 text-gray-200" />
          <p className="text-sm">
            {search || filter !== "All"
              ? "No users match your filters."
              : "No users found."}
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">
              {filtered.length} user{filtered.length !== 1 ? "s" : ""}
              {filter !== "All" && ` (${filter})`}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {TABLE_HEADERS.map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <UserRow
                    key={user.id ?? user._id}
                    user={user}
                    onDelete={handleDelete}
                    onToggleAdmin={handleToggleAdmin}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
