"use client";
import TaskColumn from "./ui/TaskColumn";
import { useAppSelector } from "@/lib/hooks";
import { selectAllTasks } from "@/lib/features/task/taskSlice";
import {
  DndProvider,
  MouseTransition,
  Preview,
  PreviewState,
  TouchTransition,
} from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { TaskContent } from "./ui/TaskCard";
import { Tasks } from "@/types/taskdata";

export const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};
const generatePreview = ({
  itemType,
  item: { task },
  style,
}: PreviewState<{ task: Tasks}, Element>) => {
  return (
    <div
      className="bg-white shadow-md p-3 rounded-md cursor-pointer hover:bg-gray-100 duration-300 opacity-50"
      style={style}
    >
      <TaskContent task={task} />
    </div>
  );
};
function TaskBoard() {
  const tasks = useAppSelector(selectAllTasks);

  return (
    <DndProvider options={HTML5toTouch}>
      <div className="bg-white w-full  md:px-4 py-6 rounded-md flex md:items-start md:gap-4 gap-2 ">
        <TaskColumn tasks={tasks} taskStatus="to do" />
        <TaskColumn tasks={tasks} taskStatus="in progress" />
        <TaskColumn tasks={tasks} taskStatus="under review" />
        <TaskColumn tasks={tasks} taskStatus="finished" />
        <Preview generator={generatePreview} />
      </div>
    </DndProvider>
  );
}

export default TaskBoard;
