import {
  Calendar,
  CircleAlert,
  Loader,
  LucideProps,
  Pencil,
  ChartNoAxesColumnIncreasing,
  List,
  PanelsTopLeft,
} from "lucide-react";
import { Tasks } from "./types/taskdata";

export const features = [
  {
    image: "/undraw_opinion_re_jix4.svg",
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    image: "/undraw_share_link_re_54rx.svg",
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    image: "/undraw_undraw_posts_givd_-1-_5vi7.svg",
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];
//  export const controlBar=[{
//   title:'Calender view',
//   icon:
// }]
export const navElements = [
  {
    to: "/dashboard",
    name: "Dashboard",
    icon: PanelsTopLeft,
  },
  {
    to: "/dashboard/analytics",
    name: "Analytics",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    to: "/dashboard/alltasks",
    name: "All Tasks",
    icon: List,
  },
];
export const quickStatsEl = [
  { title: "Total Tasks", color: "bg-blue-100 text-blue-600" },
  { title: "In Progress", color: "bg-yellow-100 text-yellow-600" },
  { title: "Completed", color: "bg-green-100 text-green-600" },
  { title: "Overdue", color: "bg-red-100 text-red-600" },
];

export const taskData: Tasks[] = [
  {
    id: 187,
    status: "to do",
    priority: "low",
    deadline: "2024-08-15",
    description: "Enable cloud storage for note backup and synchronization.",
    title: "integrate cloud storage",
  },
  {
    id: 234,
    status: "to do",
    priority: "urgent",
    deadline: "2024-08-15",
    description: "Enable cloud storage for note backup and synchronization.",
    title: "integrate cloud storage",
  },
  {
    id: 334,
    status: "under review",
    priority: "medium",
    deadline: "2024-08-15",
    description: "Enable cloud storage for note backup and synchronization.",
    title: "integrate cloud storage",
  },
  {
    id: 412,
    status: "finished",
    priority: "low",
    deadline: "2024-08-15",
    description: "Enable cloud storage for note backup and synchronization.",
    title: "integrate cloud storage",
  },
];
type Priority = "low" | "medium" | "urgent";
export const priorityColors: Record<Priority, string> = {
  low: "#0ECC5A",
  medium: "#FFA235",
  urgent: "#FF6B6B",
};

type Field = {
  icon: React.FC<LucideProps>;
  title: string;
  type: "dropdown" | "text" | "calendar";
  options?: string[];
};
export const fields: Field[] = [
  {
    icon: Loader,
    title: "status",
    type: "dropdown",
    options: ["to do", "in progress", "finished", "under review"],
  },
  {
    icon: CircleAlert,
    title: "priority",
    type: "dropdown",
    options: ["urgent", "low", "medium"],
  },
  {
    icon: Calendar,
    title: "deadline",
    type: "calendar",
  },
  {
    icon: Pencil,
    title: "description",
    type: "text",
  },
];
