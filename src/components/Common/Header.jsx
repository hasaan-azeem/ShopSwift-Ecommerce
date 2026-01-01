import { Link } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";
import SearchBar from "./SearchBar";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // cart
  const [mobileOpen, setMobileOpen] = useState(false); // mobile nav

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Navbar */}
      <header className="w-full bg-white fixed top-0 left-0 border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold tracking-wide text-gray-900">
            ShopSwift
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 text-gray-700 font-medium">
            <Link to="/men" className="hover:text-teal-600 transition">Men</Link>
            <Link to="/women" className="hover:text-teal-600 transition">Women</Link>
            <Link to="/kids" className="hover:text-teal-600 transition">Kids</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-gray-700">
            <Link to="/profile" className="hover:text-teal-600 transition">
              <FiUser className="h-6 w-6" />
            </Link>

            {/* Cart Button */}
            <button onClick={toggleDrawer} className="relative hover:text-teal-600 transition">
              <HiOutlineShoppingBag className="h-6 w-6" />
              <span className="bg-red-400 text-white text-xs rounded-full px-2 py-0.5 absolute -top-1">
                2
              </span>
            </button>

            {/* Search */}
            <div className="overflow-hidden">
              <SearchBar />
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden hover:text-teal-600 transition" onClick={toggleMobile}>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlays */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleMobile}
        />
      )}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleDrawer}
        />
      )}

      {/* Mobile Navigation Drawer – Left Side */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
          <button className="text-2xl text-gray-700 hover:text-teal-600" onClick={toggleMobile}>
            <FiX />
          </button>
        </div>

        <h4 className="mt-6 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Categories
        </h4>

        <nav className="flex flex-col mt-3 space-y-6 text-gray-800 font-medium px-6 text-lg">
          <Link to="/men" onClick={toggleMobile}>Men</Link>
          <Link to="/women" onClick={toggleMobile}>Women</Link>
          <Link to="/kids" onClick={toggleMobile}>Kids</Link>
        </nav>
      </aside>

      {/* Cart Drawer – Right Side */}
      <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Header;
