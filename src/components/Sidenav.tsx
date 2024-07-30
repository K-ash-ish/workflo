"use client";
import { navElements } from "@/constant";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidenav() {
  const pathname = usePathname();
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <nav className="w-[280px] bg-white border-r border-[#DEDEDE] py-3 px-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 ">
        {/* TODO adjust picture */}
        <Image
          src="/profile-picture.png"
          width={0}
          height={0}
          alt="Profile Picture"
          unoptimized
          className="rounded-xl w-8 h-8 object-cover"
        />
        <h3 className="font-medium">Joe Gardner</h3>
      </div>
      <div className="flex justify-between items-center">
        <ul className="flex gap-4">
          <li>
            <Image
              src="/notification.png"
              width={0}
              height={0}
              className="w-5 h-5 object-cover"
              alt="HOME"
              unoptimized
            />
          </li>
          <li className="relative">
            <Image
              src="/loading.png"
              width={0}
              height={0}
              className="w-5 h-5 object-cover"
              alt="HOME"
              unoptimized
            />
            <span className="bg-[#FFB800] w-2 h-2 absolute rounded-full top-0 right-0"></span>
          </li>
          <li>
            <Image
              src="/double-arrow.png"
              width={0}
              height={0}
              className="w-5 h-5 object-cover"
              alt="HOME"
              unoptimized
            />
          </li>
        </ul>
        <button className=" text-sm text-[#797979] px-2 py-2 bg-[#F4F4F4] rounded-md">
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
                <Image
                  src={navItem.icon}
                  width={0}
                  height={0}
                  alt="HOME"
                  className="object-cover h-5 w-5 "
                  unoptimized
                />
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
