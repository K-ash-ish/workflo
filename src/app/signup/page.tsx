import Auth from "@/components/Auth";

function page() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-t to-[#FFFFFF] from-[#AFA3FF] ">
      <Auth authType="signup" />
    </div>
  );
}
export default page;
