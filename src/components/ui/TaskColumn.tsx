"use client";
import TaskCard from "./TaskCard";
import { Tasks } from "@/types/taskdata";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { filterTasks } from "@/utils/filterTasks";
import { useAppDispatch } from "@/lib/hooks";
import { Clipboard, ClipboardCheck, Clock, TargetIcon } from "lucide-react";
import { updateTask } from "@/lib/features/task/taskActions";

function TaskColumn({
  taskStatus,
  tasks,
}: Readonly<{
  taskStatus: string;
  tasks: Tasks[];
}>) {
  let taskList: Tasks[];
  let taskColumnColor = "";
  let taskIcon: JSX.Element;

  const dispatch = useAppDispatch();
  const { tasksToDo, tasksFinished, tasksInProgress, tasksUnderReview } =
    filterTasks(tasks);
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
    taskList = tasksToDo;
    taskColumnColor = "bg-red-100";
    taskIcon = <Clipboard className="md:w-6 hidden h-auto " />;
  } else if (taskStatus === "under review") {
    taskColumnColor = "bg-cyan-100";
    taskList = tasksUnderReview;
    taskIcon = <TargetIcon className="md:w-6 h-auto hidden" />;
  } else if (taskStatus === "in progress") {
    taskList = tasksInProgress;
    taskColumnColor = "bg-yellow-100";
    taskIcon = <Clock className="md:w-6 h-auto hidden " />;
  } else {
    taskList = tasksFinished;
    taskColumnColor = "bg-green-100";
    taskIcon = <ClipboardCheck className="md:w-6 h-auto hidden " />;
  }
  return (
    <div
      ref={dropRef}
      className={`w-[100px] md:w-full min-h-[250px] ${taskColumnColor} transition-all duration-500 ease-in-out rounded-md ${
        isOver ? "transform scale-105" : "transform scale-100"
      }`}
    >
      <div className="flex justify-center  md:justify-between items-center border-b py-4 px-2 border-black border-dashed">
        <h4 className="text-[#555555] text-xs whitespace-nowrap capitalize font-semibold ">
          {taskStatus}
        </h4>
        {taskIcon}
      </div>
      <div
        className={`flex flex-col items-center my-3   p-2   gap-4 transition-all duration-700 ease-in-out `}
      >
        {taskList?.map((task, index) => {
          return <TaskCard key={task._id} task={task} index={index} />;
        })}
      </div>
    </div>
  );
}
export default TaskColumn;
