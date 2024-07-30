import Sidenav from "@/components/Sidenav";
import StoreProvider from "../StoreProvider";
import TaskModal from "@/components/ui/TaskModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <section className="flex bg-[#f7f7f7] min-h-screen w-full relative ">
        <Sidenav />
        {children}
        <TaskModal />
      </section>
    </StoreProvider>
  );
}
