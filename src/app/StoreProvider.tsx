"use client";
import { useRef } from "react";
import { AppStore, makeStore } from "../lib/store";
import { Provider } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import { addTask } from "@/lib/features/taskSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(
      addTask({
        id: 187,
        status: "to do",
        priority: "low",
        deadline: "2024-08-15",
        description:
          "Enable cloud storage for note backup and synchronization.",
        title: "integrate cloud storage",
      })
    );
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
