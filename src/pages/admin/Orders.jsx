import { useEffect, useState } from "react";
import { Package, Loader2 } from "lucide-react";
import OrdersTable from "../../components/Admin/ui/Orderstable";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/admin/orders", {
        headers: getAuthHeader(),
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o)),
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // FIX: Added full URL and auth header
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await fetch(`http://localhost:5000/api/admin/orders/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      setOrders((prev) => prev.filter((o) => o._id !== id && o.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
          <Package size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Orders Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and update customer orders
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Loading orders...</span>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-red-500 text-sm mb-3">{error}</p>
          <button
            onClick={fetchOrders}
            className="text-xs px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400">
          <Package size={36} className="mb-3 text-gray-200" />
          <p className="text-sm">No orders found.</p>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <OrdersTable
          orders={orders}
          title="All Orders"
          showViewAll={false}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Orders;
