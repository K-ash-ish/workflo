"use client";
import Sidenav from "@/components/Sidenav";
import { ModalProvider } from "@/context/ModalContext";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout, verifyToken } from "@/lib/features/auth/authActions";
import { selectUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  return (
    <ModalProvider>
      <section className="flex gap-4 bg-[#f7f7f7] min-h-screen w-full relative ">
        <Sidenav />
        <section className="my-2 mx-1 w-full flex flex-col gap-3 relative ">
          <div className="flex  items-center justify-between ">
            <h2 className="font-barlow font-semibold text-3xl capitalize">
              Good morning, {user.userName}!
            </h2>
            <Button
              variant="outline"
              className="self-start text-red-500 font-semibold "
              onClick={() => {
                dispatch(logout()).then((data) => {
                  if (data.payload.success) {
                    router.push("/login");
                  }
                });
              }}
            >
              Logout
            </Button>
          </div>
          {children}
        </section>
      </section>
    </ModalProvider>
  );
}
