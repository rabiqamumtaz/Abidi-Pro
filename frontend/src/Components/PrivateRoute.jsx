import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;