import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear any stored tokens/session data
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className="flex flex-col justify-between w-48 md:w-56 lg:w-64 h-screen sticky top-0 border-r border-gray-200 bg-white dark:bg-slate-900 dark:border-slate-700 p-4">
      {/* Top section - navigation */}
      <nav className="mt-15 flex flex-col gap-3">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition
               ${isActive
                 ? "bg-sky-600 text-white"
                 : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"}`
            }
          >
            {l.label}
          </NavLink>
        ))}

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block w-full text-center px-3 py-2 rounded-md text-sm font-medium border border-slate-300 hover:bg-slate-50 transition dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-200"
        >
          Open Store
        </a>
      </nav>

      {/* Bottom section - logout */}
      <button
        onClick={handleLogout}
        className="w-full mt-4 px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition hover:cursor-pointer"
      >
        Logout
      </button>
    </aside>
  );
}
