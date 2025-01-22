import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  login,
  logout,
  resendOTP,
  signup,
  verifyOTP,
  verifyToken,
} from "./authActions";
import { RootState } from "@/lib/store";

interface InitialState {
  isLoggedIn: boolean;
  userName: string;
  userPicture: string;
  status: "idle" | "loading" | "failed" | "succeeded";
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
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(resendOTP.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addMatcher(
      isAnyOf(
        login.pending,
        signup.pending,
        logout.pending,
        verifyToken.pending,
        verifyOTP.pending,
        resendOTP.pending
      ),
      (state) => {
        state.status = "loading";
      }
    );
    builder.addMatcher(
      isAnyOf(login.fulfilled, signup.fulfilled, verifyToken.fulfilled),
      (state, action) => {
        state.status = "succeeded";
        if (!action.payload.success) {
          state.error = action.payload.message;
        } else {
          state.userName = action.payload.data.name;
          state.error = "";
          state.isLoggedIn = true;
        }
      }
    );
    builder.addMatcher(
      isAnyOf(
        login.rejected,
        signup.rejected,
        logout.rejected,
        verifyToken.rejected,
        verifyOTP.rejected,
        resendOTP.rejected
      ),
      (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong";
      }
    );
  },
});

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
