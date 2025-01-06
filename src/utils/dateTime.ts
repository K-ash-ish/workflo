import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

export function formatRelativeTime(targetDate: string) {
  const currentDate = new Date();
  const minutesDiff = differenceInMinutes(currentDate, targetDate);
  const hoursDiff = differenceInHours(currentDate, targetDate);
  const daysDiff = differenceInDays(currentDate, targetDate);
  if (minutesDiff < 60) {
    if (minutesDiff === 1) return `${hoursDiff} min ago`;
    return `${minutesDiff} mins ago`;
  } else if (hoursDiff < 24) {
    if (hoursDiff === 1) return `${hoursDiff} hour ago`;
    return `${hoursDiff} hours ago`;
  } else {
    if (daysDiff === 1) return `${daysDiff} day ago`;
    return `${daysDiff} days ago`;
  }
}
export function convertISODate(targetDate: Date) {
  return format(targetDate, "dd/MM/yyyy");
}

export function isTimeOverDue(deadline: string): boolean {
  const currentDate = new Date().toISOString();
  return currentDate > deadline;
}
