import { priorityColors } from "@/constant";
import { Tasks } from "@/types/taskdata";
import Image from "next/image";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export function TaskContent({ task }: { task: Tasks }) {
  const { title, description, priority, deadline, priorityColors } = task;
  return (
    <>
      <div className="flex flex-col items-start gap-3">
        <h6 className="font-medium capitalize text-[#606060 ]">{title}</h6>
        <p className="text-sm text-gray-400">{description}</p>
        {priority && (
          <span
            className={`text-white text-xs p-2 rounded-xl`}
            style={{ backgroundColor: `${priorityColors[priority]}` }}
          >
            {priority}
          </span>
        )}

        <p className="flex gap-2 text-[#606060] font-medium text-sm">
          {deadline && (
            <Image
              src="/clock.png"
              width={20}
              height={20}
              alt="Deadline"
              className="object-contain"
            />
          )}
          <span className="">{deadline}</span>
        </p>
      </div>
      <p className="text-[#797979]  my-2 text-sm">1 hr ago</p>
    </>
  );
}

function TaskCard({ index, task }: { index: number; task: Tasks }) {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const { _id, status } = task;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {
      id: _id,
      mvFrom: status,
      task: task,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  drag(dragRef);
  return (
    <div
      ref={dragRef}
      className="bg-white shadow-md p-3  rounded-md cursor-pointer hover:bg-gray-100 duration-300 "
    >
      <TaskContent task={task} />
    </div>
  );
}
export default TaskCard;
