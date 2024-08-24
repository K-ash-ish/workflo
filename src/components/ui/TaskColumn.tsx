"use client";
import Image from "next/image";
import TaskCard from "./TaskCard";
import { TaskColumnProps, Tasks } from "@/types/taskdata";
import { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { filterTasks } from "@/utils/filterTasks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateStatus } from "@/lib/features/taskSlice";
import { useModal } from "@/context/ModalContext";
import useTask from "@/hooks/useTasks";

function TaskColumn({
  taskStatus,
  tasks,
}: {
  taskStatus: string;
  tasks: Tasks[];
}) {
  let taskList: Tasks[];
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  const { tasksToDo, tasksFinished, tasksInProgress, tasksUnderReview } =
    filterTasks(tasks);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const { updateTask } = useTask();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: ({ id, mvFrom }: { id: number; mvFrom: string }) => {
      updateTaskStatus(id, mvFrom, tasks);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  drop(dropRef);
  async function updateTaskStatus(id: number, mvFrom: string, data: Tasks[]) {
    if (mvFrom !== taskStatus) {
      const res = await updateTask({ id, status: taskStatus });
      console.log(res);

      dispatch(updateStatus({ id: res._id, changeStatusTo: res.status }));
    }
  }
  if (taskStatus === "to do") {
    taskList = tasksToDo;
  } else if (taskStatus === "under review") {
    taskList = tasksUnderReview;
  } else if (taskStatus === "in progress") {
    taskList = tasksInProgress;
  } else {
    taskList = tasksFinished;
  }
  return (
    <div ref={dropRef} className="w-full ">
      <div className="flex justify-between items-center my-2">
        <h4 className="text-lg text-[#555555] capitalize">{taskStatus}</h4>

        <Image
          src="/horizontal-bar.png"
          width={0}
          height={0}
          alt="To do"
          className="w-5 h-5 object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {taskList?.map((task, index) => {
            return <TaskCard key={task._id} task={task} index={index} />;
          })}
        </div>
        <button
          onClick={() => {
            openModal();
          }}
          className="bg-gradient-to-t from-[#202020] to-[#3A3A3A] text-[#E3E1E1] w-full p-2  rounded-md flex justify-between items-center my-2"
        >
          Add new <span className="text-2xl ">+</span>
        </button>
      </div>
    </div>
  );
}
export default TaskColumn;
