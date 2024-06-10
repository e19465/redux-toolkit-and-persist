import { AdminHomePage } from "../pages/admin";
import { UserHomePage } from "../pages/user";
import { useSelector } from "react-redux";

const RoleBasedHomeRoute = () => {
  const { user } = useSelector((store) => store.auth);
  if (user.isAdmin) {
    return <AdminHomePage />;
  } else {
    return <UserHomePage />;
  }
};

export default RoleBasedHomeRoute;
