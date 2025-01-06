"use client";
import TaskColumn from "./ui/TaskColumn";
import { useAppSelector } from "@/lib/hooks";
import { selectAllTasks } from "@/lib/features/task/taskSlice";
import { DndProvider, Preview } from "react-dnd-multi-backend";
import { generatePreview, HTML5toTouch } from "@/utils/DndConfig";
import { filterTasks } from "@/utils";

function TaskBoard() {
  const { tasksFinished, tasksToDo, tasksInProgress, tasksUnderReview } =
    filterTasks();

  return (
    <DndProvider options={HTML5toTouch}>
      <div className="max-h-[480px] shadow-md md:shadow-none min-h-[400px] w-full grid grid-cols-4 items-start  gap-2 p-2 overflow-y-scroll ">
        <TaskColumn tasks={tasksToDo} taskStatus="to do" />
        <TaskColumn tasks={tasksInProgress} taskStatus="in progress" />
        <TaskColumn tasks={tasksUnderReview} taskStatus="under review" />
        <TaskColumn tasks={tasksFinished} taskStatus="finished" />
        <Preview generator={generatePreview} />
      </div>
    </DndProvider>
  );
}

export default TaskBoard;
