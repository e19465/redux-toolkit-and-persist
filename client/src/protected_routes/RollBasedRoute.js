import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleBasedRoute = ({ role }) => {
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);
  return user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RoleBasedRoute;
