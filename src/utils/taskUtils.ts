import { selectAllTasks } from "@/lib/features/task/taskSlice";
import { useAppSelector } from "@/lib/hooks";
import { Tasks } from "@/types/taskdata";
import { isTimeOverDue } from "./dateTime";

export function filterTasks() {
  const tasks: Tasks[] = useAppSelector(selectAllTasks);

  const tasksToDo: Tasks[] = tasks?.filter((tasks) => tasks.status === "to do");

  const tasksInProgress = tasks?.filter(
    (tasks) => tasks.status === "in progress"
  );

  const tasksUnderReview = tasks?.filter(
    (tasks) => tasks.status === "under review"
  );
  const tasksFinished = tasks?.filter((tasks) => tasks.status === "finished");

  const totalTasks = tasks.length;
  const totalTasksToDo = tasksToDo.length;
  const totalTasksInProgress = tasksInProgress.length;
  const totalTasksUnderReview = tasksUnderReview.length;
  const totalTasksFinished = tasksFinished.length;

  const totalOverDueTasks = tasks?.filter((task) => {
    if (task.deadline && isTimeOverDue(task?.deadline)) {
      return task;
    }
  })?.length;

  return {
    totalTasks,
    tasksToDo,
    tasksInProgress,
    tasksFinished,
    tasksUnderReview,
    totalTasksFinished,
    totalTasksInProgress,
    totalTasksToDo,
    totalTasksUnderReview,
    totalOverDueTasks,
  };
}
