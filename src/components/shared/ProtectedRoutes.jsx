import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// ProtectedRoute component
const ProtectedRoute = ({ element: Element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Access login state from Redux
  return isLoggedIn ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;