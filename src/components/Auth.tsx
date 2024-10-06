"use client";
import { AuthInputField } from "./ui/AuthInputField";
import { Credentials } from "@/types/credentials";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { login, signup } from "@/lib/features/auth/authActions";

function Auth({ authType }: Readonly<{ authType: string }>) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<Credentials>(
    {} as Credentials
  );

  function handleInput(inputValue: string, valueToUpdate: string) {
    setCredentials((prevValue) => {
      return { ...prevValue, [valueToUpdate]: inputValue };
    });
  }
  function handleClick(
    e: React.FormEvent<HTMLFormElement>,

    authType: string
  ) {
    e.preventDefault();
    if (authType === "login") {
      dispatch(
        login({ email: credentials.email, password: credentials.password })
      );
    } else {
      dispatch(
        signup({
          email: credentials.email,
          password: credentials.password,
          name: credentials.name,
        })
      );
    }
    setCredentials({} as Credentials);
  }

  // if (success) {
  //   redirect("/dashboard");
  // }
  return (
    <div className="md:w-[480px] w-5/6 min-h-[360px] bg-white rounded-md border-2 flex flex-col justify-center gap-6 p-10 ">
      <h1 className=" text-2xl md:text-3xl font-semibold text-center ">
        Welcome to <span className="text-[#4534AC]">Workflo</span>!
      </h1>
      <form
        className="flex flex-col gap-6 "
        onSubmit={(e) => handleClick(e, authType)}
      >
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
        >
          {authType}
        </button>
      </form>

      <p className="text-center text-[#606060] md:text-base text-sm">
        {authType === "login" ? (
          <>
            Don't have an account? Create a{" "}
            <button
              onClick={() => {
                router.push("/signup");
              }}
              className="text-blue-600"
            >
              new account
            </button>
          </>
        ) : (
          <>
            Already have an account?
            <button
              className="text-blue-600"
              onClick={() => {
                router.push("/login");
              }}
            >
              Log in
            </button>
          </>
        )}
        .
      </p>
    </div>
  );
}

export default Auth;
