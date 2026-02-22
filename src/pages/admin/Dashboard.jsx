import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import StatCard from "../../components/Admin/ui/StatCard";
import OrdersTable from "../../components/Admin/ui/Orderstable";
import SalesChart from "../../components/Admin/ui/Saleschart";

const STAT_CONFIG = [
  {
    label: "Total Revenue",
    key: "totalRevenue",
    growthKey: "revenueGrowth",
    icon: DollarSign,
    color: "from-sky-500 to-sky-700",
    prefix: "Rs. ",
  },
  {
    label: "Total Orders",
    key: "totalOrders",
    growthKey: "orderGrowth",
    icon: ShoppingCart,
    color: "from-violet-500 to-violet-700",
    prefix: "",
  },
  {
    label: "Total Products",
    key: "totalProducts",
    growthKey: "productGrowth",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-700",
    prefix: "",
  },
  {
    label: "Total Customers",
    key: "totalCustomers",
    growthKey: "customerGrowth",
    icon: Users,
    color: "from-orange-500 to-orange-700",
    prefix: "",
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30d");

  const fetchData = async (r) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/stats?range=${r}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
      setSalesData(data.salesData ?? []);
      setOrders(data.recentOrders ?? []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(range);
  }, [range]);

  // Map raw API order shape to what OrdersTable expects
  const mappedOrders = orders.map((o) => ({
    id: `#${o.orderId}`,
    customer: o.userName,
    date: new Date(o.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    amount: `Rs. ${Number(o.total).toLocaleString()}`,
    status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's what's happening in your store.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STAT_CONFIG.map((cfg) => {
          const value = stats?.[cfg.key] ?? 0;
          const growth = stats?.[cfg.growthKey] ?? 0;
          return (
            <StatCard
              key={cfg.label}
              label={cfg.label}
              value={`${cfg.prefix}${Number(value).toLocaleString()}`}
              change={`${growth >= 0 ? "+" : ""}${growth}%`}
              up={growth >= 0}
              icon={cfg.icon}
              color={cfg.color}
            />
          );
        })}
      </div>

      {/* Sales chart */}
      <div className="mb-8">
        <SalesChart
          salesData={salesData}
          onRangeChange={(r) => setRange(r)}
          loading={loading}
        />
      </div>

      {/* Recent orders */}
      <OrdersTable orders={mappedOrders} />
    </div>
  );
};

export default Dashboard;
