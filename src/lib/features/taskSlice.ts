import useTask from "@/hooks/useTasks";
import { Tasks } from "@/types/taskdata";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      console.log("TASK SLCE UPDATW : ", id, changeStatusTo);

      state.tasks.map((task, index) => {
        console.log(task.id, task._id);
        if (task.id === id || task._id) {
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
  return async function getTaskThunk(dispatch, getState) {
    const { getAllTasks } = useTask();
    const data = await getAllTasks();
    dispatch(fetchTasks(data));
  };
}

export const { addTask, updateStatus, fetchTasks } = taskSlice.actions;
export default taskSlice.reducer;
