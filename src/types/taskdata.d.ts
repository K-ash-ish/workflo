export type Priority = "low" | "medium" | "urgent";

export type Tasks = {
  id: number;
  title: string;
  status: string;
  deadline?: string;
  priority?: Priority;
  description?: string;
  customFields?: CustomField[];
  [key: string]: any;
};
export type CustomField = {
  title: string;
  value: string | number | boolean;
};
export type TaskColumnProps = {
  title: string;
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};
