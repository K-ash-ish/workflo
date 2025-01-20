"use client";
import TaskCard from "./TaskCard";
import { Tasks } from "@/types/taskdata";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "@/lib/hooks";
import { Clipboard, ClipboardCheck, Clock, TargetIcon } from "lucide-react";
import { updateTask } from "@/lib/features/task/taskActions";
import { filterTasks } from "@/utils";
import { Button } from "./button";
import { useModal } from "@/context/ModalContext";

function TaskColumn({
  taskStatus,
  tasks,
}: Readonly<{
  taskStatus: string;
  tasks: Tasks[];
}>) {
  let taskColumnColor = "";
  let taskTextColor = "";
  let taskIcon: JSX.Element;

  const dispatch = useAppDispatch();
  const { setModalData, openModal } = useModal();

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
    taskTextColor = "text-red-600";
    taskIcon = <Clipboard className="w-4 h-auto hidden md:block" />;
  } else if (taskStatus === "under review") {
    taskColumnColor = "bg-cyan-100";
    taskTextColor = "text-cyan-600";
    taskIcon = <TargetIcon className="w-4 h-auto  hidden md:block" />;
  } else if (taskStatus === "in progress") {
    taskColumnColor = "bg-yellow-100";
    taskTextColor = "text-yellow-600";
    taskIcon = <Clock className="w-4 h-auto  hidden md:block" />;
  } else {
    taskColumnColor = "bg-green-100";
    taskTextColor = "text-green-600";
    taskIcon = <ClipboardCheck className="w-4 h-auto  hidden md:block" />;
  }
  return (
    <div
      ref={dropRef}
      className={`w-full min-h-[250px] flex flex-col ${taskColumnColor} transition-all duration-500 ease-in-out rounded-md p-2 ${
        isOver ? "transform scale-105 shadow-xl" : "transform scale-100"
      }`}
    >
      <div className="flex justify-center  md:justify-between  items-center text-[12px] truncate md:text-base capitalize font-semibold border-b p-2  border-black border-dashed ">
        <span className="md:truncate ">{taskStatus}</span>
        {taskIcon}
      </div>
      <div
        className={`flex flex-col items-center py-2 gap-2 transition-all duration-700 ease-in-out `}
      >
        {tasks?.map((task, index) => {
          return <TaskCard key={task._id} task={task} index={index} />;
        })}
        <button
          className={`md:text-base text-[10px] px-1 py-2 rounded-md  my-2 w-full bg-white ${taskTextColor} hover:bg-slate-50`}
          onClick={() => {
            setModalData({ status: taskStatus });
            openModal();
          }}
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
export default TaskColumn;
