import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // FIX: If we're still fetching the profile (token exists, request in flight),
  // don't redirect yet — show nothing (or a spinner) until auth resolves.
  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default UserProtectedRoute;
