"use client";
import { fields } from "@/constant";
import React, { useState } from "react";
import { Dropdown } from "./dropdown";
import { Tasks } from "@/types/taskdata";
import { useAppDispatch } from "@/lib/hooks";
import { addTask } from "@/lib/features/taskSlice";
import { useModal } from "@/context/ModalContext";
import useTask from "@/hooks/useTasks";
import {
  DiamondPlus,
  LucideProps,
  MoveDiagonal2,
  Share2,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { IconWrapper } from "./IconWrapper";

function ActionBtn({
  title,
  icon,
  handleClick,
}: {
  title: string;
  icon?: React.FC<LucideProps>;
  handleClick?: () => void;
}) {
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
  const [task, setTask] = useState<Tasks>({} as Tasks);
  const dispatch = useAppDispatch();
  const { create } = useTask();
  const { closeModal } = useModal();
  async function createTask() {
    const createdTask = await create({ ...task });
    dispatch(addTask({ ...createdTask, id: createdTask._id }));
  }
  function deleteTask() {
    // dispatch()
    console.log("delete");
  }
  function handleInput(
    e: React.ChangeEvent<HTMLInputElement>,
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
    <div className="absolute top-0 right-0 bg-white/40 w-full h-full  md:flex  md:justify-center z-40 ">
      <div className="flex flex-col gap-3 bg-white md:w-9/12 w-full h-full py-4  px-6 shadow-xl">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-4">
            <li onClick={closeModal} className="cursor-pointer ">
              <X className="w-5 h-auto text-gray-500" />
            </li>
            <li>
              <MoveDiagonal2 className="w-5 h-auto text-gray-500" />
            </li>
          </ul>
          <ul className="flex items-center gap-4 capitalize">
            <ActionBtn title="delete" icon={Trash2} handleClick={deleteTask} />
            <ActionBtn
              title="create"
              icon={DiamondPlus}
              handleClick={createTask}
            />
            <ActionBtn title="share" icon={Share2} />
            <ActionBtn title="favourite" icon={Star} />
          </ul>
        </div>
        <div className="flex flex-col items-start gap-6 ">
          <label htmlFor="title">
            <input
              value={task.title || ""}
              onChange={(e) => handleInput(e, "title")}
              type="text"
              id="title"
              placeholder="Title"
              className="text-5xl w-5/6  placeholder:text-[#CCCCCC] placeholder:font-barlow placeholder:font-semibold placeholder:pl-2 focus:outline-none focus:border-none font-barlow text-[#989898]"
            />
          </label>
          <div className="flex flex-col items-start gap-4 w-full md:w-3/5 ">
            {fields?.map((field, index) => (
              <div className="flex gap-4 w-full items-center" key={index}>
                <IconWrapper icon={field.icon} />
                <div className="capitalize text-[#666666] flex md:gap-12 justify-evenly items-center w-full ">
                  <p className="w-1/2">{field.title}</p>
                  <div className="w-1/2 ">
                    {field.type === "text" ? (
                      <input
                        value={task?.[field.title] || ""}
                        type={field.type}
                        id={field.title}
                        onChange={(e) => handleInput(e, field.title)}
                        placeholder={field.title}
                        className="capitalize placeholder:text-[#C1BDBD] w-28  text-sm  outline-none   "
                      />
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
          <button className="flex items-center gap-6 py-2 ">
            <span>+</span> Add custom property
          </button>
        </div>
        <div className="border-2 my-3"></div>
        <label htmlFor="usertext">
          <textarea
            id="usertext"
            className="focus:outline-none w-full "
            placeholder="Start writing, or drag your own files here."
          />
        </label>
      </div>
    </div>
  );
}

export default TaskModal;
