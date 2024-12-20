"use client";
import Sidenav from "@/components/Sidenav";
import { ModalProvider } from "@/context/ModalContext";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout, verifyToken } from "@/lib/features/auth/authActions";
import { selectUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { UserNameLoader } from "@/components/ui/Loader";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const status = useAppSelector((state) => state.auth.status);
  const { toast } = useToast();

  const userName =
    status === "loading" ? (
      <UserNameLoader />
    ) : (
      <h2 className="font-barlow font-semibold text-3xl capitalize">
        Good morning, {user.userName}!
      </h2>
    );
  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  return (
    <ModalProvider>
      <section className="flex gap-4 bg-[#f7f7f7] min-h-screen w-full relative ">
        <Sidenav />
        <section className="my-2 mx-1 w-full flex flex-col gap-3 relative ">
          
          {children}
        </section>
      </section>
    </ModalProvider>
  );
}
