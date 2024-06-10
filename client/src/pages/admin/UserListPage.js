import MainLayout from "../../layouts/MainLayout";
import { useGetAllUsersQuery } from "../../state/features/users/usersApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsersSuccess } from "../../state/features/users/usersSlice";

const UserListPage = () => {
  const dispatch = useDispatch();
  const { data: users, error, isLoading } = useGetAllUsersQuery();

  useEffect(() => {
    if (users) {
      dispatch(getUsersSuccess(users));
    }
  }, [users, dispatch]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <div className="w-50% h-auto my-4 p-4">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    console.log(error);
    return (
      <MainLayout>
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <div className="w-50% h-auto my-4 p-4">Error: {error.data.error}</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="w-full h-auto flex flex-col justify-center items-center">
        <div className="w-50% h-auto my-4 p-4">
          <h1 className="font-bold text-3xl underline mb-4 text-blue-700">
            User List
          </h1>
          <ul>
            {users.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserListPage;
