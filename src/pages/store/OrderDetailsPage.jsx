import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, Package } from "lucide-react";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `https://shopswift-backend-kykw.onrender.com/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (!res.ok) throw new Error("Failed to fetch order details");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);
const token = localStorage.getItem("token");
console.log("Token:", token);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-3 text-gray-400">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Loading order details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-red-500 text-sm mb-3">{error}</p>
        <Link to="/my-orders" className="text-blue-500 hover:underline text-sm">
          Back to My Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-400">
        <Package size={36} className="mb-3 text-gray-200" />
        <p className="text-sm">No order details found.</p>
        <Link
          to="/my-orders"
          className="text-blue-500 hover:underline text-sm mt-3"
        >
          Back to My Orders
        </Link>
      </div>
    );
  }

  const totalItems = order.orderItems?.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

      <div className="p-4 sm:p-6 rounded-lg border">
        {/* Order Info */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Order ID: #{order._id?.toString().slice(-8).toUpperCase()}
            </h3>
            <p className="text-gray-600">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Total Items: {totalItems}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 gap-2">
            <span
              className={`${
                order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } px-3 py-1 rounded-full text-sm font-medium`}
            >
              {order.isPaid ? "Paid" : "Pending Payment"}
            </span>
            <span
              className={`${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
              } px-3 py-1 rounded-full text-sm font-medium`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Payment & Shipping Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
            <p className="text-sm text-gray-600">
              Method: {order.paymentMethod}
            </p>
            <p className="text-sm text-gray-600">
              Status: {order.isPaid ? "Paid" : "Unpaid"}
            </p>
            {order.paidAt && (
              <p className="text-sm text-gray-600">
                Paid At: {new Date(order.paidAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
            <p className="text-sm text-gray-600">
              Address: {order.shippingAddress?.address}
            </p>
            <p className="text-sm text-gray-600">
              City: {order.shippingAddress?.city}
            </p>
            <p className="text-sm text-gray-600">
              Postal Code: {order.shippingAddress?.postalCode}
            </p>
            <p className="text-sm text-gray-600">
              Country: {order.shippingAddress?.country}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Order Summary</h4>
            <p className="text-sm text-gray-600">Total Items: {totalItems}</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              Total: PKR {Number(order.totalPrice ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className="overflow-x-auto">
          <h4 className="text-lg font-semibold mb-4">Products</h4>
          <table className="min-w-full text-gray-600 mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold">
                  Product
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold">
                  Unit Price
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold">
                  Quantity
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {item.product?.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product?.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                          <Package size={16} className="text-gray-300" />
                        </div>
                      )}
                      <Link
                        to={`/product/${item.product?._id}`}
                        className="text-blue-500 hover:underline text-sm font-medium"
                      >
                        {item.product?.name ?? "Product"}
                      </Link>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    PKR {Number(item.price ?? 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm">{item.qty}</td>
                  <td className="py-3 px-4 text-sm font-semibold">
                    PKR {Number((item.price ?? 0) * item.qty).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Link */}
        <Link to="/my-orders" className="text-blue-500 hover:underline text-sm">
          Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
