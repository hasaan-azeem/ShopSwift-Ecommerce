import OrderRow from "./OrderRow";

const DASHBOARD_HEADERS = [
  "Order #",
  "Date", 
  "Customer",
  "Contact",
  "Address",
  "Status",
  "Total",
  "Items",
];

const FULL_HEADERS = [
  "Order #",
  "Date",
  "Customer",
  "Contact",
  "Address",
  "Status",
  "Total",
  "Items",
  "Action",
];

const OrdersTable = ({
  orders,
  onStatusChange,
  onDelete,
  title = "Recent Orders",
  showViewAll = true,
}) => {
  const isFullView = !!onStatusChange || !!onDelete;
  const headers = isFullView ? FULL_HEADERS : DASHBOARD_HEADERS;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        {showViewAll && !isFullView && (
          <button className="text-sm text-sky-600 hover:text-sky-800 font-medium transition cursor-pointer">
            View all
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {headers.map((h) => (
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
            {orders.map((order, i) => (
              <OrderRow
                key={order.id ?? order._id ?? i}
                order={order}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
