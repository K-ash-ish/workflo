"use client";
import Sidenav from "@/components/Sidenav";
import StoreProvider from "../StoreProvider";
import TaskModal from "@/components/ui/TaskModal";
import { ModalProvider, useModal } from "@/context/ModalContext";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useModal();
  useEffect(() => {}, [isOpen]);
  return (
    <StoreProvider>
      <ModalProvider>
        <section className="flex bg-[#f7f7f7] min-h-screen w-full relative ">
          <Sidenav />
          {children}
        </section>
      </ModalProvider>
    </StoreProvider>
  );
}
