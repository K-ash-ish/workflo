import Auth from "@/components/Auth";

function page() {
  return (
    <div className="bg- min-h-screen flex justify-center items-center">
      <Auth authType="signup" />
    </div>
  );
}
export default page;
