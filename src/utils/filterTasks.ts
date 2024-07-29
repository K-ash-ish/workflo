import { taskData } from "@/constant";

export function filterTasks() {
  const tasksToDo = taskData?.filter((tasks) => tasks.status === "to do");

  const tasksInProgress = taskData?.filter(
    (tasks) => tasks.status === "in progresss"
  );

  const tasksUnderReview = taskData?.filter(
    (tasks) => tasks.status === "under review"
  );
  const tasksFinished = taskData?.filter(
    (tasks) => tasks.status === "finished"
  );

  return { tasksToDo, tasksInProgress, tasksFinished, tasksUnderReview };
}
