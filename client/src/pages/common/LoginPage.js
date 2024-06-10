import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../state/features/auth/authSlice";
import { useLoginMutation } from "../../state/features/auth/authApiSlice";
import { useEffect, useRef, useState } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const errorRef = useRef();
  const [login, { isLoading }] = useLoginMutation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  //! function to handle input change
  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  //! useEffect to focus on the username input field when the page loads
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  //! function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(credentials).unwrap();
      dispatch(loginSuccess(userData));
      setCredentials({ username: "", password: "" });
      navigate("/");
    } catch (err) {
      const errorMessage = err?.data?.error || "An error occurred";
      alert(errorMessage);
      setError(errorMessage);
      errorRef.current.focus();
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                ref={usernameRef}
                value={credentials.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </div>

          {/* Link to go to register page */}
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
          {/* Render error message if there is one */}
          <div
            className="sr-only"
            id="error-msg"
            tabIndex="-1"
            ref={errorRef}
            aria-live="polite"
          >
            {error}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
