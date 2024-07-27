import Auth from "@/components/Auth";

function page() {
  return (
    <div className="bg- min-h-screen flex justify-center items-center bg-gradient-to-t to-[#FFFFFF] from-[#AFA3FF]">
      <Auth authType="login" />
    </div>
  );
}
export default page;
