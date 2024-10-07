import { Tasks } from "@/types/taskdata";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/task/getAllTasks`,
        {
          method: "GET",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
    } catch (error) {
      console.log("error fetching tasks");
      return rejectWithValue(error);
    }
  }
);
export const createTask = createAsyncThunk(
  "tasks/create",
  async (task: Tasks, { rejectWithValue }) => {
    const { status, title, deadline, description, priority } = task;

    if (!status || !title) {
      return rejectWithValue("Status and title cannot be empty");
    }
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/task/create`, {
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
      }).then((res) => res.json());
    } catch (error) {
      console.log("error creating task");
      return rejectWithValue(error);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/task/delete`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }).then((res) => res.json());
    } catch (error) {
      console.log("error deleting task");
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async (task: Partial<Tasks>, { rejectWithValue }) => {
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/task/update`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }).then((res) => res.json());
    } catch (error) {
      console.log("error updating task");
      return rejectWithValue(error);
    }
  }
);
