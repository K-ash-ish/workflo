"use client";
import Sidenav from "@/components/Sidenav";
import { ModalProvider } from "@/context/ModalContext";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { verifyToken } from "@/lib/features/auth/authActions";
import { Search } from "lucide-react";
import { selectUser } from "@/lib/features/auth/authSlice";
import { UserNameLoader } from "@/components/ui/Loader";
import { filterTasks, trimUsername } from "@/utils";
import { quickStatsEl } from "@/constant";
import TaskModal from "@/components/ui/TaskModal";
import Sheet from "@/components/ui/Sheet";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
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
    dispatch(verifyToken());
  }, []);

  return (
    <ModalProvider>
      <div className=" min-h-dvh w-full flex  flex-row  gap-2 md:gap-0">
        <Sidenav
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className={`flex-1 transition-[margin] duration-500 ease-in-out            
          `}
        >
          <div className="w-full flex md:flex-row flex-col-reverse items-center md:justify-between md:items-center md:gap-4 gap-1 py-3 px-2">
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
          <div className="grid grid-cols-5  gap-2  p-2 font-semibold ">
            {quickStatsEl?.map(({ title, color }, i) => {
              const {
                totalTasksFinished,
                totalTasksInProgress,
                totalTasksUnderReview,
                totalTasks,
                totalOverDueTasks,
              } = filterTasks();
              let total = 0;
              if (title === "total tasks") {
                total = totalTasks;
              } else if (title === "in progress") {
                total = totalTasksInProgress;
              } else if (title === "completed") {
                total = totalTasksFinished;
              } else if (title === "overdue") {
                total = totalOverDueTasks;
              } else if (title === "under review") {
                total = totalTasksUnderReview;
              }
              return (
                <div
                  key={i + title}
                  className={`${color} md:text-base text-xs  flex  justify-between shadow-md  rounded-md px-2 py-4 `}
                >
                  <div className="flex flex-col justify-center items-start md:gap-0 gap-2 ">
                    <h4 className=" ">{title}</h4>
                    <p className="text-gray-400">{total}</p>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
              );
            })}
          </div>
          {children}
        </div>
      </div>
      <Sheet>
        <TaskModal />
      </Sheet>
    </ModalProvider>
  );
}
