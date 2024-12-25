"use client";
import Sidenav from "@/components/Sidenav";
import { ModalProvider } from "@/context/ModalContext";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout, verifyToken } from "@/lib/features/auth/authActions";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  return (
    <ModalProvider>
      <div className=" min-h-dvh w-full flex  flex-row  gap-2 md:gap-0">
        <Sidenav
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className={`flex-1 transition-[margin] duration-500 ease-in-out            
          `}
        >
          {children}
        </div>
      </div>
    </ModalProvider>
  );
}
