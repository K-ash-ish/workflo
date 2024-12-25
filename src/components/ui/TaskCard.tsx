import { priorityColors } from "@/constant";
import { Tasks } from "@/types/taskdata";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export function TaskContent({ task }: { task: Tasks }) {
  const { title, description, priority, deadline } = task;

  return (
    <>
      <div className="flex flex-col md:items-start md:gap-3">
        <h6 className="md:text-base text-[12px] font-normal md:font-medium capitalize text-[#606060 ]">
          {title}
        </h6>
        <p className="md:text-sm text-[10px] text-gray-400  truncate  text-wrap ">
          {description}
        </p>
        {priority && (
          <span
            className={`text-white md:text-xs text-[10px]  p-2 rounded-xl self-start`}
            style={{ backgroundColor: `${priorityColors[priority]}` }}
          >
            {priority}
          </span>
        )}

        {/* <div className="flex flex-row gap-2 text-[#606060] md:font-medium text-xs md:text-sm">
          <Clock size={20} />
          <span className="">{deadline}</span>
        </div> */}
      </div>
      <p className="text-[#797979]  md:my-2 my-1 text-xs md:text-sm">
        1 hr ago
      </p>
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
      className=" w-11/12 bg-white shadow-md md:p-3 p-2  rounded-md cursor-pointer hover:bg-gray-100 duration-300 "
    >
      <TaskContent task={task} />
    </div>
  );
}
export default TaskCard;
