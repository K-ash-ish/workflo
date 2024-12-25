"use client";
import TaskBoard from "@/components/TaskBoard";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllTasks } from "@/lib/features/task/taskActions";
import { TaskBoardLoader, UserNameLoader } from "@/components/ui/Loader";
import { selectUser } from "@/lib/features/auth/authSlice";
import TaskModal from "@/components/ui/TaskModal";

function trimUsername(username: string) {
  return username.trim().split(" ")[0];
}
function Page() {
  const dispatch = useAppDispatch();
  const fetchAllTasksStatus = useAppSelector(
    (state) => state.task.fetchAllTasksStatus
  );
  const user = useAppSelector(selectUser);
  const status = useAppSelector((state) => state.auth.status);
  const userName = () => {
    return (
      <div className="font-barlow font-semibold  text-xl  capitalize flex items-center md:gap-2 text-center ">
        Welcome Back,
        {status === "loading" ? (
          <UserNameLoader />
        ) : (
          trimUsername(user.userName)
        )}
        !
      </div>
    );
  };
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return (
    <section className="  h-full bg-gray-50 px-2 py-3  ">
      <div className="w-full flex md:flex-row flex-col-reverse items-center md:justify-between md:items-center md:gap-4 gap-1">
        <label htmlFor="search" className="relative ">
          <div className="absolute right-[0.75rem]  top-[calc(50%-0.5rem)]  ">
            <Search color="#797979" className="w-4 h-4 " />
          </div>
          <input
            type="text"
            placeholder="Search"
            id="search"
            className="w-full py-2 px-3 bg-white rounded-md    focus:border-none focus:outline-[#d2d2d2] border border-gray-4 00  text-[#797979] placeholder-gray-400 placeholder:pl-1  caret-gray-400 "
          />
        </label>
        {userName()}
      </div>
      {fetchAllTasksStatus === "loading" ? <TaskBoardLoader /> : <TaskBoard />}
      <TaskModal />
    </section>
  );
}

export default Page;
