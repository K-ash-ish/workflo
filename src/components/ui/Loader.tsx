export function UserNameLoader() {
  return <div className="bg-gray-200 w-36 h-6 animate-pulse"></div>;
}
export function ProfilePicLoader() {
  return (
    <div className="rounded-xl w-8 h-8 object-cover bg-gray-200 animate-pulse"></div>
  );
}
export function TaskBoardLoader() {
  return (
    <div className="bg-white w-full min-h-[200px] py-2 px-4 rounded-md flex gap-4 animate-pulse ">
      <div className="w-1/4 h-24 bg-gray-200 rounded-md"> </div>
      <div className="w-1/4 h-24 bg-gray-200 rounded-md"> </div>
      <div className="w-1/4 h-24 bg-gray-200 rounded-md"> </div>
      <div className="w-1/4 h-24 bg-gray-200 rounded-md"> </div>
    </div>
  );
}
