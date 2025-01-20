"use client";
import { AuthInputField } from "./ui/AuthInputField";
import { Credentials } from "@/types/credentials";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login, signup } from "@/lib/features/auth/authActions";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";
import { Button } from "./ui/button";

function Auth({ authType }: Readonly<{ authType: string }>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState<Credentials>(
    {} as Credentials
  );
  const status = useAppSelector((state) => state.auth.status);
  const { toast } = useToast();

  function handleInput(inputValue: string, valueToUpdate: string) {
    setCredentials((prevValue) => {
      return { ...prevValue, [valueToUpdate]: inputValue };
    });
  }
  async function handleClick(
    e: React.FormEvent<HTMLFormElement>,

    authType: string
  ) {
    e.preventDefault();
    const { email, password, name } = credentials;
    const action =
      authType === "login"
        ? login({ email, password })
        : signup({
            email,
            password,
            name,
          });
    dispatch(action).then((payload) => {
      if (payload.payload.success) {
        toast({
          description: payload.payload.message,
          variant: "default",
        });
        router.refresh();
        router.push("/");
      } else {
        toast({
          title: "Uh oh!",
          description: payload.payload.message,
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="md:w-[480px] w-11/12 min-h-[360px] bg-white rounded-md shadow-sm flex flex-col justify-center gap-6 p-10 ">
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
            id="name"
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
        <Button
          type="submit"
          disabled={status === "loading"}
          className={`rounded-md   py-2 capitalize bg-[#4534AC] text-white hover:bg-[#4634acc6]  transition-colors duration-500`}
        >
          {status === "idle" ? authType : "loading"}
        </Button>
      </form>

      <div className="text-center text-[#606060] md:text-base text-sm">
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
            Already have an account?{" "}
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="text-blue-600"
            >
              Log in
            </button>
          </>
        )}
        .
      </div>
    </div>
  );
}

export default Auth;
