import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <div className="w-full mx-4 border-2 p-6">
      <Outlet />
    </div>
  );
};

export default MainContent;
