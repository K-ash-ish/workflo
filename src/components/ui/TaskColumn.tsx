"use client";
import TaskCard from "./TaskCard";
import { Tasks } from "@/types/taskdata";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "@/lib/hooks";
import { Clipboard, ClipboardCheck, Clock, TargetIcon } from "lucide-react";
import { updateTask } from "@/lib/features/task/taskActions";
import { filterTasks } from "@/utils";

function TaskColumn({
  taskStatus,
  tasks,
}: Readonly<{
  taskStatus: string;
  tasks: Tasks[];
}>) {
  let taskColumnColor = "";
  let taskIcon: JSX.Element;

  const dispatch = useAppDispatch();

  const dropRef = useRef<HTMLDivElement | null>(null);

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
      dispatch(updateTask({ id, status: taskStatus }));
    }
  }

  if (taskStatus === "to do") {
    taskColumnColor = "bg-red-100";
    taskIcon = <Clipboard className="w-4 h-auto hidden md:block" />;
  } else if (taskStatus === "under review") {
    taskColumnColor = "bg-cyan-100";
    taskIcon = <TargetIcon className="w-4 h-auto  hidden md:block" />;
  } else if (taskStatus === "in progress") {
    taskColumnColor = "bg-yellow-100";
    taskIcon = <Clock className="w-4 h-auto  hidden md:block" />;
  } else {
    taskColumnColor = "bg-green-100";
    taskIcon = <ClipboardCheck className="w-4 h-auto  hidden md:block" />;
  }
  return (
    <div
      ref={dropRef}
      className={`w-full min-h-[250px] ${taskColumnColor} transition-all duration-500 ease-in-out rounded-md ${
        isOver ? "transform scale-105" : "transform scale-100"
      }`}
    >
      <div className="flex justify-center  md:justify-between  items-center text-[12px] truncate md:text-base capitalize font-semibold border-b p-2  border-black border-dashed ">
        <span className="md:truncate ">{taskStatus}</span>
        {taskIcon}
      </div>
      <div
        className={`flex flex-col items-center    p-2   gap-2 transition-all duration-700 ease-in-out `}
      >
        {tasks?.map((task, index) => {
          return <TaskCard key={task._id} task={task} index={index} />;
        })}
      </div>
    </div>
  );
}
export default TaskColumn;
