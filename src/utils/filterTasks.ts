import { Tasks } from "@/types/taskdata";

export function filterTasks({ taskData }: { taskData: Tasks[] }) {
  const tasksToDo: Tasks[] = taskData?.filter(
    (tasks) => tasks.status === "to do"
  );

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
