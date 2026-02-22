import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Bell, Search } from "lucide-react";

const resolveTitleFromPath = (pathname) => {
  if (pathname.includes("/products")) return "Manage Products";
  if (pathname.includes("/orders")) return "Order Overview";
  if (pathname.includes("/users")) return "Users";
  if (pathname.includes("/categories")) return "Navigation";
  return "Dashboard";
};

const TopBar = () => {
  const { pathname } = useLocation();
  const title = useMemo(() => resolveTitleFromPath(pathname), [pathname]);
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");

  return (
    // hidden on mobile — AdminSidebar renders its own fixed mobile topbar
    <header className="hidden md:flex w-full h-16 items-center justify-between px-6 bg-black text-white border-b border-white/10 shadow-sm shrink-0">
      {/* Page title */}
      <h1 className="text-xl font-semibold tracking-wide">{title}</h1>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white/12 border border-white/10 rounded-xl px-3 py-2 w-56">
          <Search size={14} className="text-gray-300 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-300 placeholder-gray-300 outline-none w-full"
          />
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <Bell size={16} className="text-gray-300" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Admin avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-sky-500 to-sky-700 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {adminInfo?.name?.charAt(0) ?? "A"}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-white">
              {adminInfo?.name ?? "Admin"}
            </p>
            <p className="text-xs text-gray-400">{adminInfo?.email ?? ""}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
