import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getUsersSuccess } = usersSlice.actions;
export default usersSlice.reducer;
