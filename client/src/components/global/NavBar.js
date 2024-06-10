import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../state/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {user.isAdmin && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Users
            </NavLink>
          )}
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            Posts
          </NavLink>
        </div>
        <button
          onClick={() => {
            dispatch(logOut());
            navigate("/login");
          }}
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
