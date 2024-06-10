import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/api/user/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApiSlice;
