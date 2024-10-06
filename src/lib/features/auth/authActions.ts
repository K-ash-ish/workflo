import { Credentials } from "@/types/credentials";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: Partial<Credentials>, { rejectWithValue }) => {
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/login`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => res.json());
    } catch (error) {
      console.log("Error while login ", error);
      return rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, name }: Credentials, { rejectWithValue }) => {
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/signup`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      }).then((res) => res.json());
    } catch (error) {
      console.log("Error while login ", error);
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    } catch (error) {
      console.log("Error while logging out ", error);
      return rejectWithValue(error);
    }
  }
);
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/verifyuser`,
        {
          method: "GET",
          credentials: "include",
        }
      ).then((res) => res.json());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
