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

interface InitialState {
  error: string;
  status: "idle" | "loading" | "failed";
  tasks: Tasks[];
}

const initialState: InitialState = {
  status: "idle",
  tasks: [],
  error: "",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.status = "idle";
      state.tasks = action.payload.data;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload.data);
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
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
    builder.addMatcher(
      isAnyOf(
        fetchAllTasks.pending,
        createTask.pending,
        deleteTask.pending,
        updateTask.pending
      ),
      (state) => {
        state.status = "loading";
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchAllTasks.rejected,
        createTask.rejected,
        deleteTask.rejected,
        updateTask.rejected
      ),
      (state, action) => {
        state.status = "failed";
        console.log("Error:  ", action);
      }
    );
  },
});

export const selectAllTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
