"use client";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import TaskModal from "@/components/ui/TaskModal";
import { logout, verifyToken } from "@/lib/features/auth/authActions";
import { selectUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
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
    <div className="h-dvh w-full flex flex-col gap-5 md:gap-10 py-4 px-2">
      <div className="flex justify-between md:justify-end md:gap-4 items-center">
        <Image
          src="/profile-picture.png"
          width={0}
          height={0}
          alt="Profile Picture"
          className="rounded-xl w-8 h-8 object-cover"
        />
        <h4 className="text-xl capitalize">
          Hello <span className="animate-wiggle">👋</span> {user.userName}!
        </h4>
      </div>
      <section className=" flex-1 flex flex-col justify-evenly ">
        <div className=" flex flex-col items-center gap-6">
          <h1 className="font-bold md:text-6xl text-4xl ">
            Welcome to Work<span className="text-[#AFA3FF]">Flo</span>
          </h1>
          <p className="md:font-thin font-extralight text-[#5A5A5A] md:text-3xl md:w-3/4 text-center    ">
            Your go-to Kanban board for individual and team projects.
          </p>
        </div>
        <div className=" flex md:gap-10 gap-6 items-center justify-center">
          <Button className="bg-white text-black border border-black hover:bg-gray-100 font-light md:text-lg text-xs p-4 md:p-6 h-6">
            <Link href={"/dashboard"}>Create for Individual</Link>
          </Button>

          <Button className="bg-[#AFA3FF] text-black border border-black hover:bg-[#AFA3FF]/[0.9] font-light md:text-lg text-xs p-4 md:p-6 h-6">
            <Link href={"/"}>Create for a Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
// <Button
//   variant="outline"
//   className="text-red-500 font-semibold "
//   onClick={() => {
//     dispatch(logout()).then((data) => {
//       if (data.payload.success) {
//         toast({
//           description: "Logout successfull",
//         });
//         router.refresh();
//         router.push("/login");
//       } else {
//         toast({
//           title: "uh! oh",
//           description: data.payload.message,
//           variant: "destructive",
//         });
//       }
//     });
//   }}
// >
//   Logout
// </Button>
