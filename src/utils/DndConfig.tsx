import { TaskContent } from "@/components/ui/TaskCard";
import { Tasks } from "@/types/taskdata";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  MouseTransition,
  PreviewState,
  TouchTransition,
} from "react-dnd-multi-backend";

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
export const generatePreview = ({
  itemType,
  item: { task },
  style,
}: PreviewState<{ task: Tasks }, Element>) => {
  return (
    <div
      className="bg-white shadow-md p-3 rounded-md cursor-pointer hover:bg-gray-100 duration-300 opacity-50 w-[150px] overflow-hidden"
      style={style}
    >
      <TaskContent task={task} isOverdue={false} />
    </div>
  );
};
