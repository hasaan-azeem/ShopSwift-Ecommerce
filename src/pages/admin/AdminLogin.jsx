import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(adminLogin({ email, password })).unwrap();
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#002b36] flex items-center justify-center text-white">
      {/* Split Layout */}
      <div className="w-[90%] max-w-5xl  bg-[#002b36] flex rounded-lg shadow-2xl overflow-hidden border border-[#013846]">
        {/* Left Side - Logo */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10 border-r border-gray-600">
          <div className="flex flex-col items-center">
            {/* Example logo (replace with your SVG or image) */}
           <img src="/Shopping.png" alt="ShopSwift" className="w-80 h-full -mt-10" />
            <h1 className="text-3xl font-semibold -mt-4">ShopSwift</h1>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex flex-col justify-center px-12 py-14">
          <h2 className="text-3xl font-light mb-2">Welcome</h2>
          <p className="text-base text-gray-300 mb-8">
            Please login to Admin Dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Username</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-4 py-2 bg-white text-black rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2 bg-white text-black rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-medium transition ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Signing in..." : "LOGIN"}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a
                href="#"
                className="text-sm text-gray-300 hover:text-orange-400"
              >
                Forgotten your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
