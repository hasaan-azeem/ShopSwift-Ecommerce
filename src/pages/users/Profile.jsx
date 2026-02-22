import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logout } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Shield, LogOut, Package } from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // FIX: read profileLoading, not loading
  const { user, profileLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // FIX: Only show spinner when profileLoading AND no user yet.
  // If user is already in state, show their data immediately
  // while the fresh fetch runs in the background.
  if (profileLoading && !user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-black flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-white text-3xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  user.role === "admin"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role === "admin" ? "Admin" : "Customer"}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <User size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                  Full Name
                </p>
                <p className="text-gray-800 font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Mail size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                  Email
                </p>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <Shield size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                  Account Type
                </p>
                <p className="text-gray-800 font-medium capitalize">
                  {user.role}
                </p>
              </div>
            </div>

            {user.createdAt && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <Package size={18} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Member Since
                  </p>
                  <p className="text-gray-800 font-medium">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Link
              to="/my-orders"
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition font-medium"
            >
              <Package size={16} />
              My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-500 py-3 rounded-xl hover:bg-red-50 transition font-medium"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
