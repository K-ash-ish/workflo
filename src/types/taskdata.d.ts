export type Priority = "low" | "medium" | "urgent";

export type Tasks = {
  id: string;
  title: string;
  status: string;
  deadline: string;
  priority: Priority;
  description: string;
  customFields?: CustomField[];
};
export type CustomField = {
  title: string;
  value: string | number | boolean;
};
export type TaskColumnProps = {
  title: string;
  tasks: Tasks[];
};
