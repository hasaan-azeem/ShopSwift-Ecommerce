import React, { useEffect } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "1234",
          createdAt: new Date(),
          shippingAddress: {
            street: "123 Main St",
            city: "Karachi",
            country: "Pakistan",
          },
          orderItems: [
            {
              name: "V-NECK SLEEVELESS SWEATER",
              image:
                "https://breakout.com.pk/cdn/shop/files/25WSS225-OFW_1.jpg?v=1762854103&width=480",
            },
          ],
          totalAmount: 1500,
          isPaid: true,
        },
        {
          _id: "2345",
          createdAt: new Date(),
          shippingAddress: {
            street: "Johar Town",
            city: "Lahore",
            country: "Pakistan",
          },
          orderItems: [
            {
              name: "High Neck SWEATER",
              image:
                "https://breakout.com.pk/cdn/shop/files/25WFS215-GRY_1.jpg?v=1762854107&width=480",
            },
          ],
          totalAmount: 1500,
          isPaid: false,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-3 px-4 sm:py-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:h-12 object-cover rounded-lg"
                    />
                  </td>

                  <td className="py-2 px-2 sm:py-4 text-gray-900 font-medium">
                    #{order._id}
                  </td>

                  <td className="py-2 px-2 sm:py-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>

                  <td className="py-2 px-2 sm:py-4">
                    {order.shippingAddress.street
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 sm:py-4">
                    {order.orderItems.length}
                  </td>

                  <td className="py-2 px-2 sm:py-4">Rs {order.totalAmount}</td>

                  <td
                    className={`py-2 px-2 sm:py-4 text-xs sm:text-sm font-medium ${
                      order.isPaid ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
