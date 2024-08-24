import useTask from "@/hooks/useTasks";
import { Tasks } from "@/types/taskdata";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  error: string;
  loading: boolean;
  tasks: Tasks[];
}

const initialState: InitialState = {
  loading: false,
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

      state.tasks.map((task, index) => {
        if (task._id === id) {
          state.tasks[index].status = changeStatusTo;
        }
      });
    },
    fetchTasks: (state, action: PayloadAction<Tasks[]>) => {
      state.tasks = action.payload;
    },
  },
});

export function getTasks() {
  return async function getTaskThunk(dispatch: Dispatch) {
    const { getAllTasks } = useTask();
    const data = await getAllTasks();
    dispatch(fetchTasks(data));
  };
}

export const { addTask, updateStatus, fetchTasks } = taskSlice.actions;
export default taskSlice.reducer;
