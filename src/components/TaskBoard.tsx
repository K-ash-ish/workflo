"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./ui/TaskColumn";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

function TaskBoard() {
  const tasks = useAppSelector((state) => state.task);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white w-full py-2 px-4 rounded-md flex gap-4  ">
        <TaskColumn tasks={tasks} title="to do" />
        <TaskColumn tasks={tasks} title="in progress" />
        <TaskColumn tasks={tasks} title="under review" />
        <TaskColumn tasks={tasks} title="finished" />
      </div>
    </DndProvider>
  );
}

export default TaskBoard;
