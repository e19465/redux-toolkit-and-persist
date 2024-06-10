import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  access: null,
  refresh: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { access, refresh } = action.payload;
      state.access = access;
      state.refresh = refresh;
      const base64Url = access.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const payloadObject = JSON.parse(jsonPayload);
      state.user = payloadObject;
    },
    logOut: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;
