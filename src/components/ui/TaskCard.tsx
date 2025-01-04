import { priorityColors } from "@/constant";
import { deleteTask } from "@/lib/features/task/taskActions";
import { useAppDispatch } from "@/lib/hooks";
import { Tasks } from "@/types/taskdata";
import { Trash } from "lucide-react";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { useModal } from "@/context/ModalContext";

export function TaskContent({ task }: { task: Tasks }) {
  let { title, description, priority, deadline } = task;
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

      {/* <div className="flex flex-row gap-2 text-[#606060] md:font-medium text-xs md:text-sm">
          <Clock size={20} />
          <span className="">{deadline}</span>
        </div> */}
      <p className="text-[#797979]  md:my-2 my-1  text-[10px] md:text-sm">
        1 hr ago
      </p>
    </>
  );
}

function TaskCard({ index, task }: { index: number; task: Tasks }) {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const { openModal, setModalData } = useModal();
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
      className="group relative overflow-hidden flex flex-col md:gap-3 gap-1 flex-wrap w-11/12 bg-white shadow-md md:p-3 p-2  rounded-md cursor-pointer hover:bg-gray-100 duration-300 "
      onClick={() => {
        setModalData(task);
        openModal();
      }}
    >
      <TaskContent task={task} />
    </div>
  );
}
export default TaskCard;
