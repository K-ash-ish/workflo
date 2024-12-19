"use client";
import { navElements } from "@/constant";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { IconWrapper } from "./ui/IconWrapper";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/auth/authSlice";
import { ProfilePicLoader } from "./ui/Loader";

function Sidenav() {
  const pathname = usePathname();
  const { isOpen, openModal, closeModal } = useModal();
  const status = useAppSelector((state) => state.auth.status);
  const user = useAppSelector(selectUser);

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
        {/* TODO adjust picture */}
        {profilePicture}
        <h3 className="font-medium capitalize">{user.userName}</h3>
      </div>
      <ul className="flex flex-col gap-2">
        {navElements?.map((navItem) => {
          return (
            <li key={navItem.to}>
              <Link
                href={navItem.to}
                className={`capitalize flex gap-2  p-2 rounded text-[#797979] ${
                  pathname === navItem.to ? "bg-[#f4f4f4]" : ""
                }
                `}
              >
                <IconWrapper icon={navItem.icon} />
                {navItem.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <Button
        variant="default"
        className="flex gap-2 items-center justify-center text-white bg-gradient-to-t from-[#342592] to-[#5747B9] capitalize  "
        onClick={() => {
          openModal();
        }}
      >
        Create new task
        <span className="rounded-full bg-white text-black  w-5 h-5 flex justify-center items-center">
          +
        </span>
      </Button>
    </nav>
  );
}

export default Sidenav;
