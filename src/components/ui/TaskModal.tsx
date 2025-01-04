"use client";
import { fields } from "@/constant";
import React, { useState } from "react";
import { Dropdown } from "./dropdown";
import { Tasks } from "@/types/taskdata";
import { useAppDispatch } from "@/lib/hooks";
import { useModal } from "@/context/ModalContext";
import {
  CalendarRangeIcon,
  DiamondPlus,
  LucideProps,
  MoveDiagonal2,
  Share2,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { IconWrapper } from "./IconWrapper";
import { createTask } from "@/lib/features/task/taskActions";
import { useToast } from "../hooks/use-toast";
import { Calendar } from "./calendar";
import { Popover, PopoverContent } from "./popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

function ActionBtn({
  title,
  icon,
  handleClick,
}: Readonly<{
  title: string;
  icon?: React.FC<LucideProps>;
  handleClick?: () => void;
}>) {
  const style = {
    color: `${
      title === "delete"
        ? "#fc5f5f"
        : title === "create"
        ? "#1fae58"
        : "#797979"
    }`,
  };
  return (
    <button
      className={`flex items-center gap-2  p-2 rounded capitalize underline-offset-2`}
      style={style}
      onClick={handleClick}
    >
      {icon && <IconWrapper style={style} icon={icon} />}
    </button>
  );
}
function TaskModal() {
  const { closeModal, isOpen, modalData: initialTask } = useModal();
  const [task, setTask] = useState<Tasks>(initialTask || ({} as Tasks));
  const [date, setDate] = useState<Date | undefined>(new Date());
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  async function createNewTask() {
    dispatch(createTask(task)).then((payload) => {
      if (payload.payload.success) {
        toast({
          description: payload.payload.message,
          variant: "default",
        });
        setTask({} as Tasks);
        closeModal();
      } else {
        toast({
          title: "Uh oh!",
          description: payload.payload,
          variant: "destructive",
        });
      }
    });
  }
  function deleteTask() {
    // dispatch()
    console.log("delete");
  }
  function handleInput(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    valueToUpdate: string
  ) {
    setTask((prevValue) => {
      return { ...prevValue, [valueToUpdate]: e.target.value };
    });
  }
  function handleDropDownValue(value: string, valueToUpdate: string) {
    if (valueToUpdate.length > 0) {
      setTask((prevValue) => {
        return { ...prevValue, [valueToUpdate]: value };
      });
    }
  }

  return (
    <div
      className={`absolute top-0 left-0 z-50 h-dvh  transition-transform duration-500 ease-in-out  
   ${isOpen ? "translate-y-0" : "-translate-y-full"} 
    `}
    >
      <div className="relative flex flex-col gap-3 bg-white md:w-9/12 w-full h-full py-4  px-6 shadow-xl">
        <button
          onClick={() => {
            closeModal();
            setTask({} as Tasks);
          }}
          className="cursor-pointer absolute right-4 top-4"
        >
          <X className="w-5 h-auto text-gray-500" />
        </button>
        <div className="flex flex-col items-start gap-6 ">
          <label htmlFor="title">
            <input
              value={task.title || ""}
              onChange={(e) => handleInput(e, "title")}
              type="text"
              id="title"
              placeholder="Title"
              className="text-5xl w-5/6  placeholder:text-[#CCCCCC] placeholder:font-barlow placeholder:font-semibold placeholder:pl-1 focus:outline-none focus:border-none font-barlow text-[#989898]"
            />
          </label>

          <div className="flex flex-col items-start gap-4 w-full   ">
            {fields?.map((field, index) => (
              <div className="flex gap-4  w-full items-center  " key={index}>
                <IconWrapper icon={field.icon} />
                <div className="capitalize text-[#666666] grid grid-cols-2 items-center  w-full ">
                  <p className="">{field.title}</p>
                  <div className=" ">
                    {field.type === "text" ? (
                      <input
                        value={task?.[field.title] || ""}
                        type={field.type}
                        id={field.title}
                        onChange={(e) => handleInput(e, field.title)}
                        placeholder={field.title}
                        className="placeholder:text-[#C1BDBD] w-28  text-sm  outline-none   "
                      />
                    ) : field.type === "calendar" ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 text-xs">
                            <CalendarRangeIcon size={20} strokeWidth={1.2} />
                            {date?.toDateString()}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Dropdown
                        options={field?.options}
                        title={field.title}
                        handleDropDownValue={handleDropDownValue}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <button className="flex items-center gap-6 py-2 ">
            <span>+</span> Add custom property
          </button> */}
        </div>
        <div className="border-2 my-3"></div>
        <textarea
          value={task?.description ?? ""}
          onChange={(e) => handleInput(e, "description")}
          id="description"
          placeholder="Description"
          className="focus:outline-none  w-full  text-xl placeholder:text-[#CCCCCC] placeholder:font-barlow placeholder:pl-1  focus:border-none font-barlow text-[#989898] "
        />
      </div>
    </div>
  );
}

export default TaskModal;
