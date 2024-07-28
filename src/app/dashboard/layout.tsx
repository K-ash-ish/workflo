import Sidenav from "@/components/Sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex bg-[#f7f7f7] min-h-screen w-full gap-4">
      <Sidenav />
      {children}
    </section>
  );
}
