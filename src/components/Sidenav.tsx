"use client";
import { navElements } from "@/constant";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconWrapper } from "./ui/IconWrapper";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/auth/authSlice";
import { ProfilePicLoader } from "./ui/Loader";
import { ChevronRightCircle, LogOut } from "lucide-react";
import { logout } from "@/lib/features/auth/authActions";
import { useToast } from "./hooks/use-toast";
import { Button } from "./ui/button";
function Sidenav({
  isSidebarOpen,
  setIsSidebarOpen,
}: Readonly<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const status = useAppSelector((state) => state.auth.status);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const profilePicture =
    status === "loading" ? (
      <ProfilePicLoader />
    ) : (
      <Image
        src="/profile-picture.png"
        width={0}
        height={0}
        alt="Profile Picture"
        className="flex-shrink-0 rounded-xl w-8 h-8 object-cover"
      />
    );
  return (
    <nav
      className={`md:relative  md:translate-x-0  fixed top-0 left-0 bg-white  w-11/12 md:max-w-[260px]  z-20 min-h-full    border-r border-[#DEDEDE]  py-2 px-2 md:p-3 flex flex-col   md:items-stretch gap-2 transition-all duration-700 ease-in-out
      ${
        isSidebarOpen
          ? "transform translate-x-0"
          : "transform -translate-x-full"
      }
        `}
    >
      <button
        className={`absolute top-0 -right-6 md:hidden  p-2 rounded-full bg-white shadow-md transition-all duration-700 ease-in-out
          ${isSidebarOpen ? "transform rotate-180" : "transform rotate-0"}
          `}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <ChevronRightCircle strokeWidth={1.5} size={25} />
      </button>
      <div
        className={` flex md:flex-row justify-start items-center gap-4 transition-all ease-in-out duration-700 px-2  
        
         `}
      >
        {profilePicture}
        <h3
          className={`font-medium capitalize md:opacity-100  md:relative whitespace-nowrap  `}
        >
          {user.userName}
        </h3>
      </div>

      <Button
        variant="default"
        className="flex gap-2 items-center justify-center text-white bg-gradient-to-t from-[#342592] to-[#5747B9] capitalize  "
        onClick={() => {
          openModal();
        }}
      >
        Create new task{" "}
        <span className="bg-white text-black w-5 h-5 rounded-full ">+</span>
      </Button>
      <ul className={`flex flex-col gap-2 mt-2`}>
        {navElements?.map((navItem) => {
          return (
            <li key={navItem.to}>
              <Link
                href={navItem.to}
                className={`capitalize  rounded flex md:flex-row md:justify-start md:items-center gap-2 p-2  text-black transition-all duration-700 ease-in-out md:relative
                ${pathname === navItem.to ? "bg-[#f4f4f4] shadow " : ""}
                `}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center ">
                  <IconWrapper
                    icon={navItem.icon}
                    strokeWidth={1.5}
                    color="#000000"
                  />
                </div>
                <span
                  className={`whitespace-nowrap md:opacity-100 md:relative  
                  `}
                >
                  {navItem.name}
                </span>
              </Link>
            </li>
          );
        })}
        <button
          className={`capitalize  flex md:flex-row md:items-center gap-2 p-2  text-black transition-all duration-500 ease-in-out md:relative`}
          onClick={() => {
            dispatch(logout()).then((data) => {
              if (data.payload.success) {
                toast({
                  description: "Logout successfull",
                });
                setIsSidebarOpen(!isSidebarOpen);
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
          }}
        >
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-700 ease-in-out">
            <LogOut strokeWidth={1.5} color="#000000" />
          </div>
          <span className={`whitespace-nowrap md:opacity-100 md:relative `}>
            Logout
          </span>
        </button>
      </ul>
    </nav>
  );
}

export default Sidenav;
