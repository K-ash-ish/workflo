"use client";
import TaskColumn from "./ui/TaskColumn";
import { Preview } from "react-dnd-multi-backend";
import { generatePreview } from "@/utils/DndConfig";
import { filterTasks } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useDragDropManager } from "react-dnd";
import { Unsubscribe } from "@reduxjs/toolkit";

function TaskBoard() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dndContainer = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<Unsubscribe>();
  const timerRef = useRef<NodeJS.Timeout>();
  const { tasksFinished, tasksToDo, tasksInProgress, tasksUnderReview } =
    filterTasks();
  const monitor = useDragDropManager().getMonitor();

  const setScrollInterval = (speed: number) => {
    timerRef.current = setInterval(() => {
      dndContainer.current?.scrollBy(0, speed);
    }, 1);
  };

  useEffect(() => {
    if (isDragging) {
      unsubscribeRef.current = monitor.subscribeToOffsetChange(() => {
        const offset = monitor.getClientOffset();
        if (!offset || !dndContainer) return;
        const containerRect = dndContainer?.current?.getBoundingClientRect();
        const relativeY = containerRect && offset.y - containerRect?.top;
        const scrollTrigger = 100;
        if (relativeY && relativeY < scrollTrigger) {
          if (timerRef.current) clearInterval(timerRef.current);
          setScrollInterval(-5);
        } else if (
          offset.y >
          (dndContainer.current?.clientHeight ?? 0) - scrollTrigger
        ) {
          if (timerRef.current) clearInterval(timerRef.current);
          setScrollInterval(5);
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
        }
      });
    } else if (unsubscribeRef.current) {
      if (timerRef.current) clearInterval(timerRef.current);
      unsubscribeRef.current();
    }
  }, [monitor, isDragging]);

  useEffect(() => {
    const unsubscribe = monitor.subscribeToStateChange(() => {
      if (monitor.isDragging()) setIsDragging(() => true);
      else setIsDragging(() => false);
    });
    return () => unsubscribe();
  }, [monitor]);

  return (
    <div
      ref={dndContainer}
      className="max-h-[480px]  shadow-md md:shadow-none min-h-[400px] w-full grid grid-cols-4 items-start  gap-2 p-2 overflow-y-scroll "
    >
      <TaskColumn tasks={tasksToDo} taskStatus="to do" />
      <TaskColumn tasks={tasksInProgress} taskStatus="in progress" />
      <TaskColumn tasks={tasksUnderReview} taskStatus="under review" />
      <TaskColumn tasks={tasksFinished} taskStatus="finished" />
      <Preview generator={generatePreview} />
    </div>
  );
}

export default TaskBoard;
