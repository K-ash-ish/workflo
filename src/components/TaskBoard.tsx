"use client";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./ui/TaskColumn";
import { taskData } from "@/constant";
import { Tasks } from "@/types/taskdata";

function TaskBoard() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  useEffect(() => {
    setTasks(taskData);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white w-full py-2 px-4 rounded-md flex gap-4  ">
        <TaskColumn title="to do" tasks={tasks} setTasks={setTasks} />
        <TaskColumn title="in progress" tasks={tasks} setTasks={setTasks} />
        <TaskColumn title="under review" tasks={tasks} setTasks={setTasks} />
        <TaskColumn title="finished" tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default TaskBoard;
