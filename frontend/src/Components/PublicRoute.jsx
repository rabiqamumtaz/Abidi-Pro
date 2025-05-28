import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAutoLogin from "../Hooks/useAutoLogin";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  useAutoLogin(); 

  if (loading) {
    return <div className="text-white text-center mt-10">Checking session...</div>;
  }

  return isAuthenticated ? <Navigate to="/people" /> : children;
};

export default PublicRoute;
