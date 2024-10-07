"use client";
import TaskCard from "./TaskCard";
import { Tasks } from "@/types/taskdata";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { filterTasks } from "@/utils/filterTasks";
import { useAppDispatch } from "@/lib/hooks";
import { useModal } from "@/context/ModalContext";
import { BarChart } from "lucide-react";
import { updateTask } from "@/lib/features/task/taskActions";

function TaskColumn({
  taskStatus,
  tasks,
}: Readonly<{
  taskStatus: string;
  tasks: Tasks[];
}>) {
  let taskList: Tasks[];
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
        <BarChart className="w-6 h-auto rotate-90" />
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
