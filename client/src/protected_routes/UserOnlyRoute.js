import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserOnlyRoute = () => {
  const { user } = useSelector((store) => store.auth);
  return !user.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default UserOnlyRoute;
