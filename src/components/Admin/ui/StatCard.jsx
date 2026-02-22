/* eslint-disable no-unused-vars */
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ label, value, change, up, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <div
        className={`w-10 h-10 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white`}
      >
        <Icon size={16} />
      </div>
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p
        className={`text-xs mt-1 flex items-center gap-1 font-medium ${
          up ? "text-emerald-600" : "text-red-500"
        }`}
      >
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {change} vs last month
      </p>
    </div>
  </div>
);

export default StatCard;
