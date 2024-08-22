"use client";
import { navElements } from "@/constant";
import { useModal } from "@/context/ModalContext";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { LucideProps, UserPlus } from "lucide-react";

function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
  return <Icon className="text-[#797979] w-5 h-auto" />;
}

function Sidenav() {
  const pathname = usePathname();
  const { isOpen, openModal, closeModal } = useModal();
  const { logout, success } = useAuth();
  if (success) redirect("/login");
  return (
    <nav className="w-[280px] bg-white border-r border-[#DEDEDE] py-3 px-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 ">
        {/* TODO adjust picture */}
        <Image
          src="/profile-picture.png"
          width={0}
          height={0}
          alt="Profile Picture"
          className="rounded-xl w-8 h-8 object-cover"
        />
        <h3 className="font-medium">Joe Gardner</h3>
      </div>
      <div className="flex justify-between items-center">
        <button
          className=" text-sm text-[#797979] px-2 py-2 bg-[#F4F4F4] rounded-md"
          onClick={logout}
        >
          Logout
        </button>
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
                <Icon icon={navItem.icon} />
                {navItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        className="text-xl rounded-md text-white bg-gradient-to-t from-[#342592] to-[#5747B9] py-2 capitalize flex justify-center items-center gap-2"
        onClick={() => {
          console.log("called ", isOpen);
          openModal();
        }}
      >
        Create new task
        <span className="rounded-full bg-white text-black  w-5 h-5 flex justify-center items-center">
          +
        </span>
      </button>
    </nav>
  );
}

export default Sidenav;
