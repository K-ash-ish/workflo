"use client";
import Sidenav from "@/components/Sidenav";
import StoreProvider from "../StoreProvider";
import { ModalProvider, useModal } from "@/context/ModalContext";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  return (
    <StoreProvider>
      <ModalProvider>
        <section className="flex gap-4 bg-[#f7f7f7] min-h-screen w-full relative ">
          <Sidenav />
          <section className="my-2 mx-1 w-full flex flex-col gap-3 relative ">
            <div className="flex  items-center justify-between ">
              <h2 className="font-barlow font-semibold text-3xl">
                Good morning, Joe!
              </h2>
              <Button
                variant="outline"
                className="self-start text-red-500 font-semibold "
                onClick={logout}
              >
                Logout
              </Button>
            </div>
            {children}
          </section>
        </section>
      </ModalProvider>
    </StoreProvider>
  );
}
