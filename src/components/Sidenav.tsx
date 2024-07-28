"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidenav() {
  const navElements = [
    {
      to: "/dashboard",
      name: "home",
      icon: "/home.png",
    },
    {
      to: "/dashboard/boards",
      name: "boards",

      icon: "/chart.png",
    },
    {
      to: "/dashboard/settings",
      icon: "/settings.png",
      name: "settings",
    },
    {
      to: "/dashboard/teams",
      name: "teams",
      icon: "/teams.png",
    },
    {
      to: "/dashboard/analytics",
      icon: "/analytics.png",
      name: "analytics",
    },
  ];
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="w-[280px] bg-white border-r border-[#DEDEDE] py-3 px-4 flex flex-col gap-2">
      <div className="flex gap-2">
        {/* TODO adjust picture */}
        <Image
          src="/profile-image.png"
          width={20}
          height={20}
          alt="Profile Picture"
          className="rounded-md"
        />
        <h3 className="font-medium">Joe Gardner</h3>
      </div>
      <div className="flex justify-between items-center">
        <ul className="flex gap-4">
          <li>
            <Image src="/notification.png" width={20} height={20} alt="HOME" />
          </li>
          <li>
            <Image src="/loading.png" width={20} height={20} alt="HOME" />
          </li>
          <li>
            <Image src="/double-arrow.png" width={20} height={20} alt="HOME" />
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
  console.log(navElements[0].to.split("/"));
                }`}
              >
                <Image
                  src={navItem.icon}
                  width={20}
                  height={20}
                  alt="HOME"
                  className="object-contain "
                />
                {navItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <button className="text-xl rounded-md text-white bg-gradient-to-t from-[#342592] to-[#5747B9] py-2 capitalize flex justify-center items-center gap-2">
        Create new task
        <span className="rounded-full bg-white text-black  w-5 h-5 flex justify-center items-center">
          +
        </span>
      </button>
    </nav>
  );
}

export default Sidenav;
