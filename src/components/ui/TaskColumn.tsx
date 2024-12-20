"use client";
import TaskCard from "./TaskCard";
import { Tasks } from "@/types/taskdata";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { filterTasks } from "@/utils/filterTasks";
import { useAppDispatch } from "@/lib/hooks";
import { useModal } from "@/context/ModalContext";
import {
  BarChart,
  Clipboard,
  ClipboardCheck,
  Clock,
  TargetIcon,
} from "lucide-react";
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
  const { openModal } = useModal();
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
    taskIcon = <Clipboard className="w-6 h-auto " />;
  } else if (taskStatus === "under review") {
    taskColumnColor = "bg-cyan-100";
    taskList = tasksUnderReview;
    taskIcon = <TargetIcon className="w-6 h-auto " />;
  } else if (taskStatus === "in progress") {
    taskList = tasksInProgress;
    taskColumnColor = "bg-yellow-100";
    taskIcon = <Clock className="w-6 h-auto " />;
  } else {
    taskList = tasksFinished;
    taskColumnColor = "bg-green-100";
    taskIcon = <ClipboardCheck className="w-6 h-auto " />;
  }
  return (
    <div ref={dropRef} className={`w-full ${taskColumnColor} rounded-md `}>
      <div className="flex justify-between items-center border-b py-4 px-2 border-black border-dashed">
        <h4 className="text-[#555555] capitalize font-semibold ">
          {taskStatus}
        </h4>
        {taskIcon}
      </div>
      <div className={`flex flex-col min-h-[250px]  gap-4 `}>
        <div className="flex flex-col my-3  gap-2 p-2">
          {taskList?.map((task, index) => {
            return <TaskCard key={task._id} task={task} index={index} />;
          })}
        </div>
        {/* <button
          onClick={() => {
            openModal();
          }}
          className="bg-gradient-to-t from-[#202020] to-[#3A3A3A] text-[#E3E1E1] w-full p-2  rounded-md flex justify-between items-center my-2"
        >
          Add new <span className="text-2xl ">+</span>
        </button> */}
      </div>
    </div>
  );
}
export default TaskColumn;
