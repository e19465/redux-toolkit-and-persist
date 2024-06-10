import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  AuthenticatedRoute,
  RoleBasedHomeRoute,
  AdminOnlyRoute,
  // UserOnlyRoute,
} from "./protected_routes";
import {
  LoginPage,
  PostPage,
  SinglePostPage,
  RegisterPage,
} from "./pages/common";
import { UserListPage } from "./pages/admin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* COMMON ROUTES */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<AuthenticatedRoute />}>
            {/* ROLL BASED HOMEPAGE  */}
            <Route index element={<RoleBasedHomeRoute />} />

            <Route path="/posts">
              <Route index element={<PostPage />} />
              <Route path=":postId" element={<SinglePostPage />} />
            </Route>

            {/* ADMIN ONLY ROUTES */}
            <Route path="/users" element={<AdminOnlyRoute />}>
              <Route index element={<UserListPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
