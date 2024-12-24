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
      <div className="flex relative min-h-screen ">
        {/* <button
          className={`absolute   top-4 left-1 ${
            isSidebarOpen ? "block" : ""
          } md:hidden `}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu />
        </button> */}
        <Sidenav
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div
          className={`flex-1 transition-[margin] duration-500 ease-in-out  ${
            isSidebarOpen ? "ml-0" : "ml-[70px]"
          }`}
        >
          {children}
        </div>
      </div>
    </ModalProvider>
  );
}
