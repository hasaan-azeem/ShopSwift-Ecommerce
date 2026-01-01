import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/store/Home";
import ProductDetail from "./pages/store/ProductDetail";
import Cart from "./pages/store/Cart";
import StripeCheckout from "./pages/store/StripeCheckout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/users/Profile";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";

import UserProtectedRoute from "./components/Client/UserProtectedRoute";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import AdminCategories from "./pages/admin/AdminCategories";

import gsap from "gsap";
import Loader from "./components/Common/Loader";
import { Toaster } from "sonner";
// import Loader from "./components/BoxLoader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake load delay to simulate page refresh
    setTimeout(() => {
      gsap.to("#app-loader", {
        opacity: 0,
        duration: 0.6,
        onComplete: () => setLoading(false),
      });
    }, 1900); // Adjust time if needed
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Toaster
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* User Store */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <StripeCheckout />
            </UserProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Dashboard */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminUsers />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminProtectedRoute>
              <AdminCategories />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
