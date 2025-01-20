"use client";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { logout, verifyToken } from "@/lib/features/auth/authActions";
import { selectUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { User2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Features } from "@/components/Features";
import TaskBoardAnimation from "@/components/ui/TaskBoardAnimation";

const homeNavItem = ["home", "features", "about"];

export default function Home() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const router = useRouter();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  const userLogout = async () => {
    dispatch(logout()).then((data) => {
      if (data.payload.success) {
        toast({
          description: "Logout successfull",
        });
        router.refresh();
        router.push("/login");
      } else {
        toast({
          title: "uh! oh",
          description: data.payload.message,
          variant: "destructive",
        });
      }
    });
  };
  console.log(user);
  return (
    <div className="h-dvh w-full scroll-smooth bg-gray-100 ">
      <div className="h-14 md:h-16 z-10 shadow  backdrop-blur-lg rounded-b-xl fixed top-0 left-0 right-0  bg-transparent w-full flex justify-between items-center px-4  ">
        <div className=" flex gap-2 md:gap-4 md:text-lg text-sm font-medium text-gray-500">
          {homeNavItem.map((item) => (
            <button
              key={item}
              className="capitalize"
              onClick={() => scrollToSection(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {user.isLoggedIn ? (
          <Button
            variant="outline"
            className="text-gray-500"
            onClick={userLogout}
          >
            Logout
          </Button>
        ) : (
          <Button variant="outline" className="ml-auto ">
            <Link
              href={"/login"}
              className="flex items-center justify-center gap-1 font-light"
            >
              <User2 size={18} strokeWidth={1} /> Login
            </Link>
          </Button>
        )}
      </div>
      <section
        id="home"
        className=" h-dvh w-full flex flex-col justify-center md:mt-4 "
      >
        <div className="flex flex-col items-center justify-center   md:flex-row  md:items-center md:justify-around text-center w-11/12 lg:h-5/6 sm:h-[70%] h-5/6  rounded-xl shadow-md shadow-gray-200 mx-auto px-4 py-4 bg-white  ">
          <div className="  flex flex-col items-center justify-center gap-8  md:h-full">
            <div className=" flex flex-col gap-4 items-center">
              <h1 className="w-full font-bold lg:text-5xl text-[2rem] text-center  animate-fade-up-300 opacity-0 text-nowrap ">
                Welcome to Work<span className="text-[#AFA3FF]">Flo</span>
              </h1>
              <p className="w-full md:font-thin font-extralight text-[#5A5A5A] lg:text-3xl text-xl md:w-3/4 animate-fade-up-500  opacity-0">
                Your go-to Kanban board for individual and team projects.
              </p>
            </div>
            <div className=" flex flex-row gap-6 items-center justify-center animate-fade-up-700 opacity-0">
              <Button className="bg-white border text-black hover:bg-gray-100 font-light lg:text-lg text-sm p-4 lg:py-6 ">
                <Link href={"/dashboard"}>Create for Individual</Link>
              </Button>

              <Button className="bg-[#AFA3FF] border text-gray-900 hover:bg-[#AFA3FF]/[0.9] font-light lg:text-lg text-sm p-4 lg:py-6">
                <Link href={"/"}>Create for a Team</Link>
              </Button>
            </div>
          </div>
          <TaskBoardAnimation />
        </div>
      </section>
      <section className="py-16  min-h-5/6 md:h-dvh   " id="features">
        <Features />
      </section>
      <section
        id="about"
        className="bg-gray-800 w-full mx-auto py-6 px-4 sm:px-6 lg:py-16 lg:px-8 "
      >
        <Footer />
      </section>
    </div>
  );
}
