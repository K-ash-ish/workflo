"use client";
import { fields } from "@/constant";
import React, { useEffect, useState } from "react";
import { Tasks } from "@/types/taskdata";
import { useAppDispatch } from "@/lib/hooks";
import { useModal } from "@/context/ModalContext";
import { CalendarRangeIcon, X } from "lucide-react";
import { IconWrapper } from "./IconWrapper";
import {
  createTask,
  deleteTask,
  updateTask,
} from "@/lib/features/task/taskActions";
import { useToast } from "../hooks/use-toast";
import { Calendar } from "./calendar";
import { Popover, PopoverContent } from "./popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { convertISODate } from "@/utils/dateTime";

function TaskModal() {
  const { closeModal, isOpen, modalData: initialTask } = useModal();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [task, setTask] = useState<Tasks>({} as Tasks);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
      setDate(initialTask?.deadline);
    }
  }, [initialTask]);

  const button = initialTask ? "Update" : "Create";
  function checkUpdatedFields() {
    const updatedFields = Object.keys(task).reduce(
      (acc: Partial<Tasks>, key) => {
        if (task[key] !== initialTask[key]) {
          acc[key] = task[key];
        }
        return acc;
      },
      {}
    );
    return updatedFields;
  }
  async function handleCreateTask() {
    task.deadline = date?.toISOString();
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
  async function handleUpdateTask() {
    const updatedFields = checkUpdatedFields();
    if (Object.keys(updatedFields).length === 0) {
      toast({
        description: "No changes made",
        variant: "default",
      });
      return;
    }
    updatedFields.id = task._id;
    dispatch(updateTask(updatedFields)).then((payload) => {
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

  function deleteCurrentTask() {
    dispatch(deleteTask(task._id)).then((payload) => {
      if (payload.payload.success) {
        toast({
          description: payload.payload.message,
          variant: "default",
        });
        setTask({} as Tasks);
        closeModal();
      }
    });
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
      className={`absolute top-0 left-0 z-50 h-dvh md:w-1/3 w-full  transition-transform duration-500 ease-in-out bg-red-300  
   ${isOpen ? "translate-y-0" : "-translate-y-full"} 
    `}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative flex flex-col gap-3 bg-white w-full h-full md:py-4 py-2 px-4  md:px-6 shadow-xl">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-4">
            <button
              onClick={() => {
                closeModal();
                setTask({} as Tasks);
              }}
              className="cursor-pointer "
            >
              <X className="w-5 h-auto text-gray-500" />
            </button>
          </ul>

          <ul className="flex items-center gap-4 capitalize">
            <Button
              className="bg-green-200 text-green-950 font-semibold hover:bg-green-300 "
              onClick={
                button === "Create" ? handleCreateTask : handleUpdateTask
              }
            >
              {button}
            </Button>
            <Button
              className="bg-red-200 text-red-950 hover:bg-red-300"
              onClick={deleteCurrentTask}
            >
              Delete
            </Button>
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
              className="md:text-5xl text-3xl  w-5/6  placeholder:text-[#CCCCCC] placeholder:font-barlow placeholder:font-semibold placeholder:pl-1 focus:outline-none focus:border-none font-barlow text-[#989898]"
            />
          </label>

          <div className="flex flex-col items-start gap-4 w-full   ">
            {fields?.map((field, index) => (
              <div className="flex gap-4  w-full items-center  " key={index}>
                <IconWrapper icon={field.icon} />
                <div className="capitalize text-[#666666] grid grid-cols-2 items-center  w-full ">
                  <p className="">{field.title}</p>
                  <div className=" ">
                    {field.type === "calendar" ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 text-xs">
                            <CalendarRangeIcon size={20} strokeWidth={1.2} />
                            {date && convertISODate(date)}
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
                      <div className=" ">
                        <Select
                          onValueChange={(value) => {
                            handleDropDownValue(value, field.title);
                          }}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue
                              placeholder={task?.[field?.title] ?? field.title}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {field.options?.map((option, index) => {
                                return (
                                  <SelectItem key={index} value={option}>
                                    {option}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
