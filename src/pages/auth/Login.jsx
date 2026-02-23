/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://shopswift-backend-kykw.onrender.com/api/auth/google";
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 relative overflow-hidden">
        {/* Main Section */}
        <main className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mb-12 px-6 gap-10">
          {/* Left: Login Form */}
          <div className="w-full my-16 md:w-1/2 order-2 md:order-1">
            <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
              Sign In
            </h2>

            <form
              onSubmit={handleLogin}
              className="space-y-5 max-w-sm mx-auto md:mx-0"
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="email@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-black focus:border-black pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-black"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  Remember me
                </label>
                <a href="#" className="text-black hover:underline">
                  Password Help?
                </a>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-900 cursor-pointer transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              <p className="text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-black font-medium hover:underline"
                >
                  Create One Now
                </Link>
              </p>
            </form>
          </div>

          {/* Right: Info Section */}
          <div className="w-full md:w-1/2 bg-black text-white p-8 rounded-lg order-1 md:order-2">
            <h3 className="text-xl font-semibold mb-2">
              Looking for your order?
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              See your order even if you are not a registered user. Enter your
              order number and last name to get details instantly.
            </p>
            <button className="w-full border-2 border-white py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black cursor-pointer transition">
              Find Your Order
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
