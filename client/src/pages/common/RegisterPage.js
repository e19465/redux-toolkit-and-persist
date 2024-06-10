import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../state/features/auth/authApiSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const errorRef = useRef();
  const [error, setError] = useState(null);
  const [register, { isLoading }] = useRegisterMutation();
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await register(details).unwrap();
      alert(response.message);
      setDetails({ username: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      const errorMessage = err?.data?.error || "An error occurred";
      alert(errorMessage);
      setError(errorMessage);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
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
                value={details.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={details.email}
                onChange={handleChange}
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
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={details.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>

          {/* Link to go to login page */}
          <div className="text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
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

export default RegisterPage;
