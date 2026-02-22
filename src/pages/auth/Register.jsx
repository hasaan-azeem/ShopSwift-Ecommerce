import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password Match Validation
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    setPasswordError("");

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 overflow-hidden">
        <main className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mb-12 px-6 gap-10">
          {/* Form Section */}
          <div className="w-full my-6 md:w-1/2 order-2 md:order-1">
            <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
              Create an Account
            </h2>

            <form
              onSubmit={handleRegister}
              className="space-y-5 max-w-sm mx-auto md:mx-0"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Adam Joe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@gmail.com"
                  value={email}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm pr-10 focus:ring-2 focus:ring-black focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-black"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm pr-10 focus:ring-2 focus:ring-black focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-black"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>

              {/* Password Error */}
              {passwordError && (
                <p className="text-red-500 text-sm text-center">
                  {passwordError}
                </p>
              )}

              {/* Server Error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Creating Account..." : "Register"}
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
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-black font-medium hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 bg-black text-white p-8 rounded-lg order-1 md:order-2">
            <h3 className="text-xl font-semibold mb-2">Why Join Us?</h3>
            <p className="text-sm text-gray-300 mb-6">
              Create your ShopSwift account to track orders, save favorites, and
              enjoy faster checkout. Join our movement for sustainable fashion
              and ethical shopping.
            </p>
            <button className="w-full border-2 border-white py-2 rounded-md text-sm font-medium hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
