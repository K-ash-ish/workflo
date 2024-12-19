import { Tasks } from "@/types/taskdata";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { logout } from "../auth/authActions";
import {
  createTask,
  deleteTask,
  fetchAllTasks,
  updateTask,
} from "./taskActions";
type Status = "idle" | "loading" | "failed";
interface InitialState {
  error: string;
  status: Status;
  tasks: Tasks[];
  fetchAllTasksStatus: Status;
  createTaskStatus: Status;
  updateTaskStatus: Status;
}

const initialState: InitialState = {
  status: "idle",
  tasks: [],
  error: "",
  fetchAllTasksStatus: "idle",
  createTaskStatus: "idle",
  updateTaskStatus: "idle",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.fetchAllTasksStatus = "loading";
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.fetchAllTasksStatus = "idle";
      state.tasks = action.payload.data;
    });
    builder.addCase(createTask.pending, (state) => {
      state.createTaskStatus = "loading";
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.createTaskStatus = "idle";
      state.tasks.push(action.payload.data);
    });
    builder.addCase(updateTask.pending, (state) => {
      state.updateTaskStatus = "loading";
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.createTaskStatus = "idle";
      const { _id: id, status: changeStatusTo } = action.payload.data;
      state.tasks.forEach((task, index) => {
        if (task._id === id) {
          state.tasks[index].status = changeStatusTo;
        }
      });
    });
    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });
  },
});

export const selectAllTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
