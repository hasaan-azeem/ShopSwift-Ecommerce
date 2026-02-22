import { Link } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header className="w-full bg-white fixed top-0 left-0 border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-6">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-wide text-gray-900"
          >
            ShopSwift
          </Link>

          <nav className="hidden md:flex space-x-10 text-gray-700 font-medium">
            <Link
              to="/collections/men"
              className="hover:text-teal-600 transition"
            >
              Men
            </Link>
            <Link
              to="/collections/women"
              className="hover:text-teal-600 transition"
            >
              Women
            </Link>
            <Link
              to="/collections/kids"
              className="hover:text-teal-600 transition"
            >
              Kids
            </Link>
          </nav>

          <div className="flex items-center space-x-4 text-gray-700">
            {/* <Link to="/admin" className="block bg-black px-2 rounded text-sm text-white">Admin</Link> */}

            {/* User icon — avatar if logged in with Google, initial if email, login icon if not logged in */}
            <Link
              to={user ? "/profile" : "/login"}
              className="hover:text-teal-600 transition"
            >
              {user?.avatar ? (
                // FIX: referrerPolicy="no-referrer" required for Google avatar URLs
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : user ? (
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <FiUser className="h-6 w-6" />
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="relative hover:text-teal-600 transition"
            >
              <HiOutlineShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="bg-red-400 text-white text-xs rounded-full px-1.5 py-0.5 absolute -top-1 -right-1 min-w-[18px] text-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="overflow-hidden">
              <SearchBar />
            </div>

            <button
              className="md:hidden hover:text-teal-600 transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Menu</h3>
          <button onClick={() => setMobileOpen(false)}>
            <FiX className="text-2xl" />
          </button>
        </div>
        <nav className="flex flex-col mt-6 space-y-6 text-gray-800 font-medium px-6 text-lg">
          <Link to="/collections/men" onClick={() => setMobileOpen(false)}>
            Men
          </Link>
          <Link to="/collections/women" onClick={() => setMobileOpen(false)}>
            Women
          </Link>
          <Link to="/collections/kids" onClick={() => setMobileOpen(false)}>
            Kids
          </Link>
        </nav>
      </aside>

      <CartDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default Header;
