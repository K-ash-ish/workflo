"use client";
import TaskBoard from "@/components/TaskBoard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllTasks } from "@/lib/features/task/taskActions";
import { TaskBoardLoader } from "@/components/ui/Loader";

function Page() {
  const dispatch = useAppDispatch();
  const fetchAllTasksStatus = useAppSelector(
    (state) => state.task.fetchAllTasksStatus
  );

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return (
    <section className=" bg-gray-50 px-2 py-3  ">
      {fetchAllTasksStatus === "loading" ? <TaskBoardLoader /> : <TaskBoard />}
    </section>
  );
}

export default Page;
