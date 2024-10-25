"use client";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { logout, verifyToken } from "@/lib/features/auth/authActions";
import { selectUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const user = useAppSelector(selectUser);

  const router = useRouter();
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyToken());
  }, []);
  return (
    <div className="h-screen flex flex-col gap-10">
      <div className="w-full h-20 shadow-md flex justify-end items-center gap-6 px-8  ">
        <Image
          src="/profile-picture.png"
          width={0}
          height={0}
          alt="Profile Picture"
          className="rounded-xl w-8 h-8 object-cover"
        />
        <h4 className="text-2xl font-thin capitalize flex items-center gap-1">
          Hello <span className="animate-wiggle">👋</span> {user.userName}!
        </h4>

        <Button
          variant="outline"
          className="text-red-500 font-semibold "
          onClick={() => {
            dispatch(logout()).then((data) => {
              if (data.payload.success) {
                toast({
                  title: "Success",
                  description: "Logout successfull",
                });
                router.push("/login");
              } else {
                toast({
                  title: "uh! oh",
                  description: data.payload.message,
                  variant: "destructive",
                });
              }
            });
          }}
        >
          Logout
        </Button>
      </div>
      <section className=" h-screen flex flex-col ">
        <div className="flex flex-col h-1/2 items-center justify-center gap-10  w-full text-center">
          <h1 className="font-bold text-6xl">
            Welcome to Work<span className="text-[#AFA3FF]">Flo</span>
          </h1>
          <p className="font-thin text-[#5A5A5A] text-3xl w-1/3   ">
            Your go-to Kanban board for individual and team projects.
          </p>
        </div>
        <div className=" flex gap-10 items-center justify-center">
          <Button className="bg-white text-black border border-black hover:bg-gray-100 font-light text-lg">
            Create for Individual
          </Button>
          <Button className="bg-[#AFA3FF] text-black border border-black hover:bg-[#AFA3FF]/[0.9] font-light text-lg">
            Create for a Team
          </Button>
        </div>
      </section>
    </div>
  );
}
