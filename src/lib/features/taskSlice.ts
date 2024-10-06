import useTask from "@/hooks/useTasks";
import { Tasks } from "@/types/taskdata";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { login } from "./auth/authActions";

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
  reducers: {
    addTask: (state, action: PayloadAction<Tasks>) => {
      state.tasks.push(action.payload);
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: number; changeStatusTo: string }>
    ) => {
      const { id, changeStatusTo } = action.payload;

      state.tasks.forEach((task, index) => {
        if (task._id === id) {
          state.tasks[index].status = changeStatusTo;
        }
      });
    },
    setTasks: (state, action: PayloadAction<Tasks[]>) => {
      state.tasks = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.status = "idle";
      state.tasks = action.payload;
    });
    builder.addCase(fetchAllTasks.rejected, (state, action) => {
      state.status = "failed";
      console.log("Acction here: ", action);
    });
  },
});

export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    const { getAllTasks } = useTask();
    try {
      const data = await getAllTasks();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const selectAllTasks = (state: RootState) => state.task.tasks;

export const { addTask, updateStatus, setTasks, setError } = taskSlice.actions;
export default taskSlice.reducer;
