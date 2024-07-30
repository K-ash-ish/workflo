"use client";
import { priorityColors, taskData } from "@/constant";
import { TaskColumnProps, Tasks } from "@/types/taskdata";
import { filterTasks } from "@/utils/filterTasks";
import Image from "next/image";
import { useEffect, useState } from "react";

function TaskColumn({ title, tasks }: TaskColumnProps) {
  return (
    <div className="w-full bg-red-300">
      <div className="flex justify-between items-center my-2">
        <h4 className="text-lg text-[#555555]">{title}</h4>
        <Image
          src="/horizontal-bar.png"
          width={0}
          height={0}
          alt="To do"
          className="w-5 h-5 object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {tasks?.map((task, index) => {
            return <TaskCard key={task.id} task={task} index={index} />;
          })}
        </div>
        <button className="bg-gradient-to-t from-[#202020] to-[#3A3A3A] text-[#E3E1E1] w-full p-2  rounded-md flex justify-between items-center my-2">
          Add new <p className="text-2xl font-thin">+</p>
        </button>
      </div>
    </div>
  );
}

function TaskCard({ index, task }: { index: number; task: Tasks }) {
  const { title, priority, description, deadline } = task;
  return (
    <div className="bg-[#F9F9F9] border border-[#DEDEDE] p-3  rounded-md cursor-pointer hover:bg-[#efefef] duration-300 ">
      <div className="flex flex-col items-start gap-3">
        <h6 className="font-medium capitalize text-[#606060 ]">{title}</h6>
        <p className="text-sm text-[#797979]">{description}</p>
        {/* Check for other ways to write it */}
        {priorityColors[priority] && (
          <span
            className={`text-white text-xs p-2 rounded-xl`}
            style={{ backgroundColor: `${priorityColors[priority]}` }}
          >
            {priority}
          </span>
        )}

        <p className="flex gap-2 text-[#606060] font-medium text-sm">
          <Image
            src="/clock.png"
            width={20}
            height={20}
            alt="Deadline"
            className="object-contain"
          />
          <span className="">{deadline}</span>
        </p>
      </div>
      <p className="text-[#797979]  my-2 text-sm">1 hr ago</p>
    </div>
  );
}

function TaskBoard() {
  const { tasksToDo, tasksFinished, tasksInProgress, tasksUnderReview } =
    filterTasks({ taskData });
  const [winReady, setWinReady] = useState(false);
  useEffect(() => {
    setWinReady(true);
  }, []);
  return winReady ? (
    <div className="bg-white w-full py-2 px-4 rounded-md flex gap-4  ">
      <TaskColumn title="To do" tasks={tasksToDo} />
      <TaskColumn title="In progress" tasks={tasksInProgress} />
      <TaskColumn title="Under review" tasks={tasksUnderReview} />
      <TaskColumn title="Finished" tasks={tasksFinished} />
    </div>
  ) : null;
}

export default TaskBoard;
