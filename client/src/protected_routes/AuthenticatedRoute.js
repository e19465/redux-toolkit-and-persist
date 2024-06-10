import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthenticatedRoute = () => {
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthenticatedRoute;
