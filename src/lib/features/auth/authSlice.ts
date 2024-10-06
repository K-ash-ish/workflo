import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signup, verifyToken } from "./authActions";
import { RootState } from "@/lib/store";

interface InitialState {
  isLoggedIn: boolean;
  userName: string;
  userPicture: string;
  status: "idle" | "loading" | "failed";
}

const InitialState: InitialState = {
  isLoggedIn: false,
  userName: "",
  userPicture: "",
  status: "idle",
};

export const authSlice = createSlice({
  initialState: InitialState,
  name: "users",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.userName = action.payload.data.name;
        state.isLoggedIn = true;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      console.log("error from authslice: ", action.payload);
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.userName = action.payload.data.name;
        state.isLoggedIn = true;
      }
    });
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.status = "failed";
      console.log("error authenticating");
    });
    builder.addCase(signup.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.userName = action.payload.data.name;
        state.isLoggedIn = true;
      }
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = "failed";
      console.log("error signing up");
    });
    builder.addCase(logout.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "idle";
      state.isLoggedIn = false;
      state.userName = "";
      state.userPicture = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "failed";
      console.log("error logging out");
    });
  },
});

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
