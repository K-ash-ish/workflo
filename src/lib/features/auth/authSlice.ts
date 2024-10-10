import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, logout, signup, verifyToken } from "./authActions";
import { RootState } from "@/lib/store";

interface InitialState {
  isLoggedIn: boolean;
  userName: string;
  userPicture: string;
  status: "idle" | "loading" | "failed";
  error: string;
}

const InitialState: InitialState = {
  isLoggedIn: false,
  userName: "",
  userPicture: "",
  status: "idle",
  error: "",
};

export const authSlice = createSlice({
  initialState: InitialState,
  name: "users",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, () => {
      return InitialState;
    });
    builder.addMatcher(
      isAnyOf(login.pending, signup.pending, logout.pending),
      (state) => {
        state.status = "loading";
      }
    );
    builder.addMatcher(
      isAnyOf(login.fulfilled, signup.fulfilled, verifyToken.fulfilled),
      (state, action) => {
        state.status = "idle";
        if (!action.payload.success) {
          if (action.type === login.fulfilled.type)
            state.error = "Incorrect email/ password";
        } else if (action.type === signup.fulfilled.type) {
          state.error = action.payload.message;
        } else {
          state.userName = action.payload.data.name;
          state.isLoggedIn = true;
        }
      }
    );
    builder.addMatcher(
      isAnyOf(login.rejected, signup.rejected, logout.rejected),
      (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong";
      }
    );
  },
});

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
