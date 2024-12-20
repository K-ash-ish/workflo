"use client";
import TaskBoard from "@/components/TaskBoard";
import TaskModal from "@/components/ui/TaskModal";
import { useModal } from "@/context/ModalContext";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllTasks } from "@/lib/features/task/taskActions";
import { TaskBoardLoader } from "@/components/ui/Loader";

function Page() {
  const { isOpen, openModal } = useModal();
  const dispatch = useAppDispatch();
  const fetchAllTasksStatus = useAppSelector(
    (state) => state.task.fetchAllTasksStatus
  );
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return (
    <div className=" flex flex-col gap-2 py-2 px-2 ">
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
      </div>
      {fetchAllTasksStatus === "loading" ? <TaskBoardLoader /> : <TaskBoard />}
      {isOpen && createPortal(<TaskModal />, document.body)}
    </div>
  );
}

export default Page;
