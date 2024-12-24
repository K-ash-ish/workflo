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
import { LogOut, Menu } from "lucide-react";
import { logout } from "@/lib/features/auth/authActions";
import { useToast } from "./hooks/use-toast";
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
      className={`md:relative fixed top-0 left-0 bg-white min-h-screen md:w-[250px] z-20 h-full  border-r border-[#DEDEDE]  py-2 px-2 md:p-3 flex flex-col   md:items-stretch gap-2 transition-all duration-700 ease-in-out
       ${isSidebarOpen ? "absolute w-[250px] " : " w-[70px]"} 
        `}
    >
      <button
        className="p-2 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu strokeWidth={1.5} />
      </button>
      <div
        className={` flex md:flex-row md:justify-start md:items-center md:gap-4 transition-all ease-in-out duration-700 px-2  ${
          isSidebarOpen ? "gap-4" : "relative flex-col justify-center gap-2  "
        } `}
      >
        {profilePicture}
        <h3
          className={`font-medium capitalize md:opacity-100  md:relative whitespace-nowrap ${
            isSidebarOpen ? "opacity-100" : "opacity-0 absolute "
          } `}
        >
          {user.userName}
        </h3>
      </div>
      {/* <Button
        variant="default"
        className="flex gap-2 items-center justify-center text-white bg-gradient-to-t from-[#342592] to-[#5747B9] capitalize  "
        onClick={() => {
          openModal();
        }}
      >
        Create new task{" "}
        <span className="bg-white text-black w-5 h-5 rounded-full ">+</span>
      </Button> */}
      <ul className={`flex flex-col gap-2 mt-2`}>
        {navElements?.map((navItem) => {
          return (
            <li key={navItem.to}>
              <Link
                href={navItem.to}
                className={`capitalize  rounded flex md:flex-row md:justify-start md:items-center gap-2 p-2  text-black transition-all duration-700 ease-in-out md:relative
                ${pathname === navItem.to ? "bg-[#f4f4f4] shadow " : ""}
                ${isSidebarOpen ? "justify-start" : "flex-col justify-center "}
                `}
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center ">
                  <IconWrapper
                    icon={navItem.icon}
                    strokeWidth={1.5}
                    color="#000000"
                  />
                </div>
                <span
                  className={`whitespace-nowrap md:opacity-100 md:relative ${
                    isSidebarOpen ? "opacity-100" : "opacity-0 absolute"
                  }`}
                >
                  {navItem.name}
                </span>
              </Link>
            </li>
          );
        })}
        <button
          className={`capitalize  flex md:flex-row md:items-center gap-2 p-2  text-black transition-all duration-500 ease-in-out md:relative ${
            isSidebarOpen ? "justify-start" : "flex-col justify-start "
          }
            `}
          onClick={() => {
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
          }}
        >
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-700 ease-in-out">
            <LogOut strokeWidth={1.5} color="#000000" />
          </div>
          <span
            className={`whitespace-nowrap md:opacity-100 md:relative ${
              isSidebarOpen ? "opacity-100" : "absolute opacity-0"
            }`}
          >
            Logout
          </span>
        </button>
      </ul>
    </nav>
  );
}

export default Sidenav;
