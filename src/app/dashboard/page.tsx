"use client";
import TaskBoard from "@/components/TaskBoard";
import TaskModal from "@/components/ui/TaskModal";
import { useModal } from "@/context/ModalContext";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { createPortal } from "react-dom";

function page() {
  const { isOpen, openModal } = useModal();
  const { logout, success } = useAuth();
  if (success) redirect("/login");

  return (
    <div className=" flex flex-col gap-2 py-2 px-2">
      <div className="flex justify-between items-center">
        <label htmlFor="search" className="relative">
          <Search className="absolute right-4 top-[calc(50%-0.5rem)] w-4 h-4 text-[#797979] " />
          <input
            type="text"
            placeholder="Search"
            id="search"
            className="py-2 px-3 bg-white rounded-md   focus:border-none focus:outline-[#d2d2d2]  text-[#797979] placeholder-gray-400 placeholder:pl-1  caret-gray-400 "
          />
        </label>

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
      </div>
      <TaskBoard />

      {isOpen && createPortal(<TaskModal />, document.body)}
    </div>
  );
}

export default page;
