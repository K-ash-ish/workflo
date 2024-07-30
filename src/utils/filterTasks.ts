import { Tasks } from "@/types/taskdata";

export function filterTasks(tasks: Tasks[]) {
  const tasksToDo: Tasks[] = tasks?.filter((tasks) => tasks.status === "to do");

  const tasksInProgress = tasks?.filter(
    (tasks) => tasks.status === "in progress"
  );

  const tasksUnderReview = tasks?.filter(
    (tasks) => tasks.status === "under review"
  );
  const tasksFinished = tasks?.filter((tasks) => tasks.status === "finished");

  return { tasksToDo, tasksInProgress, tasksFinished, tasksUnderReview };
}
