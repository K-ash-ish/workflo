"use client";
import Sidenav from "@/components/Sidenav";
import StoreProvider from "../StoreProvider";
import { ModalProvider, useModal } from "@/context/ModalContext";


export default function Layout({ children }: { children: React.ReactNode }) {

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
