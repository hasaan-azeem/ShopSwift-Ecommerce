import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import gsap from "gsap";
import { Toaster } from "sonner";
import { fetchProfile } from "./redux/authSlice";

import Home from "./pages/store/Home";
import ProductDetail from "./pages/store/ProductDetail";
import Cart from "./pages/store/Cart";
import StripeCheckout from "./pages/store/StripeCheckout";
import CollectionPage from "./pages/store/CollectionPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/users/Profile";
import GoogleAuthSuccess from "./pages/auth/GoogleAuthSuccess";
import AdminLogin from "./pages/auth/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";
import Navigation from "./pages/admin/Navigation";
import UserLayout from "./components/Client/Layout/UserLayout";
import UserProtectedRoute from "./components/Client/UserProtectedRoute";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import Loader from "./components/Client/Common/Loader";
import OrderConfirmation from "./pages/store/OrderConfirmation";
import OrderDetailsPage from "./pages/store/OrderDetailsPage";
import MyOrdersPage from "./pages/users/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchProfile());
    }

    setTimeout(() => {
      gsap.to("#app-loader", {
        opacity: 0,
        duration: 0.6,
        onComplete: () => setLoading(false),
      });
    }, 1900);
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Router>
      <Toaster position="top-right" theme="light" />
      <Routes>
        {/* Google OAuth success */}

        {/* User Store */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collections/:collection" element={<CollectionPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<StripeCheckout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          {/* FIX: Added leading slash to order/:id route */}
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route
            path="/profile"
            element={
              <UserProtectedRoute>
                <Profile />
              </UserProtectedRoute>
            }
          />
          <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
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
                <Navigation />
              </AdminProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
