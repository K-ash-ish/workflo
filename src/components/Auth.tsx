"use client";
import Link from "next/link";
import { AuthInputField } from "./ui/AuthInputField";
import { Credentials } from "@/types/credentials";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

function Auth({ authType }: { authType: string }) {
  const { login, signup, success } = useAuth();
  const [credentials, setCredentials] = useState<Credentials>(
    {} as Credentials
  );

  if (success) {
    console.log("redirecting from auth compe");
    setCredentials({} as Credentials);
    redirect("/dashboard");
  }
  function handleInput(inputValue: string, valueToUpdate: string) {
    setCredentials((prevValue) => {
      return { ...prevValue, [valueToUpdate]: inputValue };
    });
  }
  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    authType: string
  ) {
    e.preventDefault();
    if (authType === "login") {
      console.log("login");
      login(credentials.email, credentials.password);
    } else {
      signup(credentials.email, credentials.password, credentials.text);
      console.log("signup");
    }
  }
  return (
    <div className="md:w-[480px] w-5/6 min-h-[360px] bg-white rounded-md border-2 flex flex-col justify-center gap-6 p-10 ">
      <h1 className=" text-2xl md:text-3xl font-semibold text-center ">
        Welcome to <span className="text-[#4534AC]">Workflo</span>!
      </h1>
      <form className="flex flex-col gap-6 ">
        {authType === "signup" && (
          <AuthInputField
            type="text"
            placeholder="Full name"
            id="fullname"
            handleInput={handleInput}
            credentials={credentials}
            setCredentials={setCredentials}
          />
        )}
        <AuthInputField
          type="email"
          placeholder="Your email"
          id="email"
          handleInput={handleInput}
          credentials={credentials}
          setCredentials={setCredentials}
        />
        <AuthInputField
          type="password"
          placeholder="Password"
          id="password"
          handleInput={handleInput}
          credentials={credentials}
          setCredentials={setCredentials}
        />
        {/* //change gradient when clicked */}
        <button
          type="submit"
          className="rounded-md text-white bg-gradient-to-t from-[#7166B2] to-[#867BCB] active:from-[#342592] active:to-[#5747B9] py-2 capitalize"
          onClick={(e) => handleClick(e, authType)}
        >
          {authType}
        </button>
      </form>

      <p className="text-center text-[#606060] md:text-base text-sm">
        {authType === "login" ? (
          <>
            Don't have an account? Create a
            <Link href="/signup" className="text-blue-600">
              new account
            </Link>
          </>
        ) : (
          <>
            Already have an account?
            <Link href="/login" className="text-blue-600">
              Log in
            </Link>
          </>
        )}
        .
      </p>
    </div>
  );
}

export default Auth;
