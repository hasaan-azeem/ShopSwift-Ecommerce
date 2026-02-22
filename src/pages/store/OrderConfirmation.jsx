import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react";
import api from "../../utils/api";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const orderId = localStorage.getItem("lastOrderId");
    if (!orderId) {
      setLoading(false);
      return;
    }

    api
      .get(`/orders/${orderId}`)
      .then((res) => setOrder(res.data))
      .catch(() => setError("Could not load order details."))
      .finally(() => {
        setLoading(false);
        localStorage.removeItem("lastOrderId"); // clean up
      });
  }, []);

  const estimatedDelivery = (createdAt) => {
    const d = new Date(createdAt);
    d.setDate(d.getDate() + 10);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-gray-400" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Success header */}
      <div className="text-center mb-10">
        <CheckCircle size={64} className="mx-auto text-emerald-500 mb-4" />
        <h1 className="text-4xl font-bold text-emerald-700 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-500">
          Thank you for your purchase. We'll get it to you soon.
        </p>
      </div>

      {order ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {/* Meta */}
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-2">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Order ID
              </p>
              <p className="font-semibold text-gray-800">#{order._id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Date
              </p>
              <p className="text-gray-700">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Estimated Delivery
              </p>
              <p className="text-emerald-600 font-medium">
                {estimatedDelivery(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t pt-4 space-y-4 mb-6">
            {order.orderItems?.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                {(item.image || item.product?.image?.[0]?.url) && (
                  <img
                    src={item.image || item.product?.image?.[0]?.url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size} | Qty: {item.qty}
                  </p>
                </div>
                <p className="font-medium text-gray-800">
                  PKR {(item.price * item.qty).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Totals + Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Delivery Address
              </p>
              <p className="text-sm text-gray-500">
                {order.shippingAddress?.address}, {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </p>
              <p className="text-sm text-gray-500">
                {order.shippingAddress?.postalCode},{" "}
                {order.shippingAddress?.country}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Payment
              </p>
              <p className="text-sm text-gray-500">
                {order.paymentMethod} — {order.isPaid ? "Paid" : "Pending"}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                Total: PKR {order.totalPrice?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Fallback if order couldn't be loaded
        <div className="text-center text-gray-500">
          {error || "Your order has been placed successfully."}
        </div>
      )}

      <div className="flex gap-4 mt-8 justify-center">
        <Link
          to="/my-orders"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          View My Orders
        </Link>
        <Link
          to="/"
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
