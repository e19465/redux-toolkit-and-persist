import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginSuccess, logOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.access;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Log the result for debugging
  // console.log("Initial request result:", result);

  if (result?.error?.status === 403) {
    // console.log("Access token expired, refreshing tokens");

    const refreshToken = api.getState().auth.refresh;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/api/user/refresh",
          method: "POST",
          body: { refresh: refreshToken },
          headers: {
            "Content-Type": "application/json",
          },
        },
        api,
        extraOptions
      );

      // Log the refresh result for debugging
      console.log("Refresh result:", refreshResult);

      if (refreshResult?.data) {
        api.dispatch(loginSuccess({ ...refreshResult.data }));
        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
