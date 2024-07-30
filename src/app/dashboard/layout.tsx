import Sidenav from "@/components/Sidenav";
import StoreProvider from "../StoreProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <section className="flex bg-[#f7f7f7] min-h-screen w-full ">
        <Sidenav />
        {children}
      </section>
    </StoreProvider>
  );
}
