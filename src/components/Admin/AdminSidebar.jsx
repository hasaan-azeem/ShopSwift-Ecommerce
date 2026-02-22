/* eslint-disable no-unused-vars */
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//   FaHome,
//   FaBox,
//   FaShoppingCart,
//   FaUsers,
//   FaStore,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const links = [
//   { to: "/admin/", label: "Dashboard", icon: <FaHome /> },
//   { to: "/admin/products", label: "Products", icon: <FaBox /> },
//   { to: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
//   { to: "/admin/users", label: "Users", icon: <FaUsers /> },
// ];

// export default function AdminSidebar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // clear any stored tokens/session data
//     localStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   return (
//     <aside className="flex flex-col justify-between w-64 h-screen sticky top-0 p-4">
//       {/* Top */}
//       <div>
//         {/* Logo */}
//         <div className="mb-6">
//           <Link
//             to="/admin"
//             className="text-white font-medium text-lg"
//           >
//             ShopSwift
//           </Link>
//         </div>
//       <div className="h-0.5 w-64 bg-gray-600 -ml-4 -mt-3 mb-8"></div>
//         {/* Top section - navigation */}
//         <nav className="flex flex-col space-y-2 -ml-2">
//           {links.map((l) => (
//             <NavLink
//               key={l.to}
//               to={l.to}
//               className={({ isActive }) =>
//                 isActive
//                   ? "bg-sky-600 text-white py-3 px-4 rounded flex items-center space-x-2"
//                   : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 transition"
//               }
//             >
//               {l.icon}
//               <span>{l.label}</span>
//             </NavLink>
//           ))}

//           <a
//             href="/"
//             target="_blank"
//             rel="noreferrer"
//             className="mt-2 inline-block w-full text-center px-3 py-2 rounded-md text-sm font-medium border border-slate-300 hover:bg-slate-50 transition dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-200"
//           >
//             Open Store
//           </a>
//         </nav>
//       </div>
//       {/* Bottom - Logout */}
//       <button
//         onClick={handleLogout}
//         className="w-full mt-4 py-3 px-4 rounded flex items-center space-x-2 bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
//       >
//         <FaSignOutAlt />
//         <span>Logout</span>
//       </button>
//     </aside>
//   );
// }

// // import React from 'react'
// // import { FaUser } from 'react-icons/fa'
// // import { Link, NavLink } from 'react-router-dom'

// // const AdminSidebar = () => {
// //   return (
// //     <div className='p-6'>
// //       <div className='mb-6'>
// //       <Link to="/admin" className="text-white font-medium">ShopSwift</Link>
// //       </div>
// //       <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
// //       <nav className='flex flex-col space-y-2'>
// //         <NavLink to="/admin/users" className={({ isActive }) => isActive ? "bg-sky-600 text-white py-3 px-4 rounded flex items-center space-x-2" : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
// //         <FaUser />
// //         <span>Users</span>
// //         </NavLink>
// //       </nav>
// //     </div>
// //   )
// // }

// // export default AdminSidebar
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  LayoutGrid,
  Users,
  Store,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/admin/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart, exact: false },
  { to: "/admin/products", label: "Products", icon: Package, exact: false },
  {
    to: "/admin/categories",
    label: "Navigation",
    icon: LayoutGrid,
    exact: false,
  },
  { to: "/admin/users", label: "Users", icon: Users, exact: false },
];

const NavItem = ({ to, label, icon: Icon, exact, onClick }) => (
  <NavLink
    to={to}
    end={exact}
    onClick={onClick}
    className={({ isActive }) =>
      [
        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
        isActive
          ? "bg-white text-black [&_svg]:text-black"
          : "text-gray-300 hover:bg-gray-900 hover:text-white [&_svg]:text-gray-400",
      ].join(" ")
    }
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
);

const SidebarInner = ({ onLinkClick, onLogout }) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="p-6 border-b border-gray-800">
      <Link to="/admin" onClick={onLinkClick}>
        <h1 className="text-2xl font-bold tracking-wide text-white">
          ShopSwift <span className="font-light text-gray-400">Admin</span>
        </h1>
      </Link>
      <p className="text-xs text-gray-500 mt-1">Management Panel</p>
    </div>

    {/* Navigation */}
    <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {NAV_LINKS.map((link) => (
        <NavItem key={link.to} {...link} onClick={onLinkClick} />
      ))}

      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-900 hover:text-white transition-all border border-gray-800 mt-3"
      >
        <Store size={18} className="text-gray-400" />
        <span>Open Store</span>
      </a>
    </nav>

    {/* Logout */}
    <div className="p-4 border-t border-gray-800">
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-all"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  </div>
);

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const close = () => setIsOpen(false);

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black text-white  flex items-center justify-between px-4 h-14">
        <span className="text-base font-bold">ShopSwift Admin</span>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-black border-r border-gray-800 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarInner onLinkClick={close} onLogout={handleLogout} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 bg-black border-r border-gray-800 z-30">
        <SidebarInner onLinkClick={undefined} onLogout={handleLogout} />
      </aside>
    </>
  );
};

export default AdminSidebar;
