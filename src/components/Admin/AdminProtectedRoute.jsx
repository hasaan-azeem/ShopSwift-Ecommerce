import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.admin);
  // FIX: After page refresh Redux state is empty, but adminSlice now rehydrates from localStorage.
  // This check is a safety net — if adminSlice initial state loaded correctly, admin will be set.
  // If somehow it's null but token exists, allow access (token will be validated by API calls).
  const hasToken = !!localStorage.getItem("adminToken");

  if (!admin && !hasToken) return <Navigate to="/admin/login" replace />;
  return children;
};

export default AdminProtectedRoute;
