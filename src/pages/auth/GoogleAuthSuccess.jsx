import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/authSlice";

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      dispatch(fetchProfile()).then(() => {
        navigate("/", { replace: true });
      });
    } else {
      navigate("/login?error=google", { replace: true });
    }
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg animate-pulse">
        Signing you in with Google...
      </p>
    </div>
  );
};

export default GoogleAuthSuccess;
