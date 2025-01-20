"use client";
import TaskBoard from "@/components/TaskBoard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchAllTasks } from "@/lib/features/task/taskActions";
import { TaskBoardLoader } from "@/components/ui/Loader";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "@/utils/DndConfig";

function Page() {
  const dispatch = useAppDispatch();
  const fetchAllTasksStatus = useAppSelector(
    (state) => state.task.fetchAllTasksStatus
  );

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return (
    <section className=" bg-gray-50 px-2 py-3 h-5/6 ">
      {fetchAllTasksStatus === "loading" ? (
        <TaskBoardLoader />
      ) : (
        <DndProvider options={HTML5toTouch}>
          <TaskBoard />
        </DndProvider>
      )}
    </section>
  );
}

export default Page;
