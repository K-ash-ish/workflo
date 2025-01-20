import { selectAllTasks } from "@/lib/features/task/taskSlice";
import { useAppSelector } from "@/lib/hooks";
import { Tasks } from "@/types/taskdata";
import { isTimeOverDue } from "./dateTime";
import { differenceInDays, differenceInMinutes } from "date-fns";

function comparePostedToday(a: Tasks, b: Tasks): number {
  if (!a.createdAt && !b.createdAt) return 0;
  if (!a.createdAt) return 1;
  if (!b.createdAt) return -1;
  const today = new Date();
  const isPostedToday1 = differenceInDays(today, a.createdAt);
  const isPostedToday2 = differenceInDays(today, b.createdAt);
  if (isPostedToday1 < 1 && isPostedToday2 < 1) {
    const postedAt1 = differenceInMinutes(today, a.createdAt);
    const postedAt2 = differenceInMinutes(today, b.createdAt);
    if (postedAt1 < postedAt2) return -1;
    return 1;
  }
  if (isPostedToday1 < 1) {
    return -1;
  }
  if (isPostedToday2 < 1) {
    return 1;
  }
  return 0;
}

function comparePriority(a: Tasks, b: Tasks): number {
  if (!a.priority && !b.priority) return 0;
  if (!a.priority) return 1;
  if (!b.priority) return -1;
  const order = ["urgent", "medium", "low"];
  const index1 = order.findIndex((key) => key === a.priority);
  const index2 = order.findIndex((key) => key === b.priority);
  if (index1 !== index2) return index1 - index2;
  return 0;
}

function compareDeadline(a: Tasks, b: Tasks): number {
  if (!a.deadline && !b.deadline) return 0;
  if (!a.deadline) return 1;
  if (!b.deadline) return -1;
  const date1 = new Date(a.deadline).getTime();
  const date2 = new Date(b.deadline).getTime();
  return date1 - date2;
}

export function sortTasks(tasks: Tasks[]) {
  const sortedBasedOnPriority = tasks?.toSorted(function (a, b) {
    let result = comparePostedToday(a, b);
    if (result !== 0) return result;

    result = comparePriority(a, b);
    if (result !== 0) return result;

    return compareDeadline(a, b);
  });

  return sortedBasedOnPriority;
}

export function filterTasks() {
  let tasks: Tasks[] = useAppSelector(selectAllTasks);
  tasks = sortTasks(tasks);
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
    if (
      task.deadline &&
      isTimeOverDue(task?.deadline) &&
      task.status !== "finished"
    ) {
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
