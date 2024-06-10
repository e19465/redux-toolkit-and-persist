import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (details) => ({
        url: "/api/user/register",
        method: "POST",
        body: { ...details },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
