"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { logout, resendOTP, verifyOTP } from "@/lib/features/auth/authActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

function Page() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRef = useRef<HTMLInputElement[]>(Array(6).fill(null));
  const router = useRouter();

  const { toast } = useToast();
  const status = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  function handleChange(input: string, index: number) {
    if (isNaN(Number(input))) {
      return;
    }
    const newPin = [...otp];
    newPin[index] = input;
    setOtp(newPin);

    if (input.length === 1 && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  }

  async function handleBackspace(
    e: React.KeyboardEvent<HTMLElement>,
    index: number
  ) {
    const newPin = [...otp];
    if (e.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
        inputRef.current[index - 1].select();
        newPin[index] = "";
        setOtp(newPin);
      }
    }
  }
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    dispatch(verifyOTP({ otp: otp.join("") })).then((payload) => {
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
  function handleResend(e: SyntheticEvent) {
    e.preventDefault();
    dispatch(resendOTP()).then((payload) => {
      if (payload.payload.success) {
        toast({
          description: payload.payload.message,
          variant: "default",
        });
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-t to-[#FFFFFF] from-[#AFA3FF]">
      <div className="relative md:w-[480px] w-11/12  bg-white rounded-md shadow-sm flex flex-col justify-center gap-6 p-10 ">
        <Button
          className="absolute right-0 top-0 rotate-180"
          variant="link"
          onClick={() => {
            dispatch(logout()).then((data) => {
              if (data.payload.success) {
                router.refresh();
                router.push("/login");
              }
            });
          }}
        >
          <LogOut strokeWidth={1.5} size={16} color="#ef4444" />
        </Button>
        <h1 className=" text-2xl md:text-3xl font-semibold text-center ">
          Welcome to <span className="text-[#4534AC]">Workflo</span>!
        </h1>
        <form className="flex flex-col gap-6 ">
          <div className="grid grid-cols-6 gap-4  py-3 px-2 bg-gray-100 rounded-md">
            {Array(6)
              .fill("")
              .map((_, i) => {
                return (
                  <input
                    ref={(ref) => {
                      inputRef.current[i] = ref as HTMLInputElement;
                    }}
                    maxLength={1}
                    key={i}
                    inputMode="numeric"
                    className=" active:outline-1 focus:outline-1 text-center outline-none p-2 selection:bg-gray-200"
                    value={otp[i]}
                    onChange={(e) => {
                      handleChange(e.target.value, i);
                    }}
                    onKeyUp={(e) => {
                      handleBackspace(e, i);
                    }}
                  />
                );
              })}
          </div>
          <div className="flex flex-col ">
            <Button
              className={`rounded-md   py-2 capitalize bg-[#4534AC] text-white hover:bg-[#4634acc6]  transition-colors duration-500 ${
                status === "loading" && "animate-pulse"
              }`}
              onClick={(e) => handleClick(e)}
              disabled={status === "loading"}
            >
              Verify
            </Button>
            <Button
              className="text-xs text-[#4534AC] decoration-[#4534AC]"
              variant="link"
              disabled={status === "loading"}
              onClick={(e) => {
                handleResend(e);
              }}
            >
              resend otp?
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
