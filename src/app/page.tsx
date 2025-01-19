"use client";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { verifyToken } from "@/lib/features/auth/authActions";
import { selectUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";
export default function Home() {
  const user = useAppSelector(selectUser);

  const router = useRouter();
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(verifyToken());
  }, []);
  return (
    <div className="h-dvh w-full  ">
      {/* <div className="flex justify-between md:justify-end md:gap-4 items-center">
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
      </div> */}
      <section className=" h-screen w-full flex flex-col justify-center bg-gray-100 ">
        <div className="flex flex-col items-center justify-center   md:flex-row  md:items-center md:justify-around text-center w-11/12 h-5/6  rounded-xl shadow-md shadow-gray-200 mx-auto px-4 py-4 bg-white  ">
          <div className="  flex flex-col items-center justify-center  gap-6 ">
            <h1 className="font-bold md:text-5xl text-3xl text-center  animate-fade-up-300 opacity-0 text-nowrap ">
              Welcome to Work<span className="text-[#AFA3FF]">Flo</span>
            </h1>
            <p className="md:font-thin font-extralight text-[#5A5A5A] md:text-2xl text-xl md:w-3/4 animate-fade-up-500  opacity-0">
              Your go-to Kanban board for individual and team projects.
            </p>
            <div className=" flex md:flex-row flex-col md:gap-10 gap-6 items-center justify-center animate-fade-up-700 opacity-0">
              <Button className="bg-white border border-black text-black hover:bg-gray-100 font-light md:text-lg text-sm p-4 md:p-6 md:h-6">
                <Link href={"/dashboard"}>Create for Individual</Link>
              </Button>

              <Button className="bg-[#AFA3FF] border border-black text-black hover:bg-[#AFA3FF]/[0.9] font-light md:text-lg text-sm p-4 md:p-6 md:h-6">
                <Link href={"/"}>Create for a Team</Link>
              </Button>
            </div>
          </div>

          <div className="  md:w-1/2 md:h-full ">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 514 384"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
              preserveAspectRatio="xMidYMid meet"
            >
              <g id="TaskBoard">
                <rect width="514" height="384" fill="none" />
                <g id="TaskColumn" className="animate--up ">
                  <rect
                    id="Completed"
                    x="385.375"
                    y="96"
                    width="104.625"
                    height="215"
                    rx="4"
                    fill="#DCFCE7"
                  />
                  <rect
                    id="UnderReview"
                    x="262.365"
                    y="96"
                    width="104.625"
                    height="215"
                    rx="4"
                    fill="#CFFAFE"
                  />
                  <rect
                    id="InProgress"
                    x="139.799"
                    y="96"
                    width="104.625"
                    height="215"
                    rx="4"
                    fill="#FEF9C3"
                  />
                  <rect
                    id="ToDo"
                    x="23"
                    y="96"
                    width="104.625"
                    height="215"
                    rx="4"
                    fill="#FEE2E2"
                  />
                </g>
                <g id="TaskCards">
                  <rect
                    id="Task1"
                    x="43"
                    y="126"
                    width="64"
                    height="38.0282"
                    rx="4"
                    fill="white"
                  />

                  <motion.rect
                    id="Task2"
                    x="43"
                    y="177.972"
                    width="64"
                    height="38.0282"
                    rx="4"
                    fill="white"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                      scale: [1, 1.2, 1.2, 1.2, 1.2, 1.2, 1],
                      x: [
                        0, 0, 118.4865, 118.4865, 241.0525, 364.0625, 364.0625,
                      ],
                      y: [0, 0, -51.972, -51.972, -51.972],
                    }}
                    transition={{
                      duration: 6,
                      ease: "easeInOut",
                      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    }}
                  />
                </g>
              </g>
            </svg>
          </div>
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
