import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Loader2 } from "lucide-react";
import api from "../../utils/api";

const STATUS_COLORS = {
  Pending:    "bg-orange-100 text-orange-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Delivered:  "bg-green-100 text-green-700",
  Cancelled:  "bg-red-100 text-red-700",
  Shipped:    "bg-blue-100 text-blue-700",
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my");
        setOrders(res.data);
      } catch {
        setError("Failed to load orders. Please login and try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-gray-400" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 text-center px-4">
      <div>
        <Package size={48} className="mx-auto mb-4 text-gray-300" />
        <p>{error}</p>
        <Link to="/login" className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-lg text-sm">Login</Link>
      </div>
    </div>
  );

  if (orders.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <Package size={64} className="text-gray-200 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
      <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
      <Link to="/" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <p className="text-xs text-gray-400">Order ID</p>
                <p className="font-semibold text-gray-800">#{order._id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date</p>
                <p className="text-sm text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total</p>
                <p className="font-bold text-gray-900">PKR {order.totalPrice?.toLocaleString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.orderItems?.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {(item.product?.image?.[0]?.url || item.image) && (
                    <img
                      src={item.product?.image?.[0]?.url || item.image}
                      alt={item.product?.name || item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium">{item.product?.name || item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty} × PKR {item.price?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-xs text-gray-400">
                Shipping: {order.shippingAddress?.city}, {order.shippingAddress?.country}
              </p>
              <Link
                to={`/order/${order._id}`}
                className="text-sm text-black underline hover:text-gray-600"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;