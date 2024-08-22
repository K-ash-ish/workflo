import { Tasks } from "@/types/taskdata";
import { useState } from "react";

function useTask() {
  // const [success, setSuccess] = useState(false);
  const create = async (task: Tasks) => {
    const { status, title, deadline, description, priority } = task;
    if (!status || !title) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/task/create`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            status,
            deadline,
            priority,
            description,
          }),
        }
      ).then((res) => res.json());

      if (response.success) {
        // setSuccess(true);
        return response.data;
      }
    } catch (error) {
      console.log("Error while creating tasks \n ", error);
    }
  };
  const getAllTasks = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/task/getAllTasks`,
        {
          method: "GET",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      if (response.success) {
        // setSuccess(true);
        return response.data;
      }
    } catch (error) {
      console.log("Error while fetching all tasks", error);
    }
  };
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/task/delete`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      ).then((res) => res.json());
      console.log(response);
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.log("Error while deleting task", error);
    }
  };
  const updateTask = async (task: Partial<Tasks>) => {
    const { id, status, title, deadline, description, priority } = task;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/task/update`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            status,
            title,
            deadline,
            description,
            priority,
          }),
        }
      ).then((res) => res.json());
      console.log(response);
      if (response.success) {
        // setSuccess(true);
        return response.data;
      }
    } catch (error) {
      console.log("Error while updating task \n", error);
    }
  };
  return { create, getAllTasks, deleteTask, updateTask };
}

export default useTask;
