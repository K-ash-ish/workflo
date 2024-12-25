"use client";
import Sidenav from "@/components/Sidenav";
import { ModalProvider } from "@/context/ModalContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout, verifyToken } from "@/lib/features/auth/authActions";
import { selectUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { UserNameLoader } from "@/components/ui/Loader";
import { Menu } from "lucide-react";

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
      <div className=" md:bg-yellow-300 min-h-dvh w-full flex bg-red-300 flex-row  gap-2 md:gap-0">
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
