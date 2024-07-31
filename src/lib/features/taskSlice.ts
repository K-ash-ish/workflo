import { Tasks } from "@/types/taskdata";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Tasks[] = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Tasks>) => {
      state.push(action.payload);
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: number; changeStatusTo: string }>
    ) => {
      const { id, changeStatusTo } = action.payload;
      console.log("TASK SLCE UPDATW : ", id, changeStatusTo);
      state.map((task, index) => {
        if (task.id === id) {
          state[index].status = changeStatusTo;
        }
      });
      return state;
    },
    renderTasks: (state, action: PayloadAction<Tasks[]>) => {
      return action.payload;
    },
  },
});

export const { addTask, updateStatus, renderTasks } = taskSlice.actions;
export default taskSlice.reducer;
