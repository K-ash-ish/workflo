import { priorityColors } from "@/constant";
import { deleteTask } from "@/lib/features/task/taskActions";
import { useAppDispatch } from "@/lib/hooks";
import { Tasks } from "@/types/taskdata";
import { Clock, Trash } from "lucide-react";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { useModal } from "@/context/ModalContext";
import {
  convertISODate,
  formatRelativeTime,
  isTimeOverDue,
} from "@/utils/dateTime";

export function TaskContent({
  task,
  isOverdue,
}: {
  task: Tasks;
  isOverdue: boolean;
}) {
  let { title, description, priority, deadline, createdAt } = task;
  const formatCreatedAt = createdAt && formatRelativeTime(createdAt);
  const formatDeadline = deadline && convertISODate(new Date(deadline));
  const dispatch = useAppDispatch();
  return (
    <>
      <button
        className="group/trash absolute bottom-2 right-2 hover:shadow-xl p-1 hover:bg-gray-200    rounded-md md:group-hover:block hidden text-red-500  transition-all duration-500"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteTask(task._id));
        }}
      >
        <Trash
          strokeWidth={1.2}
          size={15}
          className="md:group-hover/trash:fill-red-400 fill-transparent transition-all duration-500 "
        />
      </button>
      <h6 className="  md:text-base text-[10px] font-normal md:font-medium w-full break-words line-clamp-1 capitalize text-[#606060 ] ">
        {title}
      </h6>
      {description && (
        <p className="md:text-sm text-[8px] text-gray-400 break-words w-full line-clamp-1  md:line-clamp-none ">
          {description}
        </p>
      )}

      {priority && (
        <span
          className={`text-white md:text-xs text-[8px]  md:p-2 p-1  rounded-md md:rounded-xl self-start`}
          style={{ backgroundColor: `${priorityColors[priority]}` }}
        >
          {priority}
        </span>
      )}

      {deadline && (
        <div className="flex flex-row items-center  gap-1 md:gap-2 text-[#606060] md:text-xs text-[6px]   ">
          <div
            className={`flex md:w-4 w-3 h-auto text-red-600 ${
              isOverdue
                ? "animate-pulse duration-1000 ease-in-out "
                : "animate-none"
            }`}
          >
            <Clock strokeWidth={2} />
          </div>
          <span className=" font-medium  ">{formatDeadline}</span>
        </div>
      )}

      <p className="text-[#797979]   text-[8px] md:text-sm">
        {formatCreatedAt}
      </p>
    </>
  );
}

function TaskCard({ index, task }: { index: number; task: Tasks }) {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const { openModal, setModalData } = useModal();
  const { _id, status, deadline } = task;
  const isOverdue = !!deadline && isTimeOverDue(deadline);
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
      className={`group relative overflow-hidden flex flex-col md:gap-3 gap-1 flex-wrap w-11/12 bg-white shadow-md shadow-gray-200 md:p-3 p-2  rounded-md cursor-pointer hover:bg-gray-100 duration-300 last:mb-6 only:mb-0 ${
        isOverdue ? " shadow-red-400" : "border-none"
      }`}
      onClick={() => {
        setModalData(task);
        openModal();
      }}
    >
      <TaskContent task={task} isOverdue={isOverdue} />
    </div>
  );
}
export default TaskCard;
