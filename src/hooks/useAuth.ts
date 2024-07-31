import { useState } from "react";

function useAuth() {
  const [success, setSuccess] = useState(false);
  const login = async (email: string, password: string) => {
    if (!email || !password) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/login`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      ).then((res) => res.json());
      console.log(response, success);
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.log("Error while login ", error);
    }
  };
  const signup = async (email: string, password: string, name: string) => {
    if (!email || !name || !password) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/signup`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }
      ).then((res) => res.json());
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.log("Error while login ", error);
    }
  };
  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/user/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      console.log(response);
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.log("Error while login ", error);
    }
  };
  return { login, signup, logout, success };
}

export default useAuth;
