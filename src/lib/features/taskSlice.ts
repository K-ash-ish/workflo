import { Tasks } from "@/types/taskdata";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Tasks[] = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Tasks>) => {
      // console.log(action.payload);
      console.log(action.payload);
      state.push(action.payload);
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: number; changeStatusTo: string }>
    ) => {
      const { id, changeStatusTo } = action.payload;
      state.map((task, index) => {
        if (task.id === id) {
          state[index].status = changeStatusTo;
        }
      });
    },
  },
});

export const { addTask, updateStatus } = taskSlice.actions;
export default taskSlice.reducer;
