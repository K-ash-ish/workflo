"use client";
import { navElements } from "@/constant";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IconWrapper } from "./ui/IconWrapper";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/auth/authSlice";
import { ProfilePicLoader } from "./ui/Loader";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/features/auth/authActions";
import { useToast } from "./hooks/use-toast";
function Sidenav() {
  const pathname = usePathname();
  const { isOpen, openModal, closeModal } = useModal();
  const status = useAppSelector((state) => state.auth.status);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const profilePicture =
    status === "loading" ? (
      <ProfilePicLoader />
    ) : (
      <Image
        src="/profile-picture.png"
        width={0}
        height={0}
        alt="Profile Picture"
        className="rounded-xl w-8 h-8 object-cover"
      />
    );
  return (
    <nav className="w-[280px] bg-white border-r border-[#DEDEDE] py-3 px-4 flex flex-col gap-3">
      <div className="flex items-center gap-2 ">
        {profilePicture}
        <h3 className="font-medium capitalize">{user.userName}</h3>
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
      <ul className="flex flex-col gap-2">
        {navElements?.map((navItem) => {
          return (
            <li key={navItem.to}>
              <Link
                href={navItem.to}
                className={`capitalize flex gap-2  p-2 rounded  ${
                  pathname === navItem.to ? "bg-[#f4f4f4] shadow" : ""
                }
                `}
              >
                <IconWrapper
                  icon={navItem.icon}
                  strokeWidth={1.5}
                  color="#000000"
                />
                {navItem.name}
              </Link>
            </li>
          );
        })}
        <button
          className=" text-base capitalize flex gap-2  p-2 rounded "
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
          <LogOut strokeWidth={1.5} color="#000000" />
          Logout
        </button>
      </ul>
    </nav>
  );
}

export default Sidenav;
