import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RefreshCw } from "lucide-react";

const RANGES = ["7 Days", "30 Days", "90 Days", "All Time"];

const RANGE_MAP = {
  "7 Days":   "7d",
  "30 Days":  "30d",
  "90 Days":  "90d",
  "All Time": "all",
};

const formatRs = (value) => `Rs. ${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="text-gray-500 mb-1">{label}</p>
      <p className="font-semibold text-gray-900">Rs. {payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const SalesChart = ({ salesData = [], onRangeChange, loading = false }) => {
  const [activeRange, setActiveRange] = useState("30 Days");

  const handleRange = (label) => {
    setActiveRange(label);
    onRangeChange?.(RANGE_MAP[label]);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Sales Performance</h2>
          <p className="text-xs text-gray-400 mt-0.5">Revenue over time</p>
        </div>

        {/* Range filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => handleRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeRange === r
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => onRangeChange?.(RANGE_MAP[activeRange])}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-gray-500 cursor-pointer"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Chart */}
      {salesData.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          No sales data for this period.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={salesData}
            margin={{ top: 4, right: 4, left: 8, bottom: 4 }}
            barCategoryGap="40%"
          >
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v.slice(5)} // show MM-DD only
            />
            <YAxis
              tickFormatter={formatRs}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              width={64}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6", radius: 6 }} />
            <Bar
              dataKey="sales"
              fill="#4f46e5"
              radius={[6, 6, 0, 0]}
              maxBarSize={56}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesChart;